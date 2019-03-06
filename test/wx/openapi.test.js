let Tcb = require("../../index");

const assert = require("assert");
const config = require("../config.local");

// TODO 删除前先创建
describe("wx.openApi: 微信openapi", () => {
  Tcb.init(config);

  it("微信openapi", async () => {
    let result = await Tcb.callWxOpenApi({
      apiName: "/AAA/BBB/sample",
      // requestData: Buffer.from(JSON.stringify({ name: "jamespeng" })),
      requestData: { name: "jamespeng" },
      event: {
        wxCloudApiToken:
          "eyJWZXJzaW9uIjoxLCJLZXlWZXJzaW9uIjozOSwiZXZlbnRJZCI6IkhPaGNxZ1JMTENIdm1hZFhQTk9IS1k4YlF2SnBvMFVoZWdnTkFfR0hNVXd1cnBkZHNObFFoSU5MRURwS0xJOTFvaWRyaWhkTkwweEl3a19yRGUwR1FLckwwR3RrM3VsQjdvU3EiLCJ0aWNrZXQiOiJDQnNTZ0FLTTA3aHNoaXNaQ0M4ZFlON3pLR2czbDhHbXI1YXhaeGwrcVVOdGE5OElLUS9RYVpqUU1HSTcxOVNvMC9hbU0vb1lMMGs3S1I3VW5QMHNJMTg3V1E0bGxDVTY5bkNFdVVYaDRDT2xIa1R5QVdLOXRUNmNkM28wR2RGNTFjUnhCQ3hmd3kwNCtLSGFyTWJJWk4rbjBYbXVsTkdzd0Rxb004QWgyaGV4Mmk0RXN6QjhtNDZLaHJjd1ZId0dRbjFVSTlWVjhrdWF4WlRXVG5ydzNtWU5YR2NQelJlY0g1Yzk4ZlpPdmhsa1hPZmFTc2NNSUtkU0d3WFpxSlIwdnJEVXNkZmhrRm5QRTVxczd3YStnRC96WVBCdWxBL3UxdStwZHJ1S3FqS1V3WjZxRzhLY3V5azJVZFY0dmlWQnZhbjhuUXIzS0FVTVkvQzlZQzZYRk1FWUUrTDgifQ=="
      }
    });
    console.log(result);
    // assert(result.result, "微信openapi失败");
  }, 10000);

  it("微信new openapi", async () => {
    let result = await Tcb.callCompatibleWxOpenApi({
      apiName: "/AAA/BBB/sample",
      // requestData: { name: "jamespeng" },
      requestData: Buffer.from(JSON.stringify({ name: "jamespeng" })),
      event: {
        wxCloudApiToken:
          "eyJWZXJzaW9uIjoxLCJLZXlWZXJzaW9uIjozOSwiZXZlbnRJZCI6IkhPaGNxZ1JMTENIdm1hZFhQTk9IS1k4YlF2SnBvMFVoZWdnTkFfR0hNVXd1cnBkZHNObFFoSU5MRURwS0xJOTFvaWRyaWhkTkwweEl3a19yRGUwR1FLckwwR3RrM3VsQjdvU3EiLCJ0aWNrZXQiOiJDQnNTZ0FLTTA3aHNoaXNaQ0M4ZFlON3pLR2czbDhHbXI1YXhaeGwrcVVOdGE5OElLUS9RYVpqUU1HSTcxOVNvMC9hbU0vb1lMMGs3S1I3VW5QMHNJMTg3V1E0bGxDVTY5bkNFdVVYaDRDT2xIa1R5QVdLOXRUNmNkM28wR2RGNTFjUnhCQ3hmd3kwNCtLSGFyTWJJWk4rbjBYbXVsTkdzd0Rxb004QWgyaGV4Mmk0RXN6QjhtNDZLaHJjd1ZId0dRbjFVSTlWVjhrdWF4WlRXVG5ydzNtWU5YR2NQelJlY0g1Yzk4ZlpPdmhsa1hPZmFTc2NNSUtkU0d3WFpxSlIwdnJEVXNkZmhrRm5QRTVxczd3YStnRC96WVBCdWxBL3UxdStwZHJ1S3FqS1V3WjZxRzhLY3V5azJVZFY0dmlWQnZhbjhuUXIzS0FVTVkvQzlZQzZYRk1FWUUrTDgifQ=="
      }
    });
    console.log(result);
    // assert(result.result, "微信openapi失败");
  }, 10000);
});
