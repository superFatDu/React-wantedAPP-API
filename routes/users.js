const router = require('koa-router')();
const User = require("../dbs/models/User.js");

router.prefix('/user')

router.get('/getUserInfo', async (ctx, next) => {
  const userId = ctx.cookies.get("userId");
  if (!userId) {
    ctx.body = {
      code: 1,
      msg: "用户没有登录"
    }
  }
  let res = await User.findOne({_id: userId});
  if (!res) {
    ctx.body = {
      code: 1,
      msg: "后端出错了"
    }
  } else {
    ctx.body = {
      code: 0,
      msg: res
    }
  }
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
        regMsg: {
          user: res.user,
          type: res.type
        }
      }
    } else {
      ctx.body = {
        code: 1, 
        msg: "注册失败，请重试"
      }
    }
  }
})

router.post("/login", async (ctx, next) => {
  const { user, pwd } = ctx.request.body;
  let res = await User.findOne({user, pwd});
  if (!res) {
    ctx.body = {
      code: 1,
      msg: "用户名或者密码不正确"
    }
  } else {
    ctx.body = {
      code: 0, 
      msg: "登录成功",
      loginMsg: res
    }
    ctx.cookies.set("userId", res._id, {
      httpOnly: false
    });
  }
})

router.post("/addInfo", async (ctx) => {
  const userId = ctx.cookies.get("userId");
  if (!userId) {
    ctx.body = {
      code: 1,
      msg: "请先登录"
    }
  } else {
    const data = ctx.request.body;
    let res = await User.findOneAndUpdate({_id: userId}, data);
    let res1;
    if(res) {
      let updateTime = (new Date().getFullYear())+'-'+(new Date().getMonth() + 1)+'-'+(new Date().getDate());
      res1 = await User.findOneAndUpdate({_id: userId}, {updateTime});
      ctx.body = {
        code: 1,
        msg: res1
      }
    } else {
      ctx.body = {
        code: 1,
        msg: res
      }
    }
  }
})

router.post("/bossList", async (ctx) => {
  const {type} = ctx.request.body;
  let res = await User.find({type});
  ctx.body = {
    code: 0,
    data: res
  }
})

router.post("/infoUpdated", async (ctx) => {
  const userId = ctx.cookies.get("userId");
  if (!userId) {
    ctx.body = {
      code: 0,
      msg: "请先登录"
    }
  } else {
    let res = await User.findOne({_id: userId});
    ctx.body = {
      code: 1,
      data: res
    }
  }
})
module.exports = router;