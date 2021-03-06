const router = require('koa-router')();
const Chat = require("../dbs/models/Chat.js");
const User = require("../dbs/models/User.js");

router.prefix('/chat');

router.post("/init", async (ctx) => {
  // const {chat_id} = ctx.request.body;
  const user = ctx.cookies.get("userId");
  // let res = await Chat.find({chat_id}, null, {sort: 'create_time'});
  //let res = await Chat.find({from: user}).or({to: user})
  let res = await Chat.find({'$or': [{from: user}, {to: user}]});
  ctx.body = {
    code: 0,
    msg: res
  }
});

router.post("/icon", async (ctx) => {
  const {_id} = ctx.request.body;
  let res = await User.findOne({_id});
  if (res) {
    ctx.body = {
      code: 0,
      data: res
    }
  }
})

module.exports = router