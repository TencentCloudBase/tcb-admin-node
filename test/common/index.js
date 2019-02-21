const assert = require("assert")
async function safeCreateCollection(db, name) {
    return await db.createCollection(name)
}

module.exports = {
    safeCreateCollection
}