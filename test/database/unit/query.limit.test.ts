import * as assert from 'power-assert'
import * as tcb from '../../../'
import * as Config from '../../config.local'

describe('test/unit/query.limit.test.ts', () => {
  const app = tcb.init(Config)
  const db = app.database()
  // const defaultDbName = 'default'

  // it('use default db', () => {
  //   assert(db.config.dbname === defaultDbName)
  // })

  // 等于 1000
  it('query with limit 1000', async () => {
    const collName = 'coll-1'
    const collection = db.collection(collName)
    const queryRes = await collection.where({}).limit(1000).get()
    assert(queryRes.data.length === 1000)
  })

  // 大于1000
  it('query with limit > 1000', async () => {
    const collName = 'coll-1'
    const collection = db.collection(collName)
    const queryRes = await collection.where({}).limit(1001).get()
    console.log(queryRes)
    assert(queryRes.data.length === 1000)
  })

  // 小于1000
  it('query with limit < 1000', async () => {
    const collName = 'coll-1'
    const collection = db.collection(collName)
    const queryRes = await collection.where({}).limit(101).get()
    assert(queryRes.data.length === 101)
  })

  // 不填 默认20
  it('query with limit default 20', async () => {
    const collName = 'coll-1'
    const collection = db.collection(collName)
    const queryRes = await collection.where({}).get()
    assert(queryRes.data.length === 20)
  })




  // it('API - getCollections', async () => {
  //   const data = await db.getCollections()
  //   assert(Array.isArray(data.collections))
  // })
})
