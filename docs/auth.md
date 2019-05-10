### 获取auth的引用

```js
const app = require('tcb-admin-node');
const auth = app.auth();
```

#### 获取用户信息

```js
const {
  openId,
  appId,
  uid
} = auth.getUserInfo()
```
