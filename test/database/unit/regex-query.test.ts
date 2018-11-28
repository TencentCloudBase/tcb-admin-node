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

  const initialData = {
    name: "AbCdEfxxxxxxxxxxxxxx1234结尾",
    array: [1, 2, 3, [4, 5, 6], { a: 1, b: { c: "fjasklfljkas", d: false } }],
    deepObject: {
      "l-02-01": {
        "l-03-01": {
          "l-04-01": {
            level: 1,
            name: "l-01",
            flag: "0"
          }
        }
      }
    }
  };
  it("Document - CRUD", async () => {
    // Create
    const res = await collection.add(initialData);
    console.log(res)
    assert(res.id);
    assert(res.requestId);

    // Read

    // // 直接使用正则表达式
    let result = await collection
      .where({
        name: /^abcdef.*\d+结尾$/i
      })
      .get();
    // console.log(result);
    assert(result.data.length > 0);

    // new db.RegExp
    result = await collection
      .where({
        name: new db.RegExp({
          regexp: "^abcdef.*\\d+结尾$",
          options: "i"
        })
      })
      .get();
    console.log(result);
    assert(result.data.length > 0);

    // db.RegExp
    result = await collection
      .where({
        name: db.RegExp({
          regexp: "^abcdef.*\\d+结尾$",
          options: "i"
        })
      })
      .get();
    console.log(result);
    assert(result.data.length > 0);

    // // Update(TODO)
    result = await collection
      .where({
        name: db.command.or(new db.RegExp({
          regexp: "^abcdef.*\\d+结尾$",
          options: "i"
        }), db.RegExp({
          regexp: "^fffffff$",
          options: "i"
        }))
      })
      .get();
    console.log(result);
    assert(result.data.length > 0);

    // Update(TODO)
    result = await collection
      .where({
        name: db.command.or(db.RegExp({
          regexp: "^abcdef.*\\d+结尾$",
          options: "i"
        }), db.RegExp({
          regexp: "^fffffff$",
          options: "i"
        }))
      })
      .update({
        name: 'ABCDEFxxxx5678结尾'
      });
    console.log(result);
    assert(result.updated > 0)

    // Delete
    const deleteRes = await collection
      .where({
        name: db.RegExp({
          regexp: "^abcdef.*\\d+结尾$",
          options: "i"
        })
      })
      .remove();
    console.log(deleteRes);
    assert(deleteRes.deleted > 0);
  });
});
