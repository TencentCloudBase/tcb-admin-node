"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
const util_1 = require("./util");
class DocumentReference {
    constructor(db, coll, docID) {
        this._db = db;
        this._coll = coll;
        this.id = docID;
        this.request = new request_1.Request(this._db);
    }
    create(data) {
        let params = {
            collectionName: this._coll,
            data: this.processData(data),
        };
        if (this.id) {
            params['_id'] = this.id;
        }
        return new Promise(resolve => {
            this.request.send("addDocument", params).then(res => {
                if (res.code) {
                    resolve(res);
                }
                resolve({
                    id: res.data._id,
                    requestId: res.requestId
                });
            });
        });
    }
    set(data) {
        let param = {
            collectionName: this._coll,
            data: this.processData(data),
            multi: false,
            merge: false,
            upsert: true,
        };
        if (this.id) {
            param['query'] = { _id: this.id };
        }
        return new Promise(resolve => {
            this.request.send("updateDocument", param).then(res => {
                if (res.code) {
                    resolve(res);
                }
                else {
                    resolve({
                        updated: res.data.updated,
                        upsertedId: res.data.upserted_id,
                        requestId: res.requestId
                    });
                }
            });
        });
    }
    update(data) {
        const query = { _id: this.id };
        const param = {
            collectionName: this._coll,
            data: this.processData(data),
            query: query,
            multi: false,
            merge: false,
            upsert: false,
        };
        return new Promise(resolve => {
            this.request.send("updateDocument", param).then(res => {
                if (res.code) {
                    resolve(res);
                }
                else {
                    resolve({
                        updated: res.data.updated,
                        upsertedId: res.data.upserted_id,
                        requestId: res.requestId
                    });
                }
            });
        });
    }
    remove() {
        const query = { _id: this.id };
        const param = {
            collectionName: this._coll,
            query: query,
            multi: false
        };
        return new Promise(resolve => {
            this.request.send("deleteDocument", param).then(res => {
                if (res.code) {
                    resolve(res);
                }
                else {
                    resolve({
                        deleted: res.data.deleted,
                        requestId: res.requestId
                    });
                }
            });
        });
    }
    processData(data) {
        const params = util_1.Util.encodeDocumentDataForReq(data);
        return params;
    }
}
exports.DocumentReference = DocumentReference;
