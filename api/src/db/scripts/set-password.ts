import { stdin, stdout } from "node:process"
import { createInterface } from "node:readline/promises"
import { User } from "#models"
import { hashPassword } from "../../lib/auth.ts"
import { connectToDb, sequelize } from "../db.ts"

const username = process.argv[2]
if (!username) throw new Error("Usage: pnpm set-password <username>")

await connectToDb()
const user = await User.findOne({ where: { username } })
if (!user) throw new Error(`No user called ${username}`)

const prompt = createInterface({ input: stdin, output: stdout })
const password = await prompt.question(`New password for ${username}: `)
prompt.close()
if (password.length < 8) throw new Error("Use at least 8 characters.")

await user.update({ passwordHash: await hashPassword(password) })
console.log(`Password updated for ${username}.`)
await sequelize.close()
