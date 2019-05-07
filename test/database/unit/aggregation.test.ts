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

describe('sample', async () => {
  const data = [{ name: 'a' }, { name: 'b' }]
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

describe('sortByCount', async () => {
  let passagesCollection = null
  const data = [
    { category: 'Web', tags: ['JavaScript', 'C#'] },
    { category: 'Web', tags: ['Go', 'C#'] },
    { category: 'Life', tags: ['Go', 'Python', 'JavaScript'] }
  ]

  beforeAll(async () => {
    passagesCollection = await common.safeCollection(db, 'test-passages')
    const success = await passagesCollection.create(data)
    assert.strictEqual(success, true)
  })

  afterAll(async () => {
    const success = await passagesCollection.remove()
    assert.strictEqual(success, true)
  })

  it('统计基础类型', async () => {
    const result = await db
      .collection('test-passages')
      .aggregate()
      .sortByCount('$category')
      .end()
    assert.strictEqual(result.data.length, 2)
  })

  it('解构数组类型', async () => {
    const result = await db
      .collection('test-passages')
      .aggregate()
      .unwind('$tags')
      .sortByCount('$tags')
      .end()
    assert.strictEqual(result.data.length, 4)
  })
})

describe('match', async () => {
  let coll = null
  const data = [
    { author: 'stark', score: 80 },
    { author: 'stark', score: 85 },
    { author: 'bob', score: 60 },
    { author: 'li', score: 55 },
    { author: 'jimmy', score: 60 },
    { author: 'li', score: 94 },
    { author: 'justan', score: 95 }
  ]

  beforeAll(async () => {
    coll = await common.safeCollection(db, 'articles')
    const success = await coll.create(data)
    assert.strictEqual(success, true)
  })

  afterAll(async () => {
    const success = await coll.remove()
    assert.strictEqual(success, true)
  })

  it('匹配', async () => {
    const result = await db
      .collection('articles')
      .aggregate()
      .match({
        author: 'stark'
      })
      .end()
    assert.strictEqual(result.data[0].author, 'stark')
  })

  it('计数', async () => {
    const { gt, sum } = db.command.aggregate
    const result = await db
      .collection('articles')
      .aggregate()
      .match({
        score: gt(80)
      })
      .group({
        _id: null,
        count: sum(1)
      })
      .end()
    assert.strictEqual(result.data[0].count, 3)
  })
})

describe('project', async () => {
  let coll = null
  const data = [
    {
      title: 'This is title',
      author: 'Nobody',
      isbn: '123456789',
      introduction: '......'
    }
  ]

  beforeAll(async () => {
    coll = await common.safeCollection(db, 'articles')
    const success = await coll.create(data)
    assert.strictEqual(success, true)
  })

  afterAll(async () => {
    const success = await coll.remove()
    assert.strictEqual(success, true)
  })

  it('指定包含某些字段', async () => {
    const result = await db
      .collection('articles')
      .aggregate()
      .project({
        title: 1,
        author: 1
      })
      .end()
    assert(result.data[0].author)
    assert(result.data[0].title)
    assert(!result.data[0].isbn)
  })

  it('去除输出中的 _id 字段', async () => {
    const result = await db
      .collection('articles')
      .aggregate()
      .project({
        _id: 0,
        title: 1,
        author: 1
      })
      .end()
    assert.deepStrictEqual(result.data[0], {
      author: 'Nobody',
      title: 'This is title'
    })
  })

  it('加入计算出的新字段', async () => {
    const data = [
      {
        name: '小明',
        scores: {
          chinese: 80,
          math: 90,
          english: 70
        }
      }
    ]
    const usersCollection = await common.safeCollection(db, 'test-users')

    const createSuccess = await usersCollection.create(data)
    assert.strictEqual(createSuccess, true)

    const { sum } = db.command.aggregate
    const result = await db
      .collection('test-users')
      .aggregate()
      .project({
        _id: 0,
        name: 1,
        totalScore: sum(['$scores.chinese', '$scores.math', '$scores.english'])
      })
      .end()
    assert.deepStrictEqual(result.data[0], {
      name: '小明',
      totalScore: 240
    })
    const removeSuccess = await usersCollection.remove()
    assert.strictEqual(removeSuccess, true)
  })

  it('加入新的数组字段', async () => {
    const data = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }]
    const usersCollection = await common.safeCollection(db, 'test-users')

    const createSuccess = await usersCollection.create(data)
    assert.strictEqual(createSuccess, true)

    const result = await db
      .collection('test-users')
      .aggregate()
      .project({
        _id: 0,
        coordinate: ['$x', '$y']
      })
      .end()
    assert.deepStrictEqual(result.data[0], {
      coordinate: [1, 1]
    })
    const removeSuccess = await usersCollection.remove()
    assert.strictEqual(removeSuccess, true)
  })
})

describe('replaceRoot', async () => {
  it('使用已有字段作为根节点', async () => {
    const data = [
      {
        name: 'SFLS',
        teachers: {
          chinese: 22,
          math: 18,
          english: 21,
          other: 123
        }
      }
    ]
    const usersCollection = await common.safeCollection(db, 'test-users')

    const createSuccess = await usersCollection.create(data)
    assert.strictEqual(createSuccess, true)

    const result = await db
      .collection('test-users')
      .aggregate()
      .replaceRoot({
        newRoot: '$teachers'
      })
      .end()
    assert.deepStrictEqual(result.data[0], {
      chinese: 22,
      math: 18,
      english: 21,
      other: 123
    })
    const removeSuccess = await usersCollection.remove()
    assert.strictEqual(removeSuccess, true)
  })
  it('使用计算出的新字段作为根节点', async () => {
    const data = [
      { first_name: '四郎', last_name: '黄' },
      { first_name: '邦德', last_name: '马' },
      { first_name: '牧之', last_name: '张' }
    ]
    const usersCollection = await common.safeCollection(db, 'test-users')

    const createSuccess = await usersCollection.create(data)
    assert.strictEqual(createSuccess, true)

    const { concat } = db.command.aggregate
    const result = await db
      .collection('test-users')
      .aggregate()
      .replaceRoot({
        newRoot: {
          full_name: concat(['$last_name', '$first_name'])
        }
      })
      .end()
    assert.deepStrictEqual(result.data[0], {
      full_name: '黄四郎'
    })
    const removeSuccess = await usersCollection.remove()
    assert.strictEqual(removeSuccess, true)
  })
})

describe('skip', async () => {
  let coll = null
  const data = [
    { author: 'stark', score: 80 },
    { author: 'stark', score: 85 },
    { author: 'bob', score: 60 },
    { author: 'li', score: 55 },
    { author: 'jimmy', score: 60 },
    { author: 'li', score: 94 },
    { author: 'justan', score: 95 }
  ]

  beforeAll(async () => {
    coll = await common.safeCollection(db, 'articles')
    const success = await coll.create(data)
    assert.strictEqual(success, true)
  })

  afterAll(async () => {
    const success = await coll.remove()
    assert.strictEqual(success, true)
  })

  it('跳过一定数量的文档', async () => {
    const result = await db
      .collection('articles')
      .aggregate()
      .skip(6)
      .project({
        _id: 0
      })
      .end()
    assert.deepStrictEqual(result.data[0], { author: 'justan', score: 95 })
  })
})