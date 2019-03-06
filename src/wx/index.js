const httpRequest = require("../utils/httpRequest");

exports.callWxOpenApi = function({ apiName, requestData } = {}) {
  try {
    requestData = requestData ? JSON.stringify(requestData) : "";
  } catch (e) {
    throw Error(e);
  }

  const wxCloudApiToken = process.env.WX_API_TOKEN || "";
  // const wxCloudApiToken =
  //   "eyJWZXJzaW9uIjoxLCJLZXlWZXJzaW9uIjozOSwiZXZlbnRJZCI6IkhPaGNxZ1JMTENIdm1hZFhQTk9IS1k4YlF2SnBvMFVoZWdnTkFfR0hNVXd1cnBkZHNObFFoSU5MRURwS0xJOTFvaWRyaWhkTkwweEl3a19yRGUwR1FLckwwR3RrM3VsQjdvU3EiLCJ0aWNrZXQiOiJDQnNTZ0FLTTA3aHNoaXNaQ0M4ZFlON3pLR2czbDhHbXI1YXhaeGwrcVVOdGE5OElLUS9RYVpqUU1HSTcxOVNvMC9hbU0vb1lMMGs3S1I3VW5QMHNJMTg3V1E0bGxDVTY5bkNFdVVYaDRDT2xIa1R5QVdLOXRUNmNkM28wR2RGNTFjUnhCQ3hmd3kwNCtLSGFyTWJJWk4rbjBYbXVsTkdzd0Rxb004QWgyaGV4Mmk0RXN6QjhtNDZLaHJjd1ZId0dRbjFVSTlWVjhrdWF4WlRXVG5ydzNtWU5YR2NQelJlY0g1Yzk4ZlpPdmhsa1hPZmFTc2NNSUtkU0d3WFpxSlIwdnJEVXNkZmhrRm5QRTVxczd3YStnRC96WVBCdWxBL3UxdStwZHJ1S3FqS1V3WjZxRzhLY3V5azJVZFY0dmlWQnZhbjhuUXIzS0FVTVkvQzlZQzZYRk1FWUUrTDgifQ==";

  let params = {
    action: "wx.api",
    apiName,
    requestData,
    wxCloudApiToken
  };

  return httpRequest({
    config: this.config,
    params,
    method: "post",
    headers: {
      "content-type": "application/json"
    }
  }).then(res => {
    if (res.code) {
      return res;
    } else {
      let result = res.data.responseData;
      try {
        result = JSON.parse(res.data.responseData);
      } catch (e) {}
      return {
        result,
        requestId: res.requestId
      };
    }
  });
};

exports.callCompatibleWxOpenApi = function({ apiName, requestData } = {}) {
  const wxCloudApiToken = process.env.WX_API_TOKEN || "";
  // const wxCloudApiToken =
  //   "eyJWZXJzaW9uIjoxLCJLZXlWZXJzaW9uIjozOSwiZXZlbnRJZCI6IkhPaGNxZ1JMTENIdm1hZFhQTk9IS1k4YlF2SnBvMFVoZWdnTkFfR0hNVXd1cnBkZHNObFFoSU5MRURwS0xJOTFvaWRyaWhkTkwweEl3a19yRGUwR1FLckwwR3RrM3VsQjdvU3EiLCJ0aWNrZXQiOiJDQnNTZ0FLTTA3aHNoaXNaQ0M4ZFlON3pLR2czbDhHbXI1YXhaeGwrcVVOdGE5OElLUS9RYVpqUU1HSTcxOVNvMC9hbU0vb1lMMGs3S1I3VW5QMHNJMTg3V1E0bGxDVTY5bkNFdVVYaDRDT2xIa1R5QVdLOXRUNmNkM28wR2RGNTFjUnhCQ3hmd3kwNCtLSGFyTWJJWk4rbjBYbXVsTkdzd0Rxb004QWgyaGV4Mmk0RXN6QjhtNDZLaHJjd1ZId0dRbjFVSTlWVjhrdWF4WlRXVG5ydzNtWU5YR2NQelJlY0g1Yzk4ZlpPdmhsa1hPZmFTc2NNSUtkU0d3WFpxSlIwdnJEVXNkZmhrRm5QRTVxczd3YStnRC96WVBCdWxBL3UxdStwZHJ1S3FqS1V3WjZxRzhLY3V5azJVZFY0dmlWQnZhbjhuUXIzS0FVTVkvQzlZQzZYRk1FWUUrTDgifQ==";

  let params = {
    action: "wx.openApi",
    apiName,
    requestData,
    wxCloudApiToken
  };

  return httpRequest({
    config: this.config,
    params,
    method: "post",
    headers: {}
  }).then(res => {
    if (res.code) {
      return res;
    } else {
      let result = res.data.responseData;
      try {
        result = JSON.parse(res.data.responseData);
      } catch (e) {}
      return {
        result,
        requestId: res.requestId
      };
    }
  });
};
