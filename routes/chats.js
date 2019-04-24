const router = require('koa-router')();
const Chat = require("../dbs/models/Chat.js");

router.prefix('/chat');

router.post("/init", async (ctx) => {
  const {chat_id} = ctx.request.body;
  let res = await Chat.find({chat_id});
  ctx.body = {
    code: 0,
    msg: res
  }
});

module.exports = router