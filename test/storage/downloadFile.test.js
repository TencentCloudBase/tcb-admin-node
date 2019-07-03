let tcb = require('../../index')

const assert = require('assert')
const config = require('../config.local')

describe('storage.downloadFile: 下载文件', () => {
  const app = tcb.init(config)
  const app1 = tcb.init({
    secretId: 'AKIDY3Ws27uiEg0CC1QEg4GJCvWZUFrJhw66',
    secretKey: '2xiKmx1tdEhy76tVvJWggU7ZYP5cyCHO',
    env: 'tcbenv-mPIgjhnq'
  })

  it('获取文件链接', async () => {
    let result = await app.downloadFile({
      fileID: 'cloud://jimmytest-088bef/1534576354877.jpg'
      // tempFilePath: '/Users/jimmyzhang/repo/tcb-admin-node/test/storage/my-photo.png'
    })
    console.log(result)
    if (!result.code)
      require('fs').writeFileSync(
        '/Users/jimmyzhang/repo/tcb-admin-node/test/storage/my-photo.png',
        result.fileContent
      )
    assert(result, '下载文件结果')
  }, 10000)
})
