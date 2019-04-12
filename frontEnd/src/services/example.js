import request from '../utils/request';


// 章节修改、新增
export async function bookSave(param) {
	// console.log("request",param)
    return request('/api/bookSave',{method:'post',data:param});
}

// 获取章节详情
export async function getChapter(param) {
	// console.log("request",param)
    return request('/api/getChapter',{method:'post',data:param});
}
// 获取作品
export async function getProducts(param) {
	// console.log("request",param)
    return request('/api/getProducts',{method:'get',data:param});
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

