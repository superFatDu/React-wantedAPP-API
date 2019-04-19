const router = require('koa-router')();
const User = require("../dbs/models/User.js");

router.prefix('/users')

router.get('/getUser', async (ctx, next) => {
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

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
