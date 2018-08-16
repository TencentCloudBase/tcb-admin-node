let tcb = require("../../index");
const fs = require("fs");

const assert = require("assert");
const config = require("../config.js");

describe("storage.uploadFile: 上传文件", () => {
  tcb.init(config);

  let fileContent = fs.createReadStream(`${__dirname}/cos.jpeg`);
  // let fileContent = Buffer.from('aaaaa')

  it(
    "上传文件",
    async () => {
      let result = await tcb.uploadFile({
        // cloudPath: "test-admin.jpeg",
        cloudPath: "测试.jpeg",
        fileContent
      }, {
          onResponseReceived: (response) => {
            console.log(response)
          }
        });
      console.log(result);
      assert(result.fileID, "上传文件失败");

      result = await tcb.getTempFileURL({
        fileList: [
          {
            fileID: result.fileID,
            maxAge: 60
          }
        ]
      });
      console.log(JSON.stringify(result));

      assert(result.fileList[0].tempFileURL, "上传文件失败");
    },
    10000
  );
});
