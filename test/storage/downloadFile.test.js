let tcb = require("../../index");

const assert = require("assert");
const config = require("../config.js");

describe("storage.downloadFile: 下载文件", () => {
    tcb.init(config);

    it(
        "获取文件链接",
        async () => {
            let result = await tcb.downloadFile({
                fileID: "cloud://jimmytest-088bef/my-photo.png",
                // tempFilePath: '/Users/jimmyzhang/repo/tcb-admin-node/test/storage/my-photo.png'
            });
            require('fs').writeFileSync('/Users/jimmyzhang/repo/tcb-admin-node/test/storage/my-photo.png', result.fileContent)
            assert(result.fileContent, "下载文件结果");
        },
        10000
    );
});
