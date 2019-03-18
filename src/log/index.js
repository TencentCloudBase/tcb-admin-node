const fs = require("fs");

/**
 * 调用日志上报函数
 * @param {String} name  函数名
 * @param {Object} functionParam 函数参数
 * @return {Promise}
 */
//
function transformMsg(logMsg) {
  return JSON.stringify({
    time: new Date().getTime(),
    contents: logMsg
    // topicId
  });
}

function fileWrite(fd, string) {
  let writeStream = fs.createWriteStream("", {
    flags: "r+",
    fd,
    autoClose: false
  });

  writeStream.write(string);
  // close the stream
  writeStream.end();
}

function logger(logMsg) {
  const fd = parseInt(process.env._SCF_TCB_SOCK);
  fileWrite(fd, transformMsg(logMsg), offset, "utf8");
}

exports.logger = logger;
