// 优先使用 WX_TRIGGER_API_TOKEN_V0, 不存在时
function getWxCloudApiToken() {
  return process.env.WX_TRIGGER_API_TOKEN_V0 || process.env.WX_API_TOKEN || ''
}

module.exports = getWxCloudApiToken
