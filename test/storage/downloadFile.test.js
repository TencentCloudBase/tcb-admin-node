let tcb = require("../../index");

const assert = require("assert");
const config = require("../config.js");

describe("storage.downLoadFile: 下载文件", () => {
  tcb.init(
    Object.assign({
        envName: config.envName,
        mpAppId: config.appId
      },
      config
    )
  );

  it(
    "下载文件",
    async () => {
      let result = await tcb.downloadFile({
        fileID: 'test-admin.txt'
      });
      console.log(JSON.stringify(result));
    },
    10000
  );
});
