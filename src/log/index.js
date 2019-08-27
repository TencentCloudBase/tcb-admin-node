const fs = require('fs')
const util = require('util')
const microtime = require('microtime')
const LOG_SIZE_LIMIT = 512 * 1024


/**
 *
 *
 * @class Log
 */
class Log {
  constructor(context) {
    this.src = 'app'
    this.function = context.function_name || ''
    this.requestId = context.request_id || ''
  }

  /**
   *
   *
   * @returns
   * @memberof Log
   */
  getMicroTime() {
    return microtime.now()
  }

  /**
   *
   *
   * @param {*} fd
   * @param {*} string
   * @memberof Log
   */
  fileWrite(fd, string) {
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

  /**
   *
   *
   * @param {*} logMsg
   * @param {*} logLevel
   * @returns
   * @memberof Log
   */
  transformMsg(logMsg, logLevel) {
    // 目前logMsg只支持字符串value且不支持多级, 加一层转换处理
    let realMsg = {
      // msg: logMsg,
      level: logLevel,
      timestamp: this.getMicroTime(),
      function: this.function,
      requestId: this.requestId,
      src: this.src
    }

    realMsg = Object.assign({}, realMsg, logMsg)

    for (let key in realMsg) {
      try{
        realMsg[key] = JSON.stringify(realMsg[key])
      }catch(err) {
        realMsg[key] = util.inspect(realMsg[key])
      }
    }


    return (
      // JSON.stringify({
      //   level: logLevel,
      //   // time: new Date().getTime(),
      //   timestamp: this.getMicroTime(),
      //   function: this.function,
      //   requestId: this.requestId,
      //   src: this.src,
      //   contents: logMsg
      //   // topicId
      // }) + '\n\t\n'

      JSON.stringify({
        time: this.getMicroTime(),
        contents: realMsg
        // topicId
      }) + '\n\t\n'
    )
  }

  /**
   *
   *
   * @param {*} logMsg
   * @param {*} logLevel
   * @memberof Log
   */
  baseLog(logMsg, logLevel) {
    if (Object.prototype.toString.call(logMsg).slice(8, -1) !== 'Object') {
      throw Error('please input correct log msg')
    }

    const msgContent = this.transformMsg(logMsg, logLevel)

    console.log('msg*****', msgContent)
    // 检查日志数据量是否超限, 单行512KB
    if (Buffer.byteLength(msgContent) > LOG_SIZE_LIMIT) {
      throw Error('single log size beyond 512KB')
    }

    // 环境变量里取不到fd
    if (!process.env._SCF_TCB_SOCK) {
      throw Error('fd value is not exist')
    }

    const fd = parseInt(process.env._SCF_TCB_SOCK)
    this.fileWrite(fd, msgContent)

    // 双写一份到标准输出
    process.stdout.write(msgContent)
  }


  /**
   *
   *
   * @param {*} logMsg
   * @memberof Log
   */
  log(logMsg) {
    this.baseLog(logMsg, 'log')
  }

  /**
   *
   *
   * @param {*} logMsg
   * @memberof Log
   */
  info(logMsg) {
    this.baseLog(logMsg, 'info')
  }

  /**
   *
   *
   * @param {*} logMsg
   * @memberof Log
   */
  error(logMsg) {
    this.baseLog(logMsg, 'error')
  }

  /**
   *
   *
   * @param {*} logMsg
   * @memberof Log
   */
  warn(logMsg) {
    this.baseLog(logMsg, 'warn')
  }
}

let logger = null

exports.logger = (context) => {
  if(!logger) {
    return new Log(context)
  }
  return logger
}
