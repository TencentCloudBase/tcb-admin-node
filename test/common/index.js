const assert = require("assert")
async function safeCreateCollection(db, name) {
    const res = await db.createCollection(name)
    try {
        assert.strictEqual(res.message, 'success')
    } catch (e) {
        assert.strictEqual(res.message, 'Create Collection Fail:collection already exists')
    }
}

module.exports = {
    safeCreateCollection
}