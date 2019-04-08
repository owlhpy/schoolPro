const router = require('koa-router')()
const passport = require('./passport')

const UserController = require("./controllers/UserController.js")

router.get('/getAllUser',UserController.getAllUser)

router.get('/logout',UserController.logout)

module.exports = router