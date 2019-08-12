let Tcb = require('../../index')

const assert = require('assert')
const config = require('../config.local')

describe('auth', () => {
  const app = Tcb.init({ env: 'a' })
  const app1 = Tcb.init(config)

  it('生成登录ticket', async () => {
    const result = app1.auth().createTicket('oyeju0Eoc1ZCEgyxfk2vNeYDMpRs', {
      refresh: 5000
    })
    console.log(result)
    assert(result)
  }, 10000)
})
