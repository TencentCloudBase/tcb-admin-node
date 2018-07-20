const httpRequest = require("../utils/httpRequest");

/**
 * 调用云函数
 * @param {String} name  函数名
 * @param {Object} functionParam 函数参数
 * @return {Promise}
 */
function callFunction({
  name,
  data
}) {
  try {
    data = data ? JSON.stringify(data) : "";
  } catch (e) {
    return Promise.reject(e);
  }
  if (!name) {
    return Promise.reject(new Error({
      message: "函数名不能为空"
    }));
  }

  let params = Object.assign(this.commParam, {
    action: "functions.invokeFunction",
    function_name: name,
    request_data: data
  });

  return httpRequest({
    secretId: this.config.secretId,
    secretKey: this.config.secretKey,
    params,
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    proxy: this.config.proxy
  });
}

exports.callFunction = callFunction;
