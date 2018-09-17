let tcb = require("../../index");

const assert = require("assert");
const config = require("../config.js");

describe("storage.batchDeleteFile: 删除文件", () => {
  tcb.init(config);

  it(
    "删除文件",
    async () => {
      let result = await tcb.deleteFile({
        fileList: [
          "cloud://jimmytest-088bef/m.png"
        ]
      });
      console.log(JSON.stringify(result));
      assert(result.fileList[0].fileID, "删除文件失败");
    },
    10000
  );
});
