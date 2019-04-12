const router = require('koa-router')()
const passport = require('./passport')

const UserController = require("./controllers/UserController.js")
const BookController = require("./controllers/BookController.js")


// 登录
router.post('/userLogin',UserController.userLogin)
// 判断登录
router.get('/checkLogin',UserController.checkLogin)
// 注册
router.post('/userSignup',UserController.userSignup)
// 登出
router.get('/logout',UserController.logout)
// 编辑章节，新建书
router.post('/bookSave',BookController.bookSave)
// 编辑章节，新建书
router.get('/getProducts',BookController.getProducts)

module.exports = router