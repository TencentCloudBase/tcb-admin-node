let Tcb = require('../../index')
const assert = require('assert')
const config = require('../config.local')

//
describe('解析云函数环境变量', async () => {
  it('mock parseContext', async () => {
    const mockContext = {
      memory_limit_in_mb: 256,

      time_limit_in_ms: 3000,

      request_id: '3169444b-25f4-11ea-81e5-525400235f2a',

      environ:
        'WX_CLIENTIP=10.12.23.71;WX_CLIENTIPV6=::ffff:10.12.23.71;WX_APPID=aaaaa;WX_OPENID=aaaaaa;WX_API_TOKEN=aaaaaaaaaaa==;WX_CONTEXT_KEYS=WX_CLIENTIP,WX_CLIENTIPV6,WX_APPID,WX_OPENID,WX_API_TOKEN;TCB_ENV=luke-87pns;TCB_SEQID=1577153917182_0.13161529658114857_33555268;TRIGGER_SRC=tcb;TCB_SESSIONTOKEN=aaaaaa-Sj-l59rfLi_s1TdYiA82HjIJzbVKnKEHzuFLJlonOIYd_NFnkQJw4MB0L6vYLcmDYYMzEhrByAddagrSdoxux6vwHfJ4B0tzzajmcXqFKkowDZJn5ZZBX1I-Sta1nfoX73qTCqlUWPAAhkhECa81LSvZrFTfsvZyLOOAvevK_kP5qy2zeYKgQtb9IvHI1xmOSj0AaTIiuqOce5i4_kLu5_Z9Gqqxc1PS2oimkhWRqL79E-sW-fF3HpuGD01W832B2wn9W3vpaKi50lyN2gAyKW3Wf0ASA_vPVyZziR20fkmfmThrrBnLgGYd-FPAk;TCB_SOURCE=wx_devtools;TCB_CONTEXT_KEYS=TCB_ENV,TCB_SEQID,TRIGGER_SRC,TCB_SESSIONTOKEN,TCB_SOURCE;TENCENTCLOUD_SECRETID=aaaaaaaaa;TENCENTCLOUD_SECRETKEY=aaaaaaaaa=;TENCENTCLOUD_SESSIONTOKEN=aaaaaaaa-XtxXU-g6pm7sXBpGwkJzRcEyYQHnnB6AONAbRfbphlIm-BfGhdXY2RQeEj7UiOWKTw1_VliMk8HIhgNYRZx0Ue6KXiNUneMvX5SgOOOToOCM2-YJTh6oYj1NhoLaefxPRf8TQ72yLWTagRh0x9IaTtpp6jrJFR7lBA26JLgATRnGJRw-iO2HNMCDSSVVT_VnhO46JGGUdEjfBCzs-6uU0jTSlE_Q7EKOt9_4N3a6JfzCxsJQV8IebfZXcTcVqjefiIHZyNGv71-GUbpfHhhfy_EhPlRJsDnvCByiqsM3celEvf86LtIBI-m2Tbae-K069lu5wC3_PFxC_5hjvIiTpfiQW2wEKwlSuklQ;SCF_NAMESPACE=luke-87pns',

      function_version: '$LATEST',

      function_name: 'login',

      namespace: 'luke-87pns'
    }
    const contextObj = Tcb.parseContext(mockContext)
    console.log(contextObj)

    // 验证environ有value含;情形  如a=b;;sfsdf 解析结果为a=b 忽略分号后字符串
    const mockContext1 = {
      memory_limit_in_mb: 256,

      time_limit_in_ms: 3000,

      request_id: '3169444b-25f4-11ea-81e5-525400235f2a',

      environ:
        'a=b;;sfsdf;WX_CLIENTIP=10.12.23.71;WX_CLIENTIPV6=::ffff:10.12.23.71;WX_APPID=aaaaa;WX_OPENID=aaaaaa;WX_API_TOKEN=aaaaaaaaaaa==;WX_CONTEXT_KEYS=WX_CLIENTIP,WX_CLIENTIPV6,WX_APPID,WX_OPENID,WX_API_TOKEN;TCB_ENV=luke-87pns;TCB_SEQID=1577153917182_0.13161529658114857_33555268;TRIGGER_SRC=tcb;TCB_SESSIONTOKEN=aaaaaa-Sj-l59rfLi_s1TdYiA82HjIJzbVKnKEHzuFLJlonOIYd_NFnkQJw4MB0L6vYLcmDYYMzEhrByAddagrSdoxux6vwHfJ4B0tzzajmcXqFKkowDZJn5ZZBX1I-Sta1nfoX73qTCqlUWPAAhkhECa81LSvZrFTfsvZyLOOAvevK_kP5qy2zeYKgQtb9IvHI1xmOSj0AaTIiuqOce5i4_kLu5_Z9Gqqxc1PS2oimkhWRqL79E-sW-fF3HpuGD01W832B2wn9W3vpaKi50lyN2gAyKW3Wf0ASA_vPVyZziR20fkmfmThrrBnLgGYd-FPAk;TCB_SOURCE=wx_devtools;TCB_CONTEXT_KEYS=TCB_ENV,TCB_SEQID,TRIGGER_SRC,TCB_SESSIONTOKEN,TCB_SOURCE;TENCENTCLOUD_SECRETID=aaaaaaaaa;TENCENTCLOUD_SECRETKEY=aaaaaaaaa=;TENCENTCLOUD_SESSIONTOKEN=aaaaaaaa-XtxXU-g6pm7sXBpGwkJzRcEyYQHnnB6AONAbRfbphlIm-BfGhdXY2RQeEj7UiOWKTw1_VliMk8HIhgNYRZx0Ue6KXiNUneMvX5SgOOOToOCM2-YJTh6oYj1NhoLaefxPRf8TQ72yLWTagRh0x9IaTtpp6jrJFR7lBA26JLgATRnGJRw-iO2HNMCDSSVVT_VnhO46JGGUdEjfBCzs-6uU0jTSlE_Q7EKOt9_4N3a6JfzCxsJQV8IebfZXcTcVqjefiIHZyNGv71-GUbpfHhhfy_EhPlRJsDnvCByiqsM3celEvf86LtIBI-m2Tbae-K069lu5wC3_PFxC_5hjvIiTpfiQW2wEKwlSuklQ;SCF_NAMESPACE=luke-87pns',

      function_version: '$LATEST',

      function_name: 'login',

      namespace: 'luke-87pns'
    }
    const contextObj1 = Tcb.parseContext(mockContext1)
    assert(contextObj1.environ.a === 'b')

    // 验证含environment字段，且json字符串为含特殊字符情形
    const mockContext2 = {
      memory_limit_in_mb: 256,

      time_limit_in_ms: 3000,

      request_id: '3169444b-25f4-11ea-81e5-525400235f2a',

      environ:
        'a=b;;sfsdf;WX_CLIENTIP=10.12.23.71;WX_CLIENTIPV6=::ffff:10.12.23.71;WX_APPID=aaaaa;WX_OPENID=aaaaaa;WX_API_TOKEN=aaaaaaaaaaa==;WX_CONTEXT_KEYS=WX_CLIENTIP,WX_CLIENTIPV6,WX_APPID,WX_OPENID,WX_API_TOKEN;TCB_ENV=luke-87pns;TCB_SEQID=1577153917182_0.13161529658114857_33555268;TRIGGER_SRC=tcb;TCB_SESSIONTOKEN=aaaaaa-Sj-l59rfLi_s1TdYiA82HjIJzbVKnKEHzuFLJlonOIYd_NFnkQJw4MB0L6vYLcmDYYMzEhrByAddagrSdoxux6vwHfJ4B0tzzajmcXqFKkowDZJn5ZZBX1I-Sta1nfoX73qTCqlUWPAAhkhECa81LSvZrFTfsvZyLOOAvevK_kP5qy2zeYKgQtb9IvHI1xmOSj0AaTIiuqOce5i4_kLu5_Z9Gqqxc1PS2oimkhWRqL79E-sW-fF3HpuGD01W832B2wn9W3vpaKi50lyN2gAyKW3Wf0ASA_vPVyZziR20fkmfmThrrBnLgGYd-FPAk;TCB_SOURCE=wx_devtools;TCB_CONTEXT_KEYS=TCB_ENV,TCB_SEQID,TRIGGER_SRC,TCB_SESSIONTOKEN,TCB_SOURCE;TENCENTCLOUD_SECRETID=aaaaaaaaa;TENCENTCLOUD_SECRETKEY=aaaaaaaaa=;TENCENTCLOUD_SESSIONTOKEN=aaaaaaaa-XtxXU-g6pm7sXBpGwkJzRcEyYQHnnB6AONAbRfbphlIm-BfGhdXY2RQeEj7UiOWKTw1_VliMk8HIhgNYRZx0Ue6KXiNUneMvX5SgOOOToOCM2-YJTh6oYj1NhoLaefxPRf8TQ72yLWTagRh0x9IaTtpp6jrJFR7lBA26JLgATRnGJRw-iO2HNMCDSSVVT_VnhO46JGGUdEjfBCzs-6uU0jTSlE_Q7EKOt9_4N3a6JfzCxsJQV8IebfZXcTcVqjefiIHZyNGv71-GUbpfHhhfy_EhPlRJsDnvCByiqsM3celEvf86LtIBI-m2Tbae-K069lu5wC3_PFxC_5hjvIiTpfiQW2wEKwlSuklQ;SCF_NAMESPACE=luke-87pns',

      function_version: '$LATEST',

      function_name: 'login',

      namespace: 'luke-87pns',
      environment: JSON.stringify({ a: 'b;c;fs;d' })
    }

    const contextObj2 = Tcb.parseContext(mockContext2)
    assert(contextObj2.environment.a === 'b;c;fs;d')
  })

  it('解析 symbol', async () => {
    let newConfig = {
      ...config,
      env: Tcb.SYMBOL_CURRENT_ENV
    }

    const app = Tcb.init(newConfig)
    const testEnv = 'luketest-0nmm1'
    // const testEnv = ''
    process.env.TCB_ENV = testEnv
    const res = await await app.callFunction({
      name: 'testTCBENV',
      data: { a: 1 }
    })
    // console.log(res)
    assert(res.result === testEnv)
  })
})
