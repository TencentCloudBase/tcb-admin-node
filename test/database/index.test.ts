import * as assert from "power-assert";
import * as Mock from "./unit/mock";
import * as app from "../../index";
import * as Config from "../config";
import { process } from "ts-jest/dist/preprocessor";
import { __exportStar } from "tslib";

describe("test/index.test.ts", async () => {
  const config = {
    secretId: Config.secretId,
    secretKey: Config.secretKey,
    env: Mock.env,
    mpAppId: Mock.appId,
    proxy: Config.proxy
  };

  app.init(config);
  const db = app.database();
  const _ = db.command;

  const defaultDbName = "default";
  const collName = "coll-1";
  const collection = db.collection(collName);
  const nameList = ["f", "b", "e", "d", "a", "c"];

  it("Document - doc().update()", async () => {
    // console.log(await db.createCollection('ccc'))
    // return;

    //   // var a = { a: { b: _.and(_.gt(1), _.lt(32)) } };
    //   // var a = { a: 1, b: _.lte(2) }
    //   // var a = { a: _.and(_.gt(2), _.lte(25)) }
    //   // var a = { a: 1, b: _.or([_.gt(4), _.lt(32)]) }
    //   // console.log(await collection.where(a).get());
    //   // return;

    // console.log(await collection.add({
    //   a: { b: { d: 1 } },
    //   b: { geo: new db.Geo.Point(21, -23) },
    //   c: db.serverDate()
    // }))
    // return;

    // console.log(await collection.where({
    //   a: { b: { d: 1 } }
    // }).get())
    // return;

    // console.log(await collection.where({
    //   a: { b: { d: 1 } }
    // }).update({
    //   c: db.serverDate(),
    //   d: _.inc(2)
    // }))
    // return;

    const result = await collection
      .doc("W2up4-qC-opZcSAe")
      .update({
        // _id: 'fdaeafae',
        a: _.set(2)
        // b: _.set({
        //   o: {
        //     a: 1,
        //     b: [2, 3]
        //   }
        // }),
        // c: {
        //   d: _.set(10)
        // }
      });
    console.log(result);
  });
  return;

  const clean = () => {
    it("Document - doc().remove() - clean all documents", async () => {
      const res = await collection.get();
      // console.log(res);
      const promiseList = res.data.map(document => {
        return collection.doc(document._id).remove();
      });
      await Promise.all(promiseList);
      const res1 = await collection.get();
      // console.log(res1);
      assert(Array.isArray(res1.data));
      assert(res1.data.length === 0);
    });
  };

  it("DB - use default db", async () => {
    // assert(db.config.dbname === defaultDbName);
  });

  it("Collection - the collection name", () => {
    assert(collection.name === collName);
  });

  it("Collection - query count", async () => {
    const res = await collection
      .where({
        like_key: "1111"
      })
      .count();
    // console.log(res);
  });
  clean();

  it("Collection - should be empty", async () => {
    const res = await collection.get();
    // console.log(JSON.stringify(res));
    assert(Array.isArray(res.data));
    assert(res.data.length === 0);
  });

  it("Document - doc().set()", async () => {
    const res = await collection.doc().set({
      name: "mz",
      url:
        "https://b86.photo.store.qq.com/psb?/V11mueXx0BWCDF/GKMTZTUHLU6yqgDwcVZxkv1jtYpGj1C5qnocertN90U!/a/dFYAAAAAAAAA"
    });
    assert(!!res.upsertedId);
  });

  it("Collection - add()", async () => {
    const point = new db.Geo.Point(21, -23);
    const data = await collection.add({
      name: "hm",
      time: new Date(),
      point: point
    });
    assert(!!data.id);
  });

  it("Document - doc().update()", async () => {
    const res = await collection.where({ name: _.eq("mz") }).get();
    const docId = res.data[0].id;
    const result = await collection.doc(docId).update({
      name: "hm-mz"
    });
    assert(result.updated === 1);
  });

  it("Collection - where()", async () => {
    const res = await collection.where({ name: _.eq("hm-mz") }).get();
    assert(Array.isArray(res.data));
    assert(res.data.length === 1);
  });

  it("Collection - add many documents", async () => {
    const promiseList = nameList.map(name => {
      return collection.add({
        name: name
      });
    });
    await Promise.all(promiseList);
    const res = await collection.get();
    // console.log(res);
    assert(Array.isArray(res.data));
    assert(res.data.length >= nameList.length);
  });

  it("Collection - orderBy()", async () => {
    const res = await collection.orderBy("name", "asc").get();
    const namesList = res.data.map(document => {
      return document.name;
    });
    const orderedList = namesList.sort();
    let ordered = true;
    orderedList.forEach((item, index) => {
      if (item !== orderedList[index]) {
        ordered = false;
      }
    });
    assert(ordered === true);
  });

  it("Collection - limit()", async () => {
    const res = await collection
      .limit(1)

      .get();
    assert(Array.isArray(res.data));
    // assert(res.data.length === 1);
  });

  it("Collection - skip()", async () => {
    const res = await collection.get();
    const total = res.data.length;
    const res1 = await collection
      .skip(4)

      .get();
    assert(Array.isArray(res1.data));
    assert(res1.data.length + 4 === total);
  });

  it("Collection - update()", async () => {
    const res = await collection.where({ name: _.eq("a") }).update({
      age: _.inc(10)
    });
    assert(res.updated === 1);
  });

  it("Collection - field", async () => {
    const res = await collection.field({ age: 1 }).get();
    let hasNameField = false;
    res.data.forEach(document => {
      if (document.name) {
        hasNameField = true;
      }
    });
    assert(hasNameField === false);
  });

  clean();
});
