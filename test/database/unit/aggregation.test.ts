import * as assert from 'power-assert'
import * as Mock from './mock'
import * as app from '../../../index'
import * as Config from '../../config.local'
import * as common from '../../common/index'

const config = {
  secretId: Config.secretId,
  secretKey: Config.secretKey,
  serviceUrl: Config.serviceUrl,
  env: Mock.env,
  proxy: Config.proxy,
  sessionToken: undefined
}

app.init(config)
const db = app.database()

const collName = 'test-aggregate'
const collection = db.collection(collName)

const initialData = {
  key: 'aggregate',
  text: 'test for aggregation',
  number: 1
}

const N = 10

beforeAll(async () => {
  await common.safeCreateCollection(db, collName)
  for (let i = 0; i < N; i++) {
    const result = await collection.add(initialData)
    assert(result.id)
  }
})

afterAll(async () => {
  const deleteRes = await collection
    .where({
      key: 'aggregate'
    })
    .remove()
  assert.strictEqual(deleteRes.deleted, N)
})

describe('聚合搜索', async () => {
  it('aggregation', async () => {
    const result = await collection
      .aggregate()
      .match({
        text: 'test for aggregation'
      })
      .limit(2)
      .addFields({
        field: 'this is a new field'
      })
      .project({
        newText: db.command.aggregate.concat(['$_id', ' - ', '$field'])
      })
      .end()
    assert.strictEqual(result.data.length, 2)
    assert(result.data[0].newText.endsWith(' - this is a new field'))
  })

  it('sample', async () => {
    const data = [
      { name: 'a' },
      { name: 'b' }
    ]
    const usersCollection = await common.safeCollection(db, 'test-users')

    const createSuccess = await usersCollection.create(data)
    assert.strictEqual(createSuccess, true)

    const result = await db
      .collection('test-users')
      .aggregate()
      .sample({
        size: 1
      })
      .end()
    assert.strictEqual(result.data.length, 1)
    
    const removeSuccess = await usersCollection.remove()
    assert.strictEqual(removeSuccess, true)
  })
})
