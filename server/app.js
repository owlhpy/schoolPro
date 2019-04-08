// const Koa = require('koa')
// // const Router = require('koa-router');
// const controller = require('./controller.js');
// const router = require('./router')


// // const router = new Router();
// const app = new Koa()

// app.use(async (ctx, next) => {
//   await next()
// })

// router.get('/index', controller.index)
// app
//   .use(router.routes())
//   .use(router.allowedMethods())

// app.listen(3366, () => {
//   console.log('starting at port 3366')
// })


const Koa = require('koa')
const cors = require('koa-cors')
const session = require('koa-session');
const app = new Koa()
const router = require('./router')
// const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body');

app.keys = ['some secret hurr'];

const CONFIG = {
  key: '__SID', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  path:'/login',
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));
app.use(router.routes()) // 使用路由中间件处理路由
// app.use(ctx => {
//   // ignore favicon
//   console.log('ctx.path',ctx.path)
//   if (ctx.path === '/favicon.ico') return;

//   let n = ctx.session.views || 0;
//   ctx.session.views = ++n;
//   ctx.body = n + ' views';
// });

app.use(koaBody()) // 把koa2上下文的formData数据解析到ctx.request.body中
app.use(cors()) // 解决跨域问题

app.listen(3366) // 监听3366端口
console.log('app is stared & listening on port 3366')