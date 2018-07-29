let tcb = require("../../index");

const assert = require("assert");
const config = require("../config.js");

describe("storage.getDownloadUrls: 获取文件链接", () => {
  tcb.init(config);

  it(
    "获取文件链接",
    async () => {
      let result = await tcb.getTempFileURL({
        fileList: [
          {
            fileID: "cloud://jimmytest-088bef/test-admin.jpeg",
            maxAge: 60
          }
        ]
      });
      console.log(JSON.stringify(result));
      assert(result.fileList[0].tempFileURL, "获取文件链接失败");
    },
    10000
  );
});
