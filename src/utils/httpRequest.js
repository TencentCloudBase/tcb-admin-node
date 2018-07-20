var request = require("request");
var auth = require("./auth.js");

module.exports = function (args) {
  var params = args.params,
    method = args.method || "get";
  // console.log(args);
  let file = null;
  if (params.action === "storage.uploadFile") {
    file = params["file"];
    delete params["file"];
  }

  const authObj = {
    SecretId: args.secretId,
    SecretKey: args.secretKey,
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

  // console.log(params);
  var opts = {
    url: "http://tcb-admin.tencentcloudapi.com/admin",
    method: args.method || "get",
    timeout: args.timeout || 50000,
    headers: authObj.Headers,
    proxy: args.proxy
  };

  if (params.action === "storage.uploadFile") {
    opts.formData = params;
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
        return resolve(body);
      } else {
        return reject(new Error(err));
      }
    });
  });
};
