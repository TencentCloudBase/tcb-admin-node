const storage = require("./src/storage");
const database = require("./src/db").Db;
const functions = require("./src/functions");
const ai = require("./src/ai");

function Tcb() {}
Tcb.prototype.init = function ({
  secretId,
  secretKey,
  envName,
  mpAppId,
  proxy
}) {
  if (!secretId || !secretKey) {
    secretId = process.env.TENCENTCLOUD_SECRETID
    secretKey = process.env.TENCENTCLOUD_SECRETKEY
  }

  if (!secretId || !secretKey) {
    throw Error('missing required secretId or secretKey of tencent cloud account')
  }

  this.config = {
    secretId,
    secretKey,
    envName,
    mpAppId,
    proxy
  };
  // console.log(this.config)
  this.commParam = {
    appid: this.config.mpAppId,
    envName: this.config.envName,
    timestamp: new Date().valueOf(),
    eventId: ""
  };
};

Tcb.prototype.database = function () {
  return new database(this.config);
};

function each(obj, fn) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      fn(obj[i], i);
    }
  }
}

function extend(target, source) {
  each(source, function (val, key) {
    target[key] = source[key];
  });
  return target;
}

extend(Tcb.prototype, functions);
extend(Tcb.prototype, storage);
// extend(Tcb.prototype, ai);

module.exports = new Tcb();
