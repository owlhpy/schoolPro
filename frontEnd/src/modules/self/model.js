import {checkLogin} from '../../services/example'
import {message} from 'antd'

export default{
  namespace:'selfs',
  state:{
    user:{userName:'hpy'}
  },
  effects:{
      *getMenu({payload,callback},{call,put,select}){
          console.log('OK')
      },
      *checkLogin({payload,callback},{call,put,select}){
          const data = yield call(checkLogin,payload);
          if(data.code==0){
            console.log(data.msg)
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