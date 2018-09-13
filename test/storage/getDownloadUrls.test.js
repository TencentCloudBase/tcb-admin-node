let tcb = require("../../index");

const assert = require("assert");
const config = require("../config.js");

describe("storage.getDownloadUrls: 获取文件链接", () => {
  app = tcb.init(config);
  app1 = tcb.init({
    secretId: "AKIDY3Ws27uiEg0CC1QEg4GJCvWZUFrJhw66",
    secretKey: "2xiKmx1tdEhy76tVvJWggU7ZYP5cyCHO",
    env: "tcbenv-mPIgjhnq"
  })

  it(
    "获取文件链接",
    async () => {
      let result = await app.getTempFileURL({
        fileList: ["cloud://jimmytest-088bef/my-photo.png"]
      });
      console.log(JSON.stringify(result));
      assert(result.fileList, "获取文件链接失败");
    },
    10000
  );
});
