### 执行函数
callFunction(Object)

请求参数

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | ---
| name | string | 是 | 云函数名称
| data | object | 否 | 云函数参数

响应参数

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | ---
| code | string | 否 | 状态码，操作成功则不返回
| message | string | 否 | 错误描述
| result | object | 否 | 云函数执行结果
| requestId | string | 否 | 请求序列号，用于错误排查

示例代码

```javascript
const app = require("tcb-admin-node");
let result = await app.callFunction({
    name: "test",
    data: { a: 1 }
});
```

## 问题反馈
如果使用SDK遇到问题，请移步到我们的 [Github 仓库](https://github.com/TencentCloudBase/tcb-admin-node/issues/new/choose)，提交反馈建议。
