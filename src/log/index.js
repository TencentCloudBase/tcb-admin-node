const fs = require('fs')
const LOG_SIZE_LIMIT = 512 * 1024

/**
 * 调用日志上报函数
 * @param {String} name  函数名
 * @param {Object} functionParam 函数参数
 * @return {Promise}
 */
//
function transformMsg(logMsg) {
  // 目前logMsg只支持字符串value且不支持多级, 加一层转换处理
  for (let key in logMsg) {
    // undefined bool number function => String()
    // object => JSON.stringify
    if (Object.prototype.toString.call(logMsg[key]).slice(8, -1) === 'Object') {
      logMsg[key] = JSON.stringify(logMsg[key])
    } else {
      logMsg[key] = String(logMsg[key])
    }
  }

  return (
    JSON.stringify({
      time: new Date().getTime(),
      contents: logMsg
      // topicId
    }) + '\n\t\n'
  )
}

function fileWrite(fd, string) {
  let writeStream = fs.createWriteStream('', {
    flags: 'r+',
    fd,
    autoClose: false
  })

  writeStream.on('error', err => {
    throw err
  })

  writeStream.write(string)
  // close the stream
  writeStream.end()
}

function logger(logMsg) {
  // 判断logMsg是否为对象
  // if (logMsg === null || typeof logMsg !== "object") {
  if (Object.prototype.toString.call(logMsg).slice(8, -1) !== 'Object') {
    throw Error('please input correct log msg')
  }

  const msgContent = transformMsg(logMsg)

  // 检查日志数据量是否超限, 单行512KB
  if (Buffer.byteLength(msgContent) > LOG_SIZE_LIMIT) {
    throw Error('single log size beyond 512KB')
  }

  // 环境变量里取不到fd
  if (!process.env._SCF_TCB_SOCK) {
    throw Error('fd value is not exist')
  }

  const fd = parseInt(process.env._SCF_TCB_SOCK)
  fileWrite(fd, msgContent)
}

exports.logger = logger
