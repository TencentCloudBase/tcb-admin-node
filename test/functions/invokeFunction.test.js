let Tcb = require("../../index");

const assert = require("assert");
const config = require("../config.js");

// TODO 删除前先创建
describe("functions.invokeFunction: 执行云函数", () => {
  Tcb.init(config);

  it(
    "执行云函数",
    async () => {
      let result = await Tcb.callFunction({
        name: "test",
        data: { a: 1 }
      });
      console.log(result);
      assert(result.result, "执行云函数失败");
    },
    10000
  );
});
