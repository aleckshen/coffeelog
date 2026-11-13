import { GraphQLError } from "graphql"
import { User } from "#models"
import { checkPassword, hashPassword, signToken } from "../../lib/auth.ts"
import type { Context } from "../context.ts"

type Credentials = { username: string; password: string }

export const userResolvers = {
  Query: {
    me: (_parent: unknown, _args: unknown, { userId }: Context) =>
      userId === null ? null : User.findByPk(userId),
  },

  Mutation: {
    signUp: async (_parent: unknown, { username, password }: Credentials) => {
      const name = username.trim()
      if (password.length < 8) throw new GraphQLError("Use at least 8 characters.")
      if (await User.findOne({ where: { username: name } })) {
        throw new GraphQLError("That username is taken.")
      }

      const user = await User.create({ username: name, passwordHash: await hashPassword(password) })
      return { token: signToken(user.id), user }
    },

    logIn: async (_parent: unknown, { username, password }: Credentials) => {
      const user = await User.findOne({ where: { username: username.trim() } })

      if (!user || !(await checkPassword(password, user.passwordHash))) {
        throw new GraphQLError("Wrong username or password.")
      }

      return { token: signToken(user.id), user }
    },
  },
}
