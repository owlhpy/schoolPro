import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export async function userLogin(param) {
	// console.log("request",param)
    return request('/api/userLogin',{method:'post',data:param});
}
export async function userSignup(param) {
	// console.log("request",param)
    return request('/api/userSignup',{method:'post',data:param});
}

export async function logout(param) {
	// console.log("request",param)
    return request('/api/logout',{method:'GET',data:param});
}

