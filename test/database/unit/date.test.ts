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
        date,
        serverDate: db.serverDate({
            offset: 1000 * 60
        })
    }
    it("Document - CRUD", async () => {
        // Create
        const res = await collection.add(initialData)
        console.log(res)
        assert(res.id)
        assert(res.requestId)

        // Read
        const { id } = res
        let result = await collection.where({
            _id: id
        }).get()
        console.log(result)
        assert.strictEqual(result.data[0].date.getTime(), date.getTime())

        result = await collection.where({
            date: db.command.eq(date)
        }).get()
        console.log(result)
        assert.strictEqual(result.data[0].date.getTime(), date.getTime())

        result = await collection.where({
            date: db.command.lte(date)
        }).get()
        console.log(result)
        assert(result.data.length > 0)

        result = await collection.where({
            date: db.command.lte(date).and(db.command.gte(date))
        }).get()
        console.log(result)
        assert(result.data.length > 0)

        // Update(TODO)


        // Delete
        const deleteRes = await collection.doc(id).remove()
        assert.strictEqual(deleteRes.deleted, 1)
    })
})
