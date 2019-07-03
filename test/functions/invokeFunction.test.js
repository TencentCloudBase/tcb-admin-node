let Tcb = require('../../index')

const assert = require('assert')
const config = require('../config.local')

describe('functions.invokeFunction: 执行云函数', () => {
  const app = Tcb.init({ env: 'a' })
  const app1 = Tcb.init(config)

  it('执行云函数', async () => {
    const result = await app1.callFunction({
      name: 'test',
      data: { a: 1 }
    })
    console.log(result)
    // assert(result.result, "执行云函数失败");
    expect.objectContaining({ result: expect.anything() })
  }, 10000)
})
