
import Ajax from 'robe-ajax'
import app from '../index.js'
import {message} from 'antd'
import { routerRedux } from 'dva/router';
// import { browserHistory } from 'dva/router';
console.log('app',app)

export default function request (url, options) {
    var data
    if(typeof options.data=='string'||options.data instanceof FormData){
        data=options.data
    }
    // else{
    //      data={pageSize:localStorage.getItem('pageSize')||10,...options.data}
    // }
  return Ajax.ajax({
    url: url,
    method: options.method || 'get',
    withCredentials:true,
    error:err=>{console.log('ajax',err)},
    // timeout : 2000,
    data: options.data||{},
    processData: options.processData!==undefined?options.processData:undefined,
    contentType: options.contentType!==undefined?options.contentType:undefined,
    // processData: options.method === 'get',
    // dataType: options.dataType || 'JSON',
    beforeSend: function(request) {
        const sid = sessionStorage.getItem('userId')
        request.setRequestHeader('__SID', sid);
    },
  }).done((data) => {
    if(data.code&&data.code=='404'){
        if(sessionStorage.getItem('__SID')){
            sessionStorage.removeItem('__SID')
            message.error("登录超时，请重新登录！")
        }
        app._history.push('/login')
        return;
        // window.history.push (`${window.location.host}/login`)
        // browserHistory.push()
    }
   
        // browserHistory.push('/')
        // location.pathname='/welcome'
    // console.log('done',data)
    // return JSON.stringify(data)
    return data
  }).fail((err) => {
    console.log("error",err)

    // var data = {"code":"-2","message":"请求错误"}

    // let lang = localStorage.lang || 'en_US'
    // err.msg = locales[lang].messages['global.app.info.fail.connect.server']  // 提示信息
    // appUtils.message({type:'error', msg:err.msg})
    // return data
  })

}

// import fetch from 'dva/fetch';

// function parseJSON(response) {
//   return response.json();
// }

// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(data => ({ data }))
//     .catch(err => ({ err }));
// }
