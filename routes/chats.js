const router = require('koa-router')();
const Chat = require("../dbs/models/Chat.js");

router.prefix('/chat');

router.get("/init", async (ctx) => {
  const userId = ctx.cookies.get("userId");
  let res = await Chat.find({chat_id: userId});
  ctx.body = {
    code: 0,
    msg: res
  }
});

module.exports = router