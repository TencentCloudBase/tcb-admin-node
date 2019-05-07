const tcb = require('../../index')
const fs = require('fs')

const assert = require('assert')
const config = require('../config.local')

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('storage.uploadFile: 上传文件', () => {
  tcb.init(config)

  let fileContent = fs.createReadStream(`${__dirname}/cos.jpeg`)
  // let fileContent = Buffer.from('aaaaa')

  it('上传文件、删除文件', async () => {
    let result = await tcb.uploadFile({
      // cloudPath: "test-admin.jpeg",
      cloudPath: 'ab.jpeg',
      fileContent
    })
    assert(result.fileID, '上传文件失败')
    const fileID = result.fileID
    result = await tcb.getTempFileURL({
      fileList: [
        {
          fileID: fileID,
          maxAge: 60
        }
      ]
    })
    assert(result.fileList[0].tempFileURL, '获取下载链接失败')

    result = await tcb.deleteFile({
      fileList: [fileID]
    })
    assert(result.fileList[0].fileID, '删除文件失败')
    assert.strictEqual(fileID, result.fileList[0].fileID)
  }, 10000)
})
