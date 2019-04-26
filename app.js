const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const chats = require("./routes/chats")

const mongoose = require("mongoose");
const dbConfig = require("./dbs/config.js");

const chatModel = require("./dbs/models/Chat")

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(chats.routes(), chats.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// link mongodb
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
}, () => {
  console.log("success");
});


// socket io
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
const port = 8081;

server.listen(process.env.PORT || port, () => {
     console.log(`app run at : http://127.0.0.1:${port}`);
})

io.on('connection', socket => {
  console.log('socket初始化成功！');
  socket.on('sendMsg', async (data) => {
    const {from, to, msg} = data;
    const chat_id = [from, to].sort().join('_');
    let res = await chatModel.create({chat_id, from, to, content: msg, create_time: new Date().getTime()});
    if (res) {
      io.emit('recvMsg', Object.assign({}, res._doc));
    }
  })
})

module.exports = app
