import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from "sequelize"
import { sequelize } from "../db.ts"

class CoffeeTag extends Model<InferAttributes<CoffeeTag>, InferCreationAttributes<CoffeeTag>> {
  declare id: CreationOptional<number>
  declare userId: number
  declare tagName: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

CoffeeTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    modelName: "coffeeTag",
  },
)

export default CoffeeTag
