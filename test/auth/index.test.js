let Tcb = require('../../index')

const assert = require('assert')
const config = require('../config.local')

process.env.WX_OPENID = 'WX_OPENID'
process.env.WX_APPID = 'WX_APPID'
process.env.TCB_UUID = 'TCB_UUID'
process.env.TCB_CUSTOM_USER_ID = 'TCB_CUSTOM_USER_ID'
process.env.TCB_SOURCE_IP = 'TCB_SOURCE_IP'
process.env.TCB_ISANONYMOUS_USER = false

describe('auth', () => {
  const app = Tcb.init({
    ...config,
    credentials: {
      private_key_id: 'private_key_id',
      private_key:
        '-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAKBgQDkyhsCVf1f6oL67HwGwX7grQqRr/Qz7N98x1yMOZBBtKLSF1Ek\nWeagVqwmeOzGfy5qwEBwlEgVfTKUgu4K3re6hfdqlGKbjQ486iDA/fc6Xy6yBbnn\nXUBo4XCp3+mExUzI7sqP6eRN/Nbuc0KFWGuXLuowMf4eernmGgKvPypYgQIDAQAB\nAoGAYUe2OEYL2C7ExqCrE8xOgIXTSqMAONvtIwc5yL3pIqcF3ELh040OTPrNdAZS\n1wvY1rcsLzI9fDWhvhf101Vj1PO0X4W7D9kbuISxqHybV6cDthKJDruZ/YIGD3a2\nV8+Xy+aCp8e3qvlwIPqaNw6ZLVbZu3wynUGNgE0StS3zAOECQQDvy4+t4n71eBmE\nyX5XJg2CvCnuJBp4oamxS/YtxHpVRtNcYhESF7IH8y5i9X6fuTBhIu75K3+U88V4\ntcFEhnltAkEA9EAljTL7pYk5mxUH6J1b8xI5sIRaJMF/5AZ7ZFWGJd7wNDhDEfBE\nHtOYkm4xndBoBCeMR2kWZfEIAQ3/X3Ri5QJBANwtDaT8ddRPzSaWmDHO19L1kI5/\nieq/jX8kn0rQv/6zBHkr9j6lkSsph6sHfJeNw7U9DS2uWfvbhLLcODQCQVUCQQCt\nZAxEXHkAXpYiXZ+rpmnr+HgzswE7LpJXkbJu27fLkqP6riYOyf3R1GxvJwLaAWSV\n7m1LFHLuE1mXRhSP8tNxAkASV6xhlVT1f0E9lM/Y2NbrN91ok4iIi48NNKF+Ua4b\nOTXXHaxnF7BdT7YjS2lacZOWLnEtheBegVsvpeGU8WI3\n-----END RSA PRIVATE KEY-----\n'
    }
  })

  it('生成登录ticket', async () => {
    const result = app.auth().createTicket('oyeju0Eoc1ZCEgyxfk2vNeYDMpRs', {
      refresh: 5000
    })
    console.log(result)
    assert(result)
  }, 10000)

  it('获取用户信息getUserInfo', async () => {
    assert.deepStrictEqual(app.auth().getUserInfo(), {
      openId: 'WX_OPENID',
      appId: 'WX_APPID',
      uid: 'TCB_UUID',
      customUserId: 'TCB_CUSTOM_USER_ID',
      isAnonymous: false
    })
  })

  it('获取客户端IP', async () => {
    assert.deepStrictEqual(app.auth().getClientIP(), 'TCB_SOURCE_IP')
  })
})
