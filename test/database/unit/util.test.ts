import * as assert from "power-assert";
import { Util } from "../../../src/database/util";
import * as Mock from "./mock";

describe("test/unit/util.test.ts", () => {
  it("Util - formatDocumentData ", async () => {
    const data = Util.formatResDocumentData(Mock.documentRes.data);
    assert(data[0]["a"] === "a");
    assert(data[0]["f"] === null);
    assert(data[0]["g"].latitude === 23);
  });

  it("Util - encodeDocumentDataForReq ", async () => {
    const param = Util.formatResDocumentData(Mock.documentRes.data);
    const data = Util.encodeDocumentDataForReq(param[0]);
    assert(data["a"] === "a");
    assert(data["g"].type === "Point");
    assert(data["w"].$timestamp);
  });
});
