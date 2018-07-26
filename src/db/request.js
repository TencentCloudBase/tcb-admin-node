"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestHandler = require("../utils/httpRequest");
class Request {
    constructor(db) {
        this.db = db;
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
            config: this.db.config,
            params,
            method: "post",
            headers: {
                "content-type": "application/json"
            }
        });
    }
}
exports.Request = Request;
