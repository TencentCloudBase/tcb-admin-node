## 介绍
TCB 提供开发应用所需服务和基础设施。tcb admin Node.js SDK 让你可以在服务端（如腾讯云云函数或 CVM 等）使用 Node.js 服务访问 TCB 的的服务。

需要 Node.js v8.9 及以上版本。

## 安装
tcb admin Node.js SDK 可以通过 [tcb-admin-node](https://github.com/TencentCloudBase/tcb-admin-node) 来访问：
```bash
npm install --save tcb-admin-node@latest
```

要在你的模块式使用模块可以
```js
const app = require("tcb-admin-node");
```
或
```js
import * as app from "tcb-admin-node";
```

## 应用初始化

参数

| 字段 | 类型 | 必填 | 说明|
| --- | --- | --- | --- |
| secretId | string | 否 | 腾讯云 API 固定密钥对，在云函数内执行可不填。[前往获取](https://console.cloud.tencent.com/cam/capi)|
| SecretKey | string | 否 |  同上|
| env | string | 否 | TCB 环境 ID，不填使用默认环境|

```javascript
// 初始化示例
const app = require('tcb-admin-node');

// 初始化资源
// 云函数下不需要secretId和secretKey。
// env如果不指定将使用默认环境
app.init({
  secretId: 'xxxxx',
  secretKey: 'xxxx',
  env: 'xxx'
});

//云函数下使用默认环境
app.init()

//云函数下指定环境
app.init({
  env: 'xxx'
})
```
## 问题反馈
如果使用SDK遇到问题，请移步到我们的 [Github 仓库](https://github.com/TencentCloudBase/tcb-admin-node/issues/new/choose)，提交反馈建议。
