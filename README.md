# Tencent Cloud Base(TCB) Admin Node.js SDK

![node (scoped)](https://img.shields.io/node/v/tcb-admin-node.svg)
[![NPM Version](https://img.shields.io/npm/v/tcb-admin-node.svg?style=flat)](https://www.npmjs.com/package/tcb-admin-node)
[![Deps](https://david-dm.org/TencentCloudBase/tcb-admin-node.svg)](https://img.shields.io/TencentCloudBase/tcb-admin-node)

## 目录
* [介绍](#介绍)
* [安装](#安装)
* [文档](#安装)


## 介绍
TCB提供开发应用所需服务和基础设施。tcb admin Node.js SDK 让你可以在服务端（如腾讯云云函数或CVM等）使用Node.js服务访问TCB的的服务。

需要Node.js v8.0及以上版本。

## 安装
tcb admin Node.js SDK 可以通过`tcb-admin-node`来访问：
```bash
npm install --save tcb-admin-node@latest
```

要在你的模块式使用模块可以
```js
var admin = require("tcb-admin-node");
```
或
```js
import * as admin from "tcb-admin-node";
```

## 文档
- [概览](./docs/概览.md)
- [文件存储](./docs/文件存储.md)
- [数据库](./docs/数据库.md)
- [云函数](./docs/云函数.md)

