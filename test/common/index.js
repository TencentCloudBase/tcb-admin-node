async function safeCreateCollection(db, name) {
  return await db.createCollection(name)
}

async function safeCollection(db, name) {
  const collection = db.collection(name)
  let num = -1

  return {
    async create(data) {
      await db.createCollection(name)
      const datas = Array.isArray(data) ? data : [data]
      num = datas.length

      for (let item of datas) {
        const result = await collection.add(item)
        if (!result || !result.id) {
          return false
        }
      }
      return true
    },
    async remove() {
      const result = await collection
        .where({
          _id: /.*/
        })
        .remove()
      return result.deleted > 0
    }
  }
}

module.exports = {
  safeCreateCollection,
  safeCollection
}
