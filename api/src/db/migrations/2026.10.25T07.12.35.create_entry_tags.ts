import { DataTypes } from "sequelize"
import type { Migration } from "../db.ts"

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable("entry_tags", {
    entry_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "coffee_entries", key: "id" },
      onDelete: "CASCADE",
    },
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "coffee_tags", key: "id" },
      onDelete: "CASCADE",
    },
  })
}
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("entry_tags")
}
