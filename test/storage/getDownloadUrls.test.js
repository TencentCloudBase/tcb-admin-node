let tcb = require("../../index");

const assert = require("assert");
const config = require("../config.js");

describe("storage.getDownloadUrls: 获取文件链接", () => {
  tcb.init(
    Object.assign({
        envName: config.envName,
        mpAppId: config.appId
      },
      config
    )
  );

  it(
    "获取文件链接",
    async () => {
      let result = await tcb.getTempFileURL({
        fileList: [{
          fileID: "jimmytest-088bef/test-admin.jpeg",
          maxAge: 60
        }]
      });
      console.log(JSON.stringify(result));
      assert(result, "获取文件链接失败");
    },
    10000
  );
});
