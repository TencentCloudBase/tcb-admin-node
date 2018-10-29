import * as assert from "power-assert";
import * as Mock from "../unit/mock";
import * as app from "../../../index";
import * as Config from "../../config.local";
import * as common from '../../common/index';
// import { process } from "ts-jest/dist/preprocessor";
// import { __exportStar } from "tslib";

describe("Date类型", async () => {
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

    const date = new Date()
    const initialData = {
        name: 'test',
        date
    }
    it("Document - CRUD", async () => {
        // Create
        const res = await collection.add(initialData)
        console.log(res)
        assert(res.id)
        assert(res.requestId)

        // Read
        const { id } = res
        const result = await collection.where({
            _id: id
        }).get()
        console.log(result)
        assert.strictEqual(result.data[0].date.getTime(), date.getTime())

        // Update(TODO)


        // Delete
        const deleteRes = await collection.doc(id).remove()
        assert.strictEqual(deleteRes.deleted, 1)
    })
})
