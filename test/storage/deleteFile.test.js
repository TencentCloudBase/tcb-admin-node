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
          "HHOeahVQ0fRTDsums4GVgMCsF6CE3wb7kmIkZbX+yilTJE4NPSQQW5EYksuoSUsQWTug1+VMN4pTbvLiXdqzI8em2YK679ivkqy4MIQ39K4Z+cXlFvGAX9zGYH0QwCmFTuYq+HwByQj3b4Rh94/zbeM3uyjPcIMjBwIxQpi2b61eEXvoLheXFrHo5NbqtqS40eporI5p/5KUW5ZxthRnyD2yiB6PHwXsKZO43VmQyUNkuzzsRzuAHwEgV29oVs8SEOrg9Z0S3TvL/1FyjheJ4vDwtTxLSBkXnzZRc7IL2m3dEcxLxtDAE3qFltPtNTFUGw==",
          "HHOeahVQ0fRTDsums4GVgMCsF6CE3wb7kmIkZbX+yilTJE4NPSQQW5EYksuoSUsQWTug1"
        ]
      });
      console.log(JSON.stringify(result));
      assert(result.fileList[0].fileID, "删除文件失败");
    },
    10000
  );
});
