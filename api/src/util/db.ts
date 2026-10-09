import { Sequelize } from "sequelize"

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) throw new Error("DATABASE_URL is not set")

export const sequelize = new Sequelize(databaseUrl, {
  logging: false,
  dialectOptions: process.env.DATABASE_SSL === "true" ? { ssl: { require: true } } : {},
})

export const connectToDb = async () => {
  try {
    await sequelize.authenticate()
    console.log("connection has been established")
  } catch (error) {
    console.error("unable to connect to the database", error)
    process.exit(1)
  }
}
