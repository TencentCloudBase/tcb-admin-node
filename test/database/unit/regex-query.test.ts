import * as assert from "power-assert";
import * as Mock from "../unit/mock";
import * as app from "../../../index";
import * as Config from "../../config.local";
import * as common from '../../common/index';

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
        await common.safeCreateCollection(db, collName)
    })

    const initialData = {
        name: 'AbCdEfxxxxxxxxxxxxxx1234',
        array: [1, 2, 3, [4, 5, 6], { a: 1, b: { c: 'fjasklfljkas', d: false } }],
        deepObject: {
            'l-02-01': {
                'l-03-01': {
                    'l-04-01': {
                        level: 1,
                        name: 'l-01',
                        flag: '0'
                    }
                }
            }
        }
    }
    it("Document - CRUD", async () => {
        // Create
        const res = await collection.add(initialData)
        assert(res.id)
        assert(res.requestId)

        // Read
        let result = await collection.where({
            name: /^abcdef.*\d+$/i
        }).get()
        console.log(result)
        assert(result.data.length > 0)

        result = await collection.where({
            name: new db.RegExp({
                regexp: '^abcdef.*\\d+$',
                options: 'i'
            })
        }).get()
        console.log(result)
        assert(result.data.length > 0)

        // Update(TODO)


        // Delete
        const deleteRes = await collection.where({
            name: new db.RegExp({
                regexp: '^abcdef.*\\d+$',
                options: 'i'
            })
        }).remove()
        console.log(deleteRes)
        assert(deleteRes.deleted > 0)
    })

})
