import * as assert from "power-assert";
import { Db } from "../../../src/database";
import { ErrorCode } from "../../../src/database/constant";
import * as Mock from "./mock";
import * as Config from '../../config'

describe("test/unit/collection.test.ts", () => {
  const collName = "coll-1";
  const db = new Db({
    secretId: Config.secretId,
    secretKey: Config.secretKey,
    env: Mock.env,
    mpAppId: Mock.appId
  });
  const collection = db.collection(collName);

  // it("name test", () => {
  //   assert(collection.name === collName);
  // });

  // it("Error - use invalid docId to get reference", () => {
  //   const docId = "abcdefg";
  //   try {
  //     collection.doc(docId);
  //   } catch (e) {
  //     assert(e.message === ErrorCode.DocIDError);
  //   }
  // });

  // it("API - get all data", async () => {
  //   const res = await collection.get();
  //   assert(Array.isArray(res.data));
  // });

  // it("API - use where", async () => {
  //   const field = "name";
  //   const value = "huming";
  //   const opStr = "==";
  //   const data = await collection.where(field, opStr, value).get();
  //   assert(Array.isArray(data.data));
  // });

  // it("API - use orderBy", async () => {
  //   const field = "huming";
  //   const direction = "asc";
  //   const data = await collection.orderBy(field, direction).get();
  //   assert(Array.isArray(data.data));
  // });

  // it("API - use limit", async () => {
  //   const limit = 1;
  //   const data = await collection.limit(limit).get();
  //   assert(Array.isArray(data.data) && data.data.length === limit);
  // });

  // it("API - use offset", async () => {
  //   const offset = 2;
  //   const data = await collection.skip(offset).get();
  //   assert(Array.isArray(data.data));
  // });

  // it("API - add one doc", async () => {
  //   const res = await collection.add({
  //     name: "huming"
  //   });
  //   assert(res);
  // });

  // it('API - use update', async () => {
  //   const data = await collection.where('name', '==', 'huming1530585650108').update({
  //     age: 18
  //   });
  //   const data1 = await collection.get();
  //   console.log("update: ", data, data1);
  //   assert(data.updated > 0);
  // });

  it('API - use field', async () => {
    const res = await collection.field({ 'age': 1 });
    assert(Array.isArray(res.data))
  })

});
