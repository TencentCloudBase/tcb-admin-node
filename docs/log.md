```javascript
const admin = require('tcb-admin-node')
let logMsg = {name: 'luke', age: '25'}
admin.logger.log(logMsg)
admin.logger.warn(logMsg)
admin.logger.error(logMsg)
admin.logger.info(logMsg)
```
