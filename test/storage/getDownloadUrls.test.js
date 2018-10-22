let tcb = require("../../index");
const fs = require("fs");
let fileContent = fs.createReadStream(`${__dirname}/cos.jpeg`);
const assert = require("assert");
const config = require("../config.js");

describe("storage.batchDeleteFile: 删除文件", () => {
  tcb.init(config);

  it(
    "删除文件",
    async () => {
      let result = await tcb.uploadFile({
        // cloudPath: "test-admin.jpeg",
        cloudPath: "a|b.jpeg",
        fileContent
      }, {
          onResponseReceived: (response) => {
            // console.log(response)
          }
        });
      console.log(result)
      assert(result.fileID, "上传文件失败");
      const fileID = result.fileID
      result = await tcb.getTempFileURL({
        fileList: [fileID]
      });
      console.log(JSON.stringify(result));
      assert(result.fileList, "获取文件链接失败");
    },
    10000
  );
});
