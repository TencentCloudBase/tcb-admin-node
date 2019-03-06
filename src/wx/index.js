const httpRequest = require("../utils/httpRequest");

exports.callWxOpenApi = function({ apiName, requestData } = {}) {
  try {
    requestData = requestData ? JSON.stringify(requestData) : "";
  } catch (e) {
    throw Error(e);
  }

  const wxCloudApiToken = process.env.WX_API_TOKEN || "";

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
