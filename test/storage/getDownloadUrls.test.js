let tcb = require('../../index')
const fs = require('fs')
let fileContent = fs.createReadStream(`${__dirname}/cos.jpeg`)
const assert = require('assert')
const config = require('../config.local')

describe('storage.batchDeleteFile: 删除文件', () => {
  tcb.init(config)

  it('单环境下上传文件、获取文件链接', async () => {
    let result = await tcb.uploadFile({
      // cloudPath: "test-admin.jpeg",
      cloudPath: 'a|b测试.jpeg',
      fileContent
    })
    expect(result.fileID).not.toBeNull()
    console.log(result)
    const fileID = result.fileID
    result = await tcb.getTempFileURL({
      fileList: [fileID]
    })
    console.log(JSON.stringify(result))
    expect(result.fileList[0].code).toBe('SUCCESS')
  }, 10000)

  // it("获取多环境下文件链接", async () => {
  //   // 本地测试时配置qbase-service 下checkCamAuth文件 qcAppId: 1257145308,uin: 100006570100
  //   // tcb-admin-node 下config.js文件 env: "luke-001" (或luke-004, luke-005)
  //   const fileIDList = [
  //     "cloud://luke-001.6c75-luke-001-1251178460/a|b.jpeg",
  //     "cloud://luke-004.6c75-luke-004-1251178460/a|b.jpeg",
  //     "cloud://luke-005.6c75-luke-005-1251178460/a|b.jpeg",
  //     "cloud://luke-005.6c75-luke-005-1251178460/a|b.jpeg"
  //   ];
  //   result = await tcb.getTempFileURL({
  //     fileList: fileIDList
  //   });
  //   console.log("result:", JSON.stringify(result));
  //   for (let file of result.fileList) {
  //     expect(file.code).toBe("SUCCESS");
  //   }
  // }, 10000);

  // it("fileID的环境ID和当前环境ID不一致", async () => {
  //   result = await tcb.getTempFileURL({
  //     fileList: ["cloud://xxxx0000.tcbenv-mPIgjhnq/1535367916760.jpg"]
  //   });
  //   expect(result.fileList[0].code).toBe("INVALIID_ENV");
  // });

  it('文件不存在', async () => {
    const result = await tcb.getTempFileURL({
      fileList: [`cloud://${config.env}.tcbenv-mPIgjhnq/1535367916760.jpg`]
    })
    expect(result.fileList[0].code).toBe('STORAGE_FILE_NONEXIST')
  })
})
