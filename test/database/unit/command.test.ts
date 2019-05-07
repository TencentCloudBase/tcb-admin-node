import * as assert from 'power-assert'
import * as tcb from '../../../';
import * as Config from "../../config.local";
import * as common from '../../common/index'

const app = tcb.init(Config)
const db = app.database()

describe("test/unit/collection.test.ts", () => {
  const collName = "coll-1";
  const collection = db.collection(collName);
  const command = db.command;
  const _ = command;

  it('operator', async () => {
    var a
    a = _.gt(4);
    const result = await collection.where({a}).update({ c: { d: _.mul(3) } })
  })

});

describe('stdDevPop', async () => {
  let studentsCollection = null
  const collectionName = 'test-students'
  const data = [
    { "group":"a", "score":84 },
    { "group":"a", "score":96 },
    { "group":"b", "score":80 },
    { "group":"b", "score":100 },
  ]

  beforeAll(async () => {
    studentsCollection = await common.safeCollection(db, collectionName)
    const success = await studentsCollection.create(data)
    assert.strictEqual(success, true)
  })

  afterAll(async () => {
    const success = await studentsCollection.remove()
    assert.strictEqual(success, true)
  })

  it('计算不同组的标准差', async () => {
    const $ = db.command.aggregate
    const result = await db.collection(collectionName).aggregate()
      .group({
        _id: '$group',
        stdDev: $.stdDevPop('$score')
      })
      .end()
    const stdDevs = {
      a: null,
      b: null
    }
    result.data.forEach(item => stdDevs[item._id] = item.stdDev)
    // a分组标准差为: 6; b分组标准差为: 10
    assert.strictEqual(stdDevs.a, 6)
    assert.strictEqual(stdDevs.b, 10)
  })
})

describe('stdDevSamp', async () => {
  let studentsCollection = null
  const collectionName = 'test-students'
  const data = [
    { "score":80 },
    { "score":100 },
  ]

  beforeAll(async () => {
    studentsCollection = await common.safeCollection(db, collectionName)
    const success = await studentsCollection.create(data)
    assert.strictEqual(success, true)
  })

  afterAll(async () => {
    const success = await studentsCollection.remove()
    assert.strictEqual(success, true)
  })

  it('计算标准样本偏差', async () => {
    const $ = db.command.aggregate
    const result = await db.collection(collectionName).aggregate()
      .group({
        _id: null,
        ageStdDev: $.stdDevSamp('$score')
      })
      .end()
    // data 的标准样本偏差为 14.14
    assert.strictEqual(result.data[0].ageStdDev.toFixed(2), '14.14')
  })
})

describe('sum', async () => {
  let goodsCollection = null
  const $ = db.command.aggregate
  const collectionName = 'test-goods'
  const data = [
    { "cost": -10, "price": 100 },
    { "cost": -15, "price": 1 },
    { "cost": -10, "price": 10 }
  ]

  beforeAll(async () => {
    goodsCollection = await common.safeCollection(db, collectionName)
    const success = await goodsCollection.create(data)
    assert.strictEqual(success, true)
  })

  afterAll(async () => {
    const success = await goodsCollection.remove()
    assert.strictEqual(success, true)
  })

  it('参数为单独字段', async () => {
    const result = await db.collection(collectionName).aggregate()
      .group({
        _id: null,
        totalPrice: $.sum('$price')
      })
      .end()
    assert.strictEqual(result.data[0].totalPrice, 111)
  })

  it('参数为字段列表', async () => {
    const result = await db.collection(collectionName).aggregate()
      .group({
        _id: null,
        totalProfit: $.sum(
          $.sum(['$price', '$cost'])
        )
      })
      .end()
    assert.strictEqual(result.data[0].totalProfit, 76)
  })
})
