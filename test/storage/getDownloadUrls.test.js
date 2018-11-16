let tcb = require("../../index");
const fs = require("fs");
let fileContent = fs.createReadStream(`${__dirname}/cos.jpeg`);
const assert = require("assert");
const config = require("../config.local");

describe("storage.batchDeleteFile: 删除文件", () => {
  tcb.init(config);

  it("上传文件、获取文件链接", async () => {
      let result = await tcb.uploadFile({
        // cloudPath: "test-admin.jpeg",
        cloudPath: "a|b.jpeg",
        fileContent
      }, {
          onResponseReceived: (response) => {
            // console.log(response)
          }
        });
      expect(result.fileID).not.toBeNull()
      console.log(result)
      const fileID = result.fileID
      result = await tcb.getTempFileURL({
        fileList: [fileID]
      });
      console.log(JSON.stringify(result));
      expect(result.fileList[0].code).toBe('SUCCESS')
    },
    10000
  );

  it("fileID的环境ID和当前环境ID不一致", async () => {
    result = await tcb.getTempFileURL({
      fileList: ['cloud://xxxx0000.tcbenv-mPIgjhnq/1535367916760.jpg']
    });
    expect(result.fileList[0].code).toBe('STORAGE_FILE_NONEXIST')
  })

  it("文件不存在", async () => {
    result = await tcb.getTempFileURL({
      fileList: [`cloud://${config.env}.tcbenv-mPIgjhnq/1535367916760.jpg`]
    });
    expect(result.fileList[0].code).toBe('STORAGE_FILE_NONEXIST')
  })
});
