const fs = require("fs");
const LOG_SIZE_LIMIT = 512 * 1024;

/**
 * 调用日志上报函数
 * @param {String} name  函数名
 * @param {Object} functionParam 函数参数
 * @return {Promise}
 */
//
function transformMsg(logMsg) {
  return (
    JSON.stringify({
      time: new Date().getTime(),
      contents: logMsg
      // topicId
    }) + "\n\t\n"
  );
}

function fileWrite(fd, string) {
  let writeStream = fs.createWriteStream("", {
    flags: "r+",
    fd,
    autoClose: false
  });

  writeStream.on("error", err => {
    throw err;
  });

  writeStream.write(string);
  // close the stream
  writeStream.end();
}

function logger(logMsg) {
  // 判断logMsg是否为对象
  if (logMsg === null || typeof logMsg !== "object") {
    throw Error("please input correct log msg");
  }

  const msgContent = transformMsg(logMsg);

  // 检查日志数据量是否超限, 单行512KB
  if (Buffer.byteLength(msgContent) > LOG_SIZE_LIMIT) {
    throw Error("single log size beyond 512KB");
  }

  const fd = parseInt(process.env._SCF_TCB_SOCK);
  fileWrite(fd, msgContent);
}

exports.logger = logger;
