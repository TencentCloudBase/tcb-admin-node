const jwt = require('jsonwebtoken')

function validateUid(uid) {
  if (typeof uid !== 'string') {
    throw new TypeError('uid must be a string')
  }
  if (!/^[a-zA-Z0-9]{4,32}$/.test(uid)) {
    throw new Error(`Invalid uid: "${uid}"`)
  }
}

exports.auth = function() {
  let self = this
  return {
    getUserInfo() {
      const openId = process.env.WX_OPENID || ''
      const appId = process.env.WX_APPID || ''
      const uid = process.env.TCB_UUID || ''
      const customUserId = process.env.TCB_CUSTOM_USER_ID || ''
      const isAnonymous =
        process.env.TCB_ISANONYMOUS_USER === 'true' ? true : false

      return {
        openId,
        appId,
        uid,
        customUserId,
        isAnonymous
      }
    },
    async getAuthContext(context) {
      const { environment, environ } = self.parseContext(context)
      const env = environment || environ || {}
      const { TCB_UUID, LOGINTYPE } = env
      const res = {
        uid: TCB_UUID,
        loginType: LOGINTYPE
      }
      if (LOGINTYPE === 'QQ-MINI') {
        const { QQ_OPENID, QQ_APPID } = env
        res.appId = QQ_APPID
        res.openId = QQ_OPENID
      }
      return res
    },
    getClientIP() {
      return process.env.TCB_SOURCE_IP || ''
    },
    createTicket: (uid, options = {}) => {
      validateUid(uid)
      const timestamp = new Date().getTime()
      const { credentials, envName } = this.config
      if (!envName) {
        throw new Error('no env in config')
      }
      const {
        refresh = 3600 * 1000,
        expire = timestamp + 7 * 24 * 60 * 60 * 1000
      } = options
      var token = jwt.sign(
        {
          alg: 'RS256',
          env: envName,
          iat: timestamp,
          exp: timestamp + 10 * 60 * 1000, // ticket十分钟有效
          uid,
          refresh,
          expire
        },
        credentials.private_key,
        { algorithm: 'RS256' }
      )

      return credentials.private_key_id + '/@@/' + token
    }
  }
}
