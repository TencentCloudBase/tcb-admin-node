import * as assert from 'power-assert'
import * as app from '../../../index'
import * as Config from '../../config.local'
import * as common from '../../common/index'

app.init(Config)
const db = app.database()
const _ = db.command
const $ = _.aggregate

const collName = 'test-projection'
let passagesCollection = null
const data = [
  { category: 'Web', tags: ['JavaScript', 'C#'], index: 0, tags2: [1, 2, 3] },
  { category: 'Web', tags: ['Go', 'C#'], index: 1, tags2: [1, 2, 3] },
  {
    category: 'Life',
    tags: ['Go', 'Python', 'JavaScript'],
    index: 2,
    tags2: [1, 2, 3]
  },
  {
    category: 'number',
    tags: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    index: 3,
    tags2: [1, 2, 3]
  },
  {
    category: 'embedded',
    tags: [{ value: 1 }, { value: 7 }],
    index: 4,
    tags2: [1, 2, 3]
  }
]

beforeEach(async () => {
  passagesCollection = await common.safeCollection(db, collName)
  const success = await passagesCollection.create(data)
  assert.strictEqual(success, true)
})

afterEach(async () => {
  const success = await passagesCollection.remove()
  assert.strictEqual(success, true)
})

describe('operator', async () => {
  it('addToSet', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        tags: _.addToSet('Java')
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .get()
    assert(result.data[0].tags.includes('Java'))
  })

  it('pullAll', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        tags: _.pullAll(['Go'])
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .get()
    assert.deepStrictEqual(result.data[0].tags, ['Python', 'JavaScript'])
  })
})

describe('pull', async () => {
  it('pull', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        tags: _.pull('Go')
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .get()
    assert.deepStrictEqual(result.data[0].tags, ['Python', 'JavaScript'])
  })

  it('pull with _.in', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        tags: _.pull(_.in(['Go', 'Python']))
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .get()
    assert.deepStrictEqual(result.data[0].tags, ['JavaScript'])
  })

  it('pull多个字段', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        tags: _.pull(_.in(['Go', 'Python'])),
        tags2: _.pull(1)
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .get()
    assert.deepStrictEqual(result.data[0].tags, ['JavaScript'])
    assert.deepStrictEqual(result.data[0].tags2, [2, 3])
  })

  it('pull with _.gte', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'number'
      })
      .update({
        tags: _.pull(_.gte(5))
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'number'
      })
      .get()
    assert.deepStrictEqual(result.data[0].tags, [1, 2, 3, 4])
  })
})

describe('all', async () => {
  it('all', async () => {
    let result = await db
      .collection(collName)
      .where({
        tags: _.all(['Go'])
      })
      .get()
    assert.strictEqual(result.data.length, 2)
  })
})

describe('elemMatch', async () => {
  it('Element Match', async () => {
    let result = await db
      .collection(collName)
      .where({
        tags: _.elemMatch(_.gt(2))
      })
      .get()
    assert.strictEqual(result.data[0].category, 'number')
  })

  it('Array of Embedded Documents', async () => {
    let result = await db
      .collection(collName)
      .where({
        tags: _.elemMatch({
          value: _.gt(0)
        })
      })
      .get()
    assert.strictEqual(result.data[0].category, 'embedded')
  })
})

describe('size', async () => {
  it('size', async () => {
    let result = await db
      .collection(collName)
      .where({
        tags: _.size(2)
      })
      .get()
    assert.strictEqual(result.data[0].category, 'Web')
  })
})

describe('exists', async () => {
  it('exists', async () => {
    let result = await db
      .collection(collName)
      .where({
        tags: _.exists(true)
      })
      .get()
    assert.strictEqual(result.data.length, data.length)
  })
  it('Array of Embedded Documents', async () => {
    let result = await db
      .collection(collName)
      .where({
        tags: _.elemMatch({
          value: _.exists(true)
        })
      })
      .get()
    assert.strictEqual(result.data.length, 1)
    assert.strictEqual(result.data[0].category, 'embedded')
  })
})

describe('mod', async () => {
  it('Array of Embedded Documents', async () => {
    let result = await db
      .collection(collName)
      .where({
        tags: _.elemMatch({
          value: _.mod([4, 3])
        })
      })
      .get()
    assert.strictEqual(result.data.length, 1)
    assert.strictEqual(result.data[0].category, 'embedded')
  })
})

describe('rename', async () => {
  it('rename', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        category: _.rename('cat')
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        cat: 'Life'
      })
      .get()
    assert.strictEqual(result.data[0].cat, 'Life')
  })
})

describe.skip('bit', async () => {
  it('bit', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        index: _.bit({ xor: 5 })
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .get()
    console.log(result.data)
  })
})

describe('max', async () => {
  it('max', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        index: _.max(100)
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .get()
    assert.strictEqual(result.data[0].index, 100)
  })

  it('min', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        index: _.min(0)
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .get()
    assert.strictEqual(result.data[0].index, 0)
  })
})

describe('aggregation $match with query', () => {
  it('max', async () => {
    let result = await db
      .collection(collName)
      .aggregate()
      .match({
        category: _.eq('Web')
      })
      .end()
    console.log(result)
  })
})

describe.skip('projection with elemMatch', () => {
  it('普通查询', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: /.*/
      })
      .field({
        category: _.project.elemMatch({ value: 1 })
      })
      .get()
    console.log(result)
  })

  it('普通查询', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: /.*/
      })
      .field({
        category: _.project.elemMatch({ value: _.gte(0) })
      })
      .get()
    console.log(result)
  })
})

describe('push', async () => {
  it('push array', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        tags2: _.push([1, 2, 3])
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .get()
    assert.deepStrictEqual(result.data[0].tags2, [1, 2, 3, 1, 2, 3])
  })

  it('push single item', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        tags2: _.push(1)
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .get()
    assert.deepStrictEqual(result.data[0].tags2, [1, 2, 3, 1])
  })

  it('push multiple item', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        tags2: _.push(1, 2, 3)
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .get()
    assert.deepStrictEqual(result.data[0].tags2, [1, 2, 3, 1, 2, 3])
  })

  it('push with options', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .update({
        tags2: _.push({
          each: [4, 5, 6],
          sort: -1,
          slice: 3
        })
      })
    assert.strictEqual(result.updated, 1)
    result = await db
      .collection(collName)
      .where({
        category: 'Life'
      })
      .get()
    assert.deepStrictEqual(result.data[0].tags2, [6, 5, 4])
  })
})

describe('not', async () => {
  it('match with gt', async () => {
    let result = await db
      .collection(collName)
      .where({
        index: _.not(_.gt(1))
      })
      .get()
    console.log(result)
    assert.strictEqual(result.data.length, 2)
  })

  // not 目前还不支持正则
  it.skip('match with regexp', async () => {
    let result = await db
      .collection(collName)
      .where({
        category: _.not(/www/)
      })
      .get()
    console.log(result)
  })
})

describe('expr', async () => {
  it('with gte', async () => {
    let result = await db
      .collection(collName)
      .where(_.expr($.gte(['$index', 3])))
      .get()
    console.log(result)
    assert.strictEqual(result.data.length, 2)
  })
})

// 目前还不支持设置文本索引
describe.skip('text', async () => {
  it('use string', async () => {
    let result = await db
      .collection(collName)
      .where(_.text('life'))
      .get()
    console.log(result)
  })
})

describe('jsonSchema', async () => {
  it('where', async () => {
    let result = await db
      .collection(collName)
      .where(
        _.jsonSchema({
          required: ['category']
        })
      )
      .get()
    assert.strictEqual(result.data.length, data.length)
  })

  it('nor', async () => {
    let result = await db
      .collection(collName)
      .where(
        _.nor([
          _.jsonSchema({
            required: ['category']
          })
        ])
      )
      .get()
    assert.strictEqual(result.data.length, 0)
  })
})
