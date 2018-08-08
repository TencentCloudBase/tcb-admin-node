"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("./document");
const query_1 = require("./query");
const request_1 = require("./request");
class CollectionReference extends query_1.Query {
    constructor(db, coll) {
        super(db, coll);
    }
    get name() {
        return this._coll;
    }
    doc(docID) {
        return new document_1.DocumentReference(this._db, this._coll, docID);
    }
    add(data) {
        let docRef = this.doc();
        return docRef.create(data);
    }
    create() {
        let request = new request_1.Request(this._db);
        const params = {
            collectionName: this._coll
        };
        return request.send("addCollection", params);
    }
}
exports.CollectionReference = CollectionReference;
