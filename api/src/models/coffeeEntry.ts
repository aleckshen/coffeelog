import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from "sequelize"
import { sequelize } from "../utils/db.ts"

class CoffeeEntry extends Model<
  InferAttributes<CoffeeEntry>,
  InferCreationAttributes<CoffeeEntry>
> {
  declare id: CreationOptional<number>
  declare userId: number
  declare cafeId: number
  declare coffeeName: string
  declare price: string
  declare rating: string
  declare notes: string | null
  declare photoKey: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

CoffeeEntry.init(
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
    cafeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "cafes", key: "id" },
    },
    coffeeName: {
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
      validate: { min: 0, max: 10 },
    },
    notes: DataTypes.STRING,
    photoKey: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    modelName: "coffeeEntry",
  },
)

export default CoffeeEntry
