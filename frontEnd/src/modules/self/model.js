// import {getMenu,userLogin,test,getDaily} from '../../services/example'
import {message} from 'antd'

export default{
  namespace:'selfs',
  state:{
    user:{userName:'hpy'}
  },
  effects:{
      *getMenu({payload,callback},{call,put,select}){
          console.log('OK')
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