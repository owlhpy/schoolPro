const router = require('koa-router')()
const passport = require('./passport')

const UserController = require("./controllers/UserController.js")

// 登录
router.post('/userLogin',UserController.userLogin)
// 注册
router.post('/userSignup',UserController.userSignup)


router.get('/logout',UserController.logout)

module.exports = router