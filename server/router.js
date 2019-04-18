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
// 提交留言
router.post('/sendMsg',UserController.sendMsg)
// 提交邀请
router.post('/sendInvite',UserController.sendInvite)
// 获取书的邀请信息
router.get('/getInvitedBookMsg',UserController.getInvitedBookMsg)

// 获取热门作者
router.get('/hotWriter',UserController.hotWriter)
// 获取作者详细信息
router.get('/getWriterDetail',UserController.getWriterDetail)

// 获取邀请回复
router.get('/getInviteReply',UserController.getInviteReply)
// 获取好友邀请
router.get('/getFriendInvite',UserController.getFriendInvite)

// handle书的邀请
router.post('/saveInvite',UserController.saveInvite)

// 获取可邀请的书
router.get('/getInviteBooks',BookController.getInviteBooks)
// 获取可邀请的书的章节
router.get('/getIBChapter',BookController.getIBChapter)
// 获取留言信息
router.get('/getMsg',UserController.getMsg)
// 获取首页书籍信息
router.get('/pageBooks',BookController.pageBooks)
// 获取某本书的opt
router.get('/getBookOpt',BookController.getBookOpt)
// 获取某本书的opt
router.get('/handleOpt',BookController.handleOpt)
// 章节点击喜欢
router.get('/handleLike',BookController.handleLike)
// 提交 章节评论
router.post('/saveComments',BookController.saveComments)



// 保存个人资料的修改
router.post('/saveSelfMsg',UserController.saveSelfMsg)
// 保存个人资料的修改
router.post('/editPwd',UserController.editPwd)
// 获取个人资料
router.get('/getSelfMsg',UserController.getSelfMsg)

// 编辑章节，新建书
router.post('/bookSave',BookController.bookSave)
// 获取作品
router.get('/getProducts',BookController.getProducts)
// 获取章节详情
router.get('/getChapter',BookController.getChapter)
// 获取某本书详情
router.get('/getBook',BookController.getBook)



// 获取所编辑的章节的信息
router.get('/getEditChapter',BookController.getEditChapter)

module.exports = router