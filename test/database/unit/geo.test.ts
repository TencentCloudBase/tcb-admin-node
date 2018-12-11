import * as assert from "power-assert";
import * as Mock from "../unit/mock";
import * as app from "../../../index";
import * as Config from "../../config.local";
import * as common from "../../common/index";

describe("GEO类型", async () => {
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

    const longitude = -180
    const latitude = 20
    const point = new db.Geo.Point(longitude, latitude)
    const initialData = {
        point
    };
    it("GEO Point - CRUD", async () => {
        // Create
        const res = await collection.add(initialData);
        assert(res.id);
        assert(res.requestId);

        // Read
        let result = await collection
            .where({
                _id: res.id
            })
            .get();
        console.log(result.data[0].point);
        assert(result.data.length > 0);
        assert.deepEqual(result.data[0].point, { longitude, latitude })

        // TODO: 现在对 GEO 进行 $eq 操作，小概率会查不到，需要修改查询的底层结构 
        // result = await collection
        //     .where({
        //         point: db.command.eq(point)
        //     })
        //     .get();
        // console.log(point, result);
        // assert(result.data.length > 0);

        // result = await collection
        //     .where({
        //         point: db.command.or(db.command.eq(point))
        //     })
        //     .get();
        // console.log(point, result);
        // assert(result.data.length > 0);

        // result = await collection
        //     .where({
        //         point: point
        //     })
        //     .get();
        // console.log(result);
        // assert(result.data.length > 0);

        // Delete
        const deleteRes = await collection
            .where({
                _id: res.id
            })
            .remove();
        console.log(deleteRes);
        assert.strictEqual(deleteRes.deleted, 1);
    });
});
