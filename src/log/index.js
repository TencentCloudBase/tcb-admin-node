// const httpRequest = require("../utils/httpRequest");

/**
 * 调用日志上报函数
 * @param {String} name  函数名
 * @param {Object} functionParam 函数参数
 * @return {Promise}
 */

 // 写入fd的偏移量
let offset = 0

// envId换取topicId信息
// async function getTopicId(envId) {
//   let params = {
//     envId,
//     action: ""
//   };
//   return httpRequest({
//     config: this.config,
//     params,
//     method: "post",
//     headers: {
//       "content-type": "application/json"
//     }
//   }).then(res => {
//     // console.log(res);
//     if (res.code) {
//       return res;
//     } else {
//       let result = res.data.response_data;
//       try {
//         result = JSON.parse(res.data.response_data);
//       } catch (e) {}
//       return {
//         result,
//         requestId: res.requestId
//       };
//     }
//   });
// }

//
function transformMsg(logMsg) {
  return JSON.stringify({
    time: new Date().getTime(),
    contents: logMsg
    // topicId
  });
}

async function fileWrite(fd, string, position, encoding) {
  return new Promise((resolve, reject) => {
      fs.write(fd, string, position, encoding, function(err, written, string) {
          // fs.closeSync(fd)
          if (err) {
              reject({err})
          }
          resolve({
              written,
              string
          })
      });
  })
}

function logger(logMsg) {
  // 获取topicId
  // const topicId = await getTopicId(this.config.env);

  // 写入fd
  const fd = process.env.fd

  const writeResult = await fileWrite(fd, transformMsg(logMsg), offset, 'utf8')

  if(writeResult.err) {
    console.log(writeResult.err)
  }else{
    offset += written
  }
}

exports.logger = logger;
