const router = require('koa-router')();
const User = require("../dbs/models/User.js");
router.prefix('/user')

router.get('/getUserInfo', async (ctx, next) => {
  let res = await User.find((err, doc) => {
    if (err) {
      return err
    } else {
      return doc;
    }
  });
  ctx.body = res;
})

router.post('/regInfo', async (ctx, next) => {
  const { user, pwd, type } = ctx.request.body;
  let res = await User.findOne({user});
  if (res) {
    ctx.body = {
          code: 1,
          msg: "用户名已存在"
        }
  } else {
    let res = await new User({user, pwd, type}).save();
    if (res) {
      ctx.body = {
        code: 0, 
        msg: "注册成功",
        loginMsg: res.user
      }
    } else {
      ctx.body = {
        code: 1, 
        msg: "注册失败，请重试"
      }
    }
  }
})

module.exports = router;