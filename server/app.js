const Koa = require('koa')
const cors = require('koa-cors')
// const session = require('koa-session');
const session = require("koa-session2");
const Store = require("./Store.js");
const app = new Koa()
const router = require('./router')
// const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body');



app.use(cors({
  credentials:true
})) // 解决跨域问题
app.use(koaBody()) // 把koa2上下文的formData数据解析到ctx.request.body中
// 使用redis作为session存储
app.use(session({
  store: new Store()
}));



app.use(router.routes()) // 使用路由中间件处理路由






app.listen(3366) // 监听3366端口
console.log('app is stared & listening on port 3366')