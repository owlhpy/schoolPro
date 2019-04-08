import Ajax from 'robe-ajax'
// import { browserHistory } from 'dva/router';


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
    error:err=>{console.log('ajax',err)},
    // timeout : 2000,
    data: options.data||{},
    processData: options.processData!==undefined?options.processData:undefined,
    contentType: options.contentType!==undefined?options.contentType:undefined,
    // processData: options.method === 'get',
    // dataType: options.dataType || 'JSON',
    // beforeSend: function(request) {

    //     let sid = sessionStorage.getItem(appConfig.sessionId)
    //     request.setRequestHeader(appConfig.sessionId, sid);
    // },
  }).done((data) => {
   
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
