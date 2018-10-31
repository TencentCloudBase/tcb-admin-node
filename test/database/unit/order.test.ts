import * as assert from "power-assert";
import * as Mock from "../unit/mock";
import * as app from "../../../index";
import * as Config from "../../config.local";
import * as common from "../../common/index";

describe("正则表达式查询", async () => {
  const config = {
    secretId: Config.secretId,
    secretKey: Config.secretKey,
    env: Mock.env,
    mpAppId: Mock.appId,
    proxy: Config.proxy,
    sessionToken: undefined
  };

  app.init(config);
  const db = app.database();

  const collName = "coll-1";
  const collection = db.collection(collName);
  // const nameList = ["f", "b", "e", "d", "a", "c"];

  it("Document - createCollection()", async () => {
    await common.safeCreateCollection(db, collName);
  });
  it("Document - OrderBy", async () => {
    // Create

    for (var i = 0; i < 7; i++) {
      const res = await collection.add({
        category: "类别B",
        value: Math.random()
      });
      assert(res.id);
      assert(res.requestId);
    }

    for (var i = 0; i < 3; i++) {
      const res = await collection.add({
        category: "类别C",
        value: Math.random()
      });
      assert(res.id);
      assert(res.requestId);
    }

    await collection.add({
      category: "类别A",
      value: Math.random()
    });

    // Read
    let result = await collection
      .where({
        category: /^类别/i
      })
      .orderBy("category", "asc")
      .get();
    assert(result.data.length >= 11);
    assert(result.data[0].category === '类别A')
    assert(result.data[result.data.length - 1].category === '类别C')

    // Delete
    const deleteRes = await collection
      .where({
        category: db.RegExp({
          regexp: "^类别"
        })
      })
      .remove();
    console.log(deleteRes);
    assert(deleteRes.deleted >= 11);
  }, 20000);
});
