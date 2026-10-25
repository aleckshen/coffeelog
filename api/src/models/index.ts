import Cafe from "./Cafe.ts"
import CoffeeEntry from "./CoffeeEntry.ts"
import CoffeeTag from "./CoffeeTag.ts"
import EntryTag from "./EntryTag.ts"
import User from "./User.ts"

User.hasMany(Cafe)
Cafe.belongsTo(User)

User.hasMany(CoffeeEntry)
CoffeeEntry.belongsTo(User)

Cafe.hasMany(CoffeeEntry)
CoffeeEntry.belongsTo(Cafe)

User.hasMany(CoffeeTag)
CoffeeTag.belongsTo(User)

CoffeeEntry.belongsToMany(CoffeeTag, { through: EntryTag, foreignKey: "entryId" })
CoffeeTag.belongsToMany(CoffeeEntry, { through: EntryTag, foreignKey: "tagId" })

export const models = { Cafe, CoffeeTag, EntryTag, User, CoffeeEntry }
