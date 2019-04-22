const router = require('koa-router')();
const User = require("../dbs/models/User.js");

router.prefix('/users')

router.get('/getUserInfo', async (ctx, next) => {
  let res = await User.find((err, doc) => {
    if (err) {
      return err
    } else {
      return doc;
    }
  });
  ctx.body = res;
  next();
})

module.exports = router
