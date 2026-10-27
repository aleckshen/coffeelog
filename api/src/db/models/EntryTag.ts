import { DataTypes, type InferAttributes, type InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../db.ts"

class EntryTag extends Model<InferAttributes<EntryTag>, InferCreationAttributes<EntryTag>> {
  declare entryId: number
  declare tagId: number
}

EntryTag.init(
  {
    entryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "coffee_entries", key: "id" },
    },
    tagId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "coffee_tags", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "entryTag",
    timestamps: false,
  },
)

export default EntryTag
