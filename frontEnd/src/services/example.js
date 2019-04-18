import request from '../utils/request';


// 章节修改、新增
export async function bookSave(param) {
	// console.log("request",param)
    return request('/api/bookSave',{method:'post',data:param});
}

// 获取章节详情
export async function getChapter(param) {
	// console.log("request",param)
    return request('/api/getChapter',{method:'get',data:param});
}
// 获取作品
export async function getProducts(param) {
	// console.log("request",param)
    return request('/api/getProducts',{method:'get',data:param});
}

// 获取某本书的opt
export async function getBookOpt(param) {
	// console.log("request",param)
    return request('/api/getBookOpt',{method:'get',data:param});
}
// 获取某本书的opt
export async function handleOpt(param) {
	// console.log("request",param)
    return request('/api/handleOpt',{method:'get',data:param});
}
// 获章节点击喜欢
export async function handleLike(param) {
	// console.log("request",param)
    return request('/api/handleLike',{method:'get',data:param});
}

// 提交章节评论
export async function saveComments(param) {
	// console.log("request",param)
    return request('/api/saveComments',{method:'post',data:param});
}

// 获取热门作者
export async function hotWriter(param) {
	// console.log("request",param)
    return request('/api/hotWriter',{method:'get',data:param});
}
// 获取单个作者详情
export async function getWriterDetail(param) {
	// console.log("request",param)
    return request('/api/getWriterDetail',{method:'get',data:param});
}
// 发送好友邀请
export async function sendFriendInvite(param) {
	// console.log("request",param)
    return request('/api/sendFriendInvite',{method:'get',data:param});
}








// 获取某个作品作品
export async function getBook(param) {
	// console.log("request",param)
    return request('/api/getBook',{method:'get',data:param});
}

// 好友列表
export async function getFriends(param) {
	// console.log("request",param)
    return request('/api/getFriends',{method:'get',data:param});
}

// 获取可邀请的书
export async function getInviteBooks(param) {
	// console.log("request",param)
    return request('/api/getInviteBooks',{method:'get',data:param});
}
// 获取可邀请的书
export async function getIBChapter(param) {
	// console.log("request",param)
    return request('/api/getIBChapter',{method:'get',data:param});
}

// 留言
export async function sendMsg(param) {
	// console.log("request",param)
    return request('/api/sendMsg',{method:'post',data:param});
}
// 邀请写作
export async function sendInvite(param) {
	// console.log("request",param)
    return request('/api/sendInvite',{method:'post',data:param});
}
// message获取书的受邀信息
export async function getInvitedBookMsg(param) {
	// console.log("request",param)
    return request('/api/getInvitedBookMsg',{method:'get',data:param});
}
// message获取书的受邀信息
export async function saveInvite(param) {
	// console.log("request",param)
    return request('/api/saveInvite',{method:'post',data:param});
}

// message获取书的受邀信息
export async function getEditChapter(param) {
	// console.log("request",param)
    return request('/api/getEditChapter',{method:'get',data:param});
}

// message获取邀请回复
export async function getInviteReply(param) {
	// console.log("request",param)
    return request('/api/getInviteReply',{method:'get',data:param});
}
// message获取好友邀请
export async function getFriendInvite(param) {
	// console.log("request",param)
    return request('/api/getFriendInvite',{method:'get',data:param});
}

// 获取留言
export async function getMessage(param) {
	// console.log("request",param)
    return request('/api/getMsg',{method:'get',data:param});
}

// get个人资料
export async function getSelfMsg(param) {
	// console.log("request",param)
    return request('/api/getSelfMsg',{method:'get',data:param});
}

// save个人资料
export async function saveSelfMsg(param) {
	// console.log("request",param)
    return request('/api/saveSelfMsg',{method:'post',data:param});
}
// 更改密码
export async function editPwd(param) {
	// console.log("request",param)
    return request('/api/editPwd',{method:'post',data:param});
}
// 获取首页的书
export async function pageBooks(param) {
	// console.log("request",param)
    return request('/api/pageBooks',{method:'get',data:param});
}













// 登录
export async function userLogin(param) {
	// console.log("request",param)
    return request('/api/userLogin',{method:'post',data:param});
}

// 注册
export async function userSignup(param) {
	// console.log("request",param)
    return request('/api/userSignup',{method:'post',data:param});
}
// 路由鉴权
export async function checkLogin(param) {
	// console.log("request",param)
    return request('/api/checkLogin',{method:'GET',data:param});
}
// 登出
export async function logout(param) {
	// console.log("request",param)
    return request('/api/logout',{method:'GET',data:param});
}

