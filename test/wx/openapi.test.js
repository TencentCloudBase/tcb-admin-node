let Tcb = require("../../index");

const assert = require("assert");
const config = require("../config");

// TODO 删除前先创建
describe("wx.openApi: 微信openapi", () => {
    Tcb.init(config);

    it(
        "微信openapi",
        async () => {
            let result = await Tcb.callWxOpenApi({
                apiName: '/AAA/BBB/sample',
                requestData: { "name": "jamespeng" },
                event: {
                    wxCloudApiToken: 'eyJWZXJzaW9uIjoxLCJLZXlWZXJzaW9uIjoxNCwiZXZlbnRJZCI6IkhKLU1wd09CMGpaeG9RZEdXcGg5WmJCQXRsd01sWFctTTFXZGlncG9UUXdWbEFxdTJhM3R6YnRPdWUzTHVweUxNb3RkSTA4VnJ0VWwxelEwb29GcGlNZnllOUt2OVk0X2h6Ty0iLCJ0aWNrZXQiOiJDQUVTZ0FKWCswVE1hUytPKzVzMCs5Z0YrQjBrSEYza1dLYzhVRk9vSTlZU3ZiTVJ2N3lSZG9NWk1MSTMxQUxnejNIWWIvZTdFRDBSclI3OXF6bUdrbGNJU29VZjAzeHR3eXZNZWY5U01OaWxmYUxORkxMTHh5M3JGSE45YlpNY0FwWXRtOG5PcXEzMEtXS3pEVlNCbit1NTRsdjEwTnFKN1BMOUdiZ0pFTXF4SXU0bllaY3Z0Q2FSTU5xMGlFMEo4eTRUb3BtdnlBWjlDeVp5aFlTbVBSeVlkZkQ0empvVkUxOXRzN0NXWW4xN1ZtaGZFZ2YvVHVkSWlEOXR0UnBVWWh6RUxubk5IdStzc0Jqb0p0WVhWaXJ2NmZ5eGtIU21rTnJOMDBEQkE2bkE2Um4wYnZjcDlNa2JRa2VRYXIxT2hrNjVmYUNzL2RYUmNxRzhyS0xtTStHeklkWE4ifQ=='
                }
            });
            console.log(result);
            // assert(result.result, "微信openapi失败");
        },
        10000
    );
});
