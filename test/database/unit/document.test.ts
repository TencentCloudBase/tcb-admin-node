import * as assert from "power-assert";
import { Db } from "../../../src/database";
import { Util } from "../../../src/database/util";
import * as Mock from "./mock";
import * as Config from '../../config'

describe("test/unit/document.test.ts", () => {
  const collName = "coll-1";
  const docIDGenerated = Util.generateDocId();
  const db = new Db({
    secretId: Config.secretId,
    secretKey: Config.secretKey,
    env: Mock.env,
    mpAppId: Mock.appId
  });

  it("docID test", () => {
    const document = db.collection(collName).doc(docIDGenerated);
    assert(document.id === docIDGenerated);
  });

  it("API - set data in empty document", async () => {
    const _ = db.command;
    const document = db.collection(collName).doc();
    await document.set({
      name: "jude"
    });
    const documents = await db.collection(collName).where({
      name: _.eq('jude')
    }).get();
    assert(Array.isArray(documents.data));
  });

  it("API - set data in document existed", async () => {
    const documents = await db.collection(collName).limit(1).get();
    const docId = documents.data[0].id;
    const data = await db.collection(collName).doc(docId).set({
      data: { type: "set" }
    });
    assert(data.updated === 1);
  });

  it("API - remove document that not exist", async () => {
    const document = db.collection(collName).doc(docIDGenerated);
    const data = await document.remove();
    assert(!data.deleted);
  });

  it("API - remove document should success", async () => {
    const documents = await db.collection(collName).get();
    const docId = documents.data[0]._id;
    const data = await db.collection(collName).doc(docId).remove();
    assert(data.deleted === 1);
  });
});
