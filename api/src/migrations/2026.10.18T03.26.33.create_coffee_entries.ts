import { DataTypes } from "sequelize"
import type { Migration } from "../utils/db.ts"

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable("coffee_entries", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    cafe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "cafes", key: "id" },
      onDelete: "CASCADE",
    },
    coffee_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
    },
    notes: DataTypes.STRING,
    photo_key: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  })
}
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("coffee_entries")
}
