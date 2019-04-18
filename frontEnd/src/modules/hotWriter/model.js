import {hotWriter,getWriterDetail,sendFriendInvite} from '../../services/example'
import {message} from 'antd'

export default{
  namespace:'hotWriter',
  state:{
    user:{userName:'hpy'}
  },
  effects:{
      *hotWriter({payload,callback},{call,put,select}){
          const data = yield call(hotWriter,payload);
          return data;
      },
      *getWriterDetail({payload,callback},{call,put,select}){
          const data = yield call(getWriterDetail,payload);
          return data;
      },
      *sendFriendInvite({payload,callback},{call,put,select}){
          const data = yield call(sendFriendInvite,payload);
          return data;
      },
      
       

     

  },
  reducers:{
      querySuccess(state, action) {
            return { ...state,
                ...action.payload
            }
        },
  }
}