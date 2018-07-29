const storage = require("./src/storage");
const database = require("./src/db").Db;
const functions = require("./src/functions");

function Tcb() {
  this.config = {
    get secretId() {
      return this._secretId ? this._secretId : process.env.TENCENTCLOUD_SECRETID
    },
    set secretId(id) {
      this._secretId = id
    },
    get secretKey() {
      return this._secretKey ? this._secretKey : process.env.TENCENTCLOUD_SECRETKEY
    },
    set secretKey(key) {
      this._secretKey = key
    },
    get sessionToken() {
      return this._sessionToken ? this._sessionToken : process.env.TENCENTCLOUD_SESSIONTOKEN
    },
    set sessionToken(token) {
      this._sessionToken = token
    },
    envName: undefined,
    proxy: undefined
  };
}

Tcb.prototype.init = function ({
  secretId,
  secretKey,
  sessionToken,
  env,
  proxy
}) {
  secretId && (this.config.secretId = secretId)
  secretKey && (this.config.secretKey = secretKey)
  sessionToken && (this.config.sessionToken = sessionToken)
  env && (this.config.envName = env)
  proxy && (this.config.proxy = proxy)
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
