let localConfig
try {
    localConfig = require('./config');
} catch (e) {
    localConfig = {
        secretId: process.env.TEST_SECRET_ID,
        secretKey: process.env.TEST_SECRET_KEY,
        env: process.env.TEST_ENV,
        appId: process.env.TEST_APP_ID,
    }
}
module.exports = localConfig
