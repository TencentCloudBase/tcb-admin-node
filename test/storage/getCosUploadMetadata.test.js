const tcb = require('../../index')
const fs = require('fs')
const path = require('path')

const assert = require('assert')
const config = require('../config.local')

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('storage.uploadFile: 上传文件', () => {
  tcb.init(config)

  it('获取COS直传信息', async () => {
    let result = await tcb.getUploadMetadata({
      // cloudPath: "test-admin.jpeg",
      cloudPath: 'test.png'
    })
    assert(result.data.url)
    assert(result.data.token)
    assert(result.data.authorization)
  }, 10000)

  it('上传文件', async () => {
    let result = await tcb.uploadFile({
      cloudPath: '测试.png',
      fileContent: fs.createReadStream(
        path.resolve(__dirname, './my-photo.png')
      )
    })
    assert(result.fileID)

    result = await tcb.getTempFileURL({
      fileList: [result.fileID]
    })
    console.log(result)
    assert(result.fileList)
    assert(result.fileList[0].fileID)
  }, 10000)
})
