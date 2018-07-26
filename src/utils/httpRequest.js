var request = require("request");
var auth = require("./auth.js");

module.exports = function (args) {
  var config = args.config,
    params = args.params,
    method = args.method || "get";
  // console.log(args);
  let file = null;
  if (params.action === "storage.uploadFile") {
    file = params["file"];
    delete params["file"];
  }

  if (!config.secretId || !config.secretKey) {
    throw Error('missing secretId or secretKey of tencent cloud')
  }

  const authObj = {
    SecretId: config.secretId,
    SecretKey: config.secretKey,
    Method: method,
    pathname: "/admin",
    Query: params,
    Headers: Object.assign({
        "user-agent": "tcb-admin-sdk"
      },
      args.headers || {}
    )
  };

  var authorization = auth.getAuth(authObj);

  params.authorization = authorization;
  file && (params.file = file);
  config.sessionToken && (params.sessionToken = config.sessionToken);

  // console.log(params);
  var opts = {
    // url: 'http://localhost:8002/admin',
    url: "https://tcb-admin.tencentcloudapi.com/admin",
    method: args.method || "get",
    timeout: args.timeout || 50000,
    headers: authObj.Headers,
    proxy: config.proxy
  };

  if (params.action === "storage.uploadFile") {
    opts.formData = params;
    opts.formData.file = {
      value: params.file,
      options: {
        filename: params.path
      }
    }
  } else if (args.method == "post") {
    opts.body = params;
    opts.json = true;
  } else {
    opts.qs = params;
  }

  if (args.proxy) {
    opts.proxy = args.proxy;
  }

  // console.log(opts);
  return new Promise(function (resolve, reject) {
    request(opts, function (err, response, body) {
      // console.log(err, body);
      if (err === null && response.statusCode == 200) {
        let res
        try {
          res = typeof res === 'string' ? JSON.parse(res) : res
        } catch (e) {
          res = body
        }
        return resolve(res);
      } else {
        return reject(new Error(err));
      }
    });
  });
};
