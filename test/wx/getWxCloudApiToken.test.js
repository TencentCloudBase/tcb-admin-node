const getWxCloudApiToken = require('../../src/utils/getWxCloudApiToken')

let wxApiToken
let wxTriggerApiTokenV0

beforeEach(() => {
  wxApiToken = process.env.WX_API_TOKEN
  wxTriggerApiTokenV0 = process.env.WX_TRIGGER_API_TOKEN_V0
})

afterEach(() => {
  process.env.WX_API_TOKEN = wxApiToken
  process.env.WX_TRIGGER_API_TOKEN_V0 = wxTriggerApiTokenV0
})

describe('getWxCloudApiToken: 获取WxCloudApiToken', () => {
  it('只写入 WX_API_TOKEN 时，使用 WX_API_TOKEN', function() {
    process.env.WX_API_TOKEN = 'WX_API_TOKEN'
    process.env.WX_TRIGGER_API_TOKEN_V0 = ''
    expect(getWxCloudApiToken()).toBe('WX_API_TOKEN')
  })

  it('只写入 WX_TRIGGER_API_TOKEN_V0 时，使用 WX_TRIGGER_API_TOKEN_V0', function() {
    process.env.WX_API_TOKEN = ''
    process.env.WX_TRIGGER_API_TOKEN_V0 = 'WX_TRIGGER_API_TOKEN_V0'
    expect(getWxCloudApiToken()).toBe('WX_TRIGGER_API_TOKEN_V0')
  })

  it('WX_API_TOKEN 和 WX_TRIGGER_API_TOKEN_V0 共存时优先使用 WX_TRIGGER_API_TOKEN_V0', function() {
    process.env.WX_API_TOKEN = 'WX_API_TOKEN'
    process.env.WX_TRIGGER_API_TOKEN_V0 = 'WX_TRIGGER_API_TOKEN_V0'
    expect(getWxCloudApiToken()).toBe('WX_TRIGGER_API_TOKEN_V0')
  })

  it('默认为空', function() {
    process.env.WX_API_TOKEN = ''
    process.env.WX_TRIGGER_API_TOKEN_V0 = ''
    expect(getWxCloudApiToken()).toBe('')
  })
})
