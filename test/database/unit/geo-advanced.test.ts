import * as assert from "power-assert";
import * as Mock from "./mock";
import * as app from "../../../index";
import * as Config from "../../config.local";
import * as common from "../../common/index";

describe("GEO高级功能", async () => {
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
    function randomPoint() {
        return new db.Geo.Point(
            180 - 360 * Math.random(),
            90 - 180 * Math.random()
        )
    }

    it("Document - createCollection()", async () => {
        await common.safeCreateCollection(db, collName);
    });

    const point = randomPoint()
    const line = new db.Geo.LineString([randomPoint(), randomPoint()])
    const point1 = new db.Geo.Point(0, 0)
    const point2 = new db.Geo.Point(1, 0)
    const point3 = new db.Geo.Point(1, 1)
    const point4 = new db.Geo.Point(0, 1);
    const polygon = new db.Geo.Polygon([
        new db.Geo.LineString([point1, point2]),
        new db.Geo.LineString([point2, point3]),
        new db.Geo.LineString([point3, point4]),
        new db.Geo.LineString([point4, point1]),
    ])

    const initialData = {
        point,
        line,
        polygon
    };

    it("GEO LineString - CRUD", async () => {
        // Create
        const res = await collection.add(initialData);
        assert(res.id);
        assert(res.requestId);

        // Read
        const readRes = await collection
            .where({
                _id: res.id
            })
            .get();
        console.log(readRes.data);
        assert(readRes.data.length > 0);
        assert.deepEqual(readRes.data[0].point, point)
        assert.deepEqual(readRes.data[0].line, line)

        // Update
        let result = await collection.doc(res.id).set(initialData)
        console.log(result)
        assert.strictEqual(result.updated, 1)
        assert(result.requestId);

        // Delete
        const deleteRes = await collection
            .where({
                _id: res.id
            })
            .remove();
        console.log(deleteRes);
        assert.strictEqual(deleteRes.deleted, 1);
    });

    it("GEO Polygon - CRUD", async () => {
        // Create
        const res = await collection.add(initialData);
        assert(res.id);
        assert(res.requestId);

        // Read
        const readRes = await collection
            .where({
                _id: res.id
            })
            .get();
        console.log(readRes.data);
        assert(readRes.data.length > 0);
        assert.deepEqual(readRes.data[0].point, point)
        assert.deepEqual(readRes.data[0].line, line)
        assert.deepEqual(readRes.data[0].polygon, polygon)

        // Update
        let result = await collection.doc(res.id).set(initialData)
        console.log(result)
        assert.strictEqual(result.updated, 1)
        assert(result.requestId);

        // Delete
        const deleteRes = await collection
            .where({
                _id: res.id
            })
            .remove();
        console.log(deleteRes);
        assert.strictEqual(deleteRes.deleted, 1);
    });


    it("GEO - geoNear", async () => {
        // Create
        const res = await collection.add(initialData);
        assert(res.id);
        assert(res.requestId);

        // Read
        const readRes = await collection
            .where({
                point: db.command.geoNear({
                    geometry: point,
                    maxDistance: 100,
                    minDistance: 0
                })
            }).get()
        console.log(readRes.data);
        assert(readRes.data.length > 0);
        assert.deepEqual(readRes.data[0].point, point)
        assert.deepEqual(readRes.data[0].line, line)

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
