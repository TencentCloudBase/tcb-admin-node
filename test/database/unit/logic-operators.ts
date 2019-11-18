import * as assert from 'power-assert'
import * as app from '../../../index'
import * as Config from '../../config.local'
import * as common from '../../common/index'

app.init(Config)
const db = app.database()
const _ = db.command

describe('逻辑操作符', () => {
  const collName = 'test-projection'
  let passagesCollection = null
  const data = [
    { category: 'Web', tags: ['JavaScript', 'C#'] },
    { category: 'Web', tags: ['Go', 'C#'] },
    { category: 'Life', tags: ['Go', 'Python', 'JavaScript'] }
  ]

  beforeAll(async () => {
    passagesCollection = await common.safeCollection(db, collName)
    const success = await passagesCollection.create(data)
    assert.strictEqual(success, true)
  })

  afterAll(async () => {
    const success = await passagesCollection.remove()
    assert.strictEqual(success, true)
  })

  it('nor', async () => {
    const result = await db
      .collection(collName)
      .where({
        category: _.nor(_.eq('Life'), _.eq('Web'))
      })
      .get()
    assert.deepStrictEqual(result.data, [])
  })
})
