# 接口文档

[TOC]

## 应用初始化

参数

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| secretId | String | 否 | 腾讯云API固定密钥对，在云函数内执行可不填。[前往获取](https://console.cloud.tencent.com/cam/capi)
| SecretKey | String | 否 |  同上
| env | String | 否 | TCB环境ID，不填使用默认环境

```javascript
// 初始化示例
const app = require('tcb-admin-node');

//初始化资源
//这一步非必需。云函数下不需要secretId和secretKey。
//env如果不指定将使用默认环境
app.init({
  secretId: 'xxxxx',
  secretKey: 'xxxx', 
  env: 'xxx'
});
```

## 数据库

### 获取数据库的引用

```js
const db = app.database();
```

### 获取集合的引用

```js
// 获取 `user` 集合的引用
const collection = db.collection('user');
```

#### 集合 Collection

通过 `db.collection(name)` 可以获取指定集合的引用，在集合上可以进行以下操作

| 类型 | 接口 | 说明 |
| -- | -- | -- |
| 写   | add    | 新增记录（触发请求） |
| 读   | get    | 获取集合中的记录，如果有使用 where 语句定义查询条件，则会返回匹配结果集 (触发请求) |
| 引用   | doc    | 获取对该集合中指定 id 的记录的引用 |
| 查询条件   | where    | 通过指定条件筛选出匹配的记录，可搭配查询指令（eq, gt, in, ...）使用 |
|          | skip    | 跳过指定数量的文档，常用于分页，传入 offset |
|          | orderBy | 排序方式 |
|          | limit   | 返回的结果集(文档数量)的限制，有默认值和上限值 |
|          | field   | 指定需要返回的字段 |


查询及更新指令用于在 `where` 中指定字段需满足的条件，指令可通过 `db.command` 对象取得。


#### 记录 Record / Document

通过 `db.collection(collectionName).doc(docId)` 可以获取指定集合上指定 id 的记录的引用，在记录上可以进行以下操作

| 接口 | 说明 |
| -- | -- |
| 写   |  set    | 覆写记录 |
|      | update    | 局部更新记录(触发请求) |
|      | remove    | 删除记录(触发请求) |
| 读   | get    | 获取记录(触发请求) |


#### 查询筛选指令 Query Command

以下指令挂载在 `db.command` 下

| 类型 | 接口 | 说明 |
| -- | -- | -- |
| 比较运算      | eq   | 字段 == |
|              | neq | 字段 != |
|              | gt | 字段 > |
|              | gte | 字段 >= |
|              | lt | 字段 < |
|              | lte | 字段 <= |
|              | in | 字段值在数组里 |
|              | nin | 字段值不在数组里 |
| 逻辑运算      | and  | 表示需同时满足指定的所有条件 |
|              | or   | 表示需同时满足指定条件中的至少一个 |


#### 字段更新指令 Update Command

以下指令挂载在 `db.command` 下

| 类型 | 接口 | 说明 |
| -- | -- | -- |
| 字段      | set   | 设置字段值 |
|          | remove | 删除字段 |
|          | inc   | 加一个数值，原子自增 |
|          | mul   | 乘一个数值，原子自乘 |
|          | push  | 数组类型字段追加尾元素，支持数组
|          | pop   | 数组类型字段删除尾元素，支持数组
|          | shift | 数组类型字段删除头元素，支持数组
|          | unshift | 数组类型字段追加头元素，支持数组


#### 特殊数据类型

##### 时间 Date

表示时间，使用 `Date` 构造的日期对象将转换为数据库底层的日期实现。

##### 地理位置

**Point**

```js
new db.Geo.Point(longitude, latitude)
```
##### 服务端时间

**ServerDate**


```js
//服务端当前时间
new db.serverDate()
```

```js
//服务端当前时间加1S
new db.serverDate({
  offset: 1000
})
```


## API文档

### 新增文档

#### collection.add(data)

add 参数

| 参数 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| data | Object | 是 | {_id: '10001', 'name': 'Ben'} _id 非必填

```js
collection.add({
  name: 'Ben'
});
```

#### collection.doc().set(data)

也可通过 `set` 方法新增一个文档，需先取得文档引用再调用 `set` 方法。
如果文档不存在，`set` 方法会创建一个新文档。

```js
collection.doc().set({
  name: "Hey"
});
```

### 查询文档

支持 `where()`、`limit()`、`skip()`、`orderBy()`、`get()`、`update()`、`field()`、`count()` 等操作。

只有当调用`get()` `update()`时才会真正发送请求。
注：默认取前100条数据，最大取前100条数据。

#### collection.where()
参数

设置过滤条件
where 可接收对象作为参数，表示筛选出拥有和传入对象相同的 key-value 的文档。比如筛选出所有类型为计算机的、内存为 8g 的商品：

```js
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: 8,
  }
})
```

如果要表达更复杂的查询，可使用高级查询指令，比如筛选出所有内存大于 8g 的计算机商品：
```js
const _ = db.command // 取指令
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: _.gt(8), // 表示大于 8
  }
})
```

#### collection.count()
参数

设置过滤条件
where 可接收对象作为参数，表示筛选出拥有和传入对象相同的 key-value 的文档。比如筛选出所有类型为计算机的、内存为 8g 的商品：

```js
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: 8,
  }
}).count()
```

响应参数

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | ---
| code | String | 否 | 状态码，操作成功则不返回
| message | String | 否 | 错误描述
| total | Integer | 否 | 计数结果
| requestId | String | 否 | 请求序列号，用于错误排查

#### 查询指令 eq

表示字段等于某个值。`eq` 指令接受一个字面量 (literal)，可以是 `number`, `boolean`, `string`, `object`, `array`。

比如筛选出所有自己发表的文章，除了用传对象的方式：

```js
const myOpenID = 'xxx'
db.collection('articles').where({
  _openid: myOpenID
})
```

还可以用指令：

```js
const _ = db.command
const myOpenID = 'xxx'
db.collection('articles').where({
  _openid: _.eq(openid)
})
```

注意 `eq` 指令比对象的方式有更大的灵活性，可以用于表示字段等于某个对象的情况，比如：

```js
// 这种写法表示匹配 stat.publishYear == 2018 且 stat.language == 'zh-CN'
db.collection('articles').where({
  stat: {
    publishYear: 2018,
    language: 'zh-CN'
  }
})
// 这种写法表示 stat 对象等于 { publishYear: 2018, language: 'zh-CN' }
const _ = db.command
db.collection('articles').where({
  stat: _.eq({
    publishYear: 2018,
    language: 'zh-CN'
  })
})
```

#### 查询指令 neq

字段不等于。`neq` 指令接受一个字面量 (literal)，可以是 `number`, `boolean`, `string`, `object`, `array`。

如筛选出品牌不为 X 的计算机：

```js
const _ = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    brand: _.neq('X')
  },
})
```

#### 查询指令 gt

字段大于指定值。

如筛选出价格大于 2000 的计算机：

```js
const _ = db.command
db.collection('goods').where({
  category: 'computer',
  price: _.gt(2000)
})
```

#### 查询指令 gte

字段大于或等于指定值。

#### 查询指令 lt

字段小于指定值。

#### 查询指令 lte

字段小于或等于指定值。

#### 查询指令 in

字段值在给定的数组中。

筛选出内存为 8g 或 16g 的计算机商品：

```js
const _ = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: _.in([8, 16])
  }
})
```

#### 查询指令 and

表示需同时满足指定的两个或以上的条件。

如筛选出内存大于 4g 小于 32g 的计算机商品：

流式写法：
```js
const _ = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: _.gt(4).and(_.lt(32))
  }
})
```

前置写法：
```js
const _ = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: _.and(_.gt(4), _.lt(32))
  }
})
```

#### 查询指令 or

表示需满足所有指定条件中的至少一个。如筛选出价格小于 4000 或在 6000-8000 之间的计算机：

流式写法：
```js
const _ = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    price: _.lt(4000).or(_.gt(6000).and(_.lt(8000)))
  }
})
```

前置写法：
```js
const _ = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    price: _.or(_.lt(4000), _.and(_.gt(6000), _.lt(8000)))
  }
})
```

如果要跨字段 “或” 操作：(如筛选出内存 8g 或 cpu 3.2 ghz 的计算机)

```js
const _ = db.command
db.collection('goods').where(_.or(
  {
    type: {
      memory: _.gt(8)
    }
  },
  {
    type: {
      cpu: 3.2
    }
  }
))
```

#### collection.limit()

参数说明

| 参数 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| value | Integer | 是 | 限制展示的数值

使用示例

```js
collection.limit(1).get();
```

#### collection.skip()

参数说明

| 参数 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| value | Integer | 是 | 跳过展示的数据

使用示例

```js
collection.skip(4).get();
```

#### collection.orderBy()

参数说明

| 参数 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| field | String | 是 | 排序的字段
| orderType | String | 是 | 排序的顺序，升序(asc) 或 降序(desc)

使用示例

```js
collection.orderBy("name", "asc").get();
```

#### collection.field()

参数说明

| 参数 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| - | Object | 是 | 要过滤的字段，不返回传false，返回传true

使用示例

```js
collection.field({ 'age': true })
```
备注：只能指定要返回的字段或者不要返回的字段。即{'a': true, 'b': false}是一种错误的参数格式

### 删除文档

```js
// 清理全部数据
collection.get()
  .then((res) => {
    const promiseList = res.data.map(document => {
      return collection.doc(document.id).remove();
    });
    Promise.all(promiseList);
  })
  .catch((e) => {

  });
```

### 更新文档：

#### collection.doc().update()

更新指定文档

```js
collection.doc('doc-id').update({
  name: "Hey"
});
```

#### collection.doc().set()

更新文档，如果不存在则创建文档。

```js
collection.doc('doc-id').set({
  name: "Hey"
});
```

#### collection.update()

批量更新文档

```js
collection.where({name: _.eq('hey')}).update({
  age: 18,
});
```

#### 更新指令 set

更新指令。用于设定字段等于指定值。这种方法相比传入纯 JS 对象的好处是能够指定字段等于一个对象：

```js
// 以下方法只会更新 property.location 和 property.size，如果 property 对象中有
db.collection('photo').doc('doc-id').update({
  data: {
    property: {
      location: 'guangzhou',
      size: 8
    }
  }
})
```

#### 更新指令 inc

更新指令。用于指示字段自增某个值，这是个原子操作，使用这个操作指令而不是先读数据、再加、再写回的好处是：

1. 原子性：多个用户同时写，对数据库来说都是将字段加一，不会有后来者覆写前者的情况
2. 减少一次网络请求：不需先读再写

之后的 mul 指令同理。

如给收藏的商品数量加一：

```js
const _ = db.command
db.collection('user').where({
  _openid: 'my-open-id'
}).update({
  count: {
    favorites: _.inc(1)
  }
})
```

#### 更新指令 mul

更新指令。用于指示字段自乘某个值。


#### 更新指令 remove

更新指令。用于表示删除某个字段。如某人删除了自己一条商品评价中的评分：

```js
const _ = db.command
db.collection('comments').doc('comment-id').update({
  rating: _.remove()
})
```

## 文件存储

### 上传文件: app.uploadFile(Object)

请求参数

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| cloudPath | String | 是 | 文件的绝对路径，包含文件名。例如foo/bar.jpg、foo/bar/baz.jpg等，不能包含除[0-9 , a-z , A-Z]、/、!、-、_、.、和*以外的字符，使用 / 字符来实现类似传统文件系统的层级结构。[查看详情](https://cloud.tencent.com/document/product/436/13324)
| fileContent | fs.ReadStream | 是 | 要上传的文件实体，[查看类型详情](https://nodejs.org/api/stream.html#stream_class_stream_readable)

响应参数

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| code | String | 否 | 状态码，操作成功则不返回
| message | String | 否 | 错误描述
| fildID | fileID | 是 | 文件唯一ID，用来访问文件，建议存储起来
| requestId | String | 否 | 请求序列号，用于错误排查

示例代码

```javascript
const fs = require("fs");
let result = await app.uploadFile({
    cloudPath: "test-admin.jpeg",
    fileContent: fs.createReadStream(`${__dirname}/cos.jpeg`)
});
```

### 获取文件下载链接: app.getTempFileURL(Object)

请求参数

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| fileList | <Array>.Object | 是 | 要下载的文件ID组成的数组

fileList

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| fildID | String | 是 | 文件ID
| maxAge | Integer | 是 | 文件链接有效期

响应参数

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| code | String | 否 | 状态码，操作成功则为SUCCESS
| message | String | 否 | 错误描述
| fileList | \<Array>.Object | 否 | 存储下载链接的数组
| requestId | String | 否 | 请求序列号，用于错误排查

fileList

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| code | String | 否 | 删除结果，成功为SUCCESS
| fildID | String | 是 | 文件ID
| tempFileURL | String | 是 | 文件访问链接

示例代码

```javascript
let result = await app.getTempFileURL({
    fileList: [{
        fileID: "HHOeahVQ0fRTDsums4GVgMCsF6CE3wb7kmIkZbX+yilTJE4NPSQQW",
        maxAge: 60
    }]
});
```

### 删除文件: app.deletfile(Object)

请求参数

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| fileList | \<Array>.String | 是 | 要删除的文件ID组成的数组

响应参数

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| code | String | 否 | 状态码，操作成功则不返回
| message | String | 否 | 错误描述
| fileList | \<Array>.Object | 否 | 删除结果组成的数组
| requestId | String | 否 | 请求序列号，用于错误排查

fileList

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | --- |
| code | String | 否 | 删除结果，成功为SUCCESS
| fildID | String | 是 | 文件ID

示例代码

```javascript
let result = await app.deleteFile({
    fileList: [
        "HHOeahVQ0fRTDsums4GVgMCsF6CE3wb7kmIkZbX+yilTJE4NPSQQW5EYks"
    ]
});
```

## 云函数

### 执行函数: app.callFunction(Object)

请求参数

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | ---
| name | String | 是 | 云函数名称
| data | Object | 否 | 云函数参数

响应参数

| 字段 | 类型 | 必填 | 说明
| --- | --- | --- | ---
| code | String | 否 | 状态码，操作成功则不返回
| message | String | 否 | 错误描述
| result | String | 否 | 云函数执行结果
| requestId | String | 否 | 请求序列号，用于错误排查

示例代码

```javascript
let result = await app.callFunction({
    name: "test",
    data: { a: 1 }
});
```
