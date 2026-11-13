import bcrypt from "bcryptjs"
import { GraphQLError } from "graphql"
import jwt from "jsonwebtoken"
import type { Context } from "../graphql/context.ts"

const SALT_ROUNDS = 10
const secret = process.env.JWT_SECRET ?? ""
if (!secret) throw new Error("JWT_SECRET is not set")

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export async function checkPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export function signToken(userId: number): string {
  return jwt.sign({ userId }, secret, { expiresIn: "30d" })
}

export function readToken(token: string): number | null {
  try {
    const payload = jwt.verify(token, secret)
    if (typeof payload === "object" && typeof payload.userId === "number") {
      return payload.userId
    }
    return null
  } catch {
    return null
  }
}

export function authed<Args, Result>(
  resolve: (parent: unknown, args: Args, context: { userId: number }) => Result,
) {
  return (parent: unknown, args: Args, context: Context) => {
    if (context.userId === null) {
      throw new GraphQLError("Log in first.", { extensions: { code: "UNAUTHENTICATED" } })
    }
    return resolve(parent, args, { userId: context.userId })
  }
}
