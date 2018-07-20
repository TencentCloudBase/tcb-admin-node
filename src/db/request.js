"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestHandler = require("../utils/httpRequest");
class Request {
    constructor(db) {
        this.db = db;
        this.secretId = this.db.config.secretId;
        this.secretKey = this.db.config.secretKey;
        this.commParam = {
            appid: db.config.mpAppId,
            envName: db.config.envName,
            timestamp: new Date().valueOf(),
            eventId: ""
        };
    }
    send(api, data) {
        const params = Object.assign({}, data, this.commParam, {
            action: `database.${api}`
        });
        return requestHandler({
            secretId: this.secretId,
            secretKey: this.secretKey,
            params,
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            proxy: this.db.config.proxy
        });
    }
}
exports.Request = Request;
