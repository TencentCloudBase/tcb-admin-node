import * as assert from "power-assert";
import { Db } from "../../../src/database/";
import * as Mock from "./mock";
import * as Config from '../../config'

describe("test/unit/db.test.ts", () => {
  const db = new Db({
    secretId: Config.secretId,
    secretKey: Config.secretKey,
    env: Mock.env,
    mpAppId: Mock.appId
  });
  const defaultDbName = "default";

  it("use default db", () => {
    assert(db.config.dbname === defaultDbName);
  });

  it("use custom db", () => {
    const customDbName = "custom-db";
    const customDB = new Db({
      secretId: Config.secretId,
      secretKey: Config.secretKey,
      env: Mock.env,
      mpAppId: Mock.appId,
      dbname: customDbName
    });
    assert(customDB.config.dbname === customDbName);
  });

  it("get collection reference", () => {
    const collName = "coll-1";
    const collection = db.collection(collName);
    assert(collection.name === collName);
  });

  it('API - getCollections', async () => {
    const data2 = new db.Geo.Point(23, -67);
    console.log(data2);
  });

  // it('API - getCollections',  async () => {
  //   const data = await db.getCollections()
  //   assert(Array.isArray(data.collections));
  // });
});
