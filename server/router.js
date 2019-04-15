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
// 获取好友列表
router.get('/getFriends',UserController.getFriends)
// 获取可邀请的书
router.get('/getInviteBooks',BookController.getInviteBooks)
// 获取可邀请的书
router.get('/getIBChapter',BookController.getIBChapter)

// 编辑章节，新建书
router.post('/bookSave',BookController.bookSave)
// 获取作品
router.get('/getProducts',BookController.getProducts)
// 获取章节详情
router.get('/getChapter',BookController.getChapter)
// 获取某本书详情
router.get('/getBook',BookController.getBook)

module.exports = router