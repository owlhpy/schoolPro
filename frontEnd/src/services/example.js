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

