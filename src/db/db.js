"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Geo = require("./geo");
const collection_1 = require("./collection");
const command_1 = require("./command");
const serverDate_1 = require("./serverDate");
class Db {
    constructor(config) {
        this.config = config;
        this.Geo = Geo;
        this.command = new command_1.Command();
    }
    serverDate(offset = 0) {
        return new serverDate_1.ServerDate(offset);
    }
    collection(collName) {
        if (!collName) {
            throw new Error("Collection name is required");
        }
        return new collection_1.CollectionReference(this, collName);
    }
}
exports.Db = Db;
