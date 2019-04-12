// import {getMenu,userLogin,test,getDaily} from '../../services/example'
import {message} from 'antd'
import {logout} from '../../services/example.js'
import {routerRedux} from 'dva/router'

export default{
  namespace:'home',
  state:{
    user:{username:null}
  },
  effects:{
      *getMenu({payload,callback},{call,put,select}){
          console.log('OK')
      },
      *logout({payload,callback},{call,put,select}){
          const result = yield call(logout,payload)
          if(result.code==0){
            message.success("成功")           
            sessionStorage.removeItem('__SID')
            // yield put({type:'querySuccess',payload:{user:{userName:null}}})
            yield put(routerRedux.push('/'))
          }
      }  
     

  },
  reducers:{
      querySuccess(state, action) {
            return { ...state,
                ...action.payload
            }
        },
  }
}