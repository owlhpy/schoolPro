import {getChapter,getBook,getBookOpt,handleOpt,saveComments,handleLike} from '../../services/example'
import {message} from 'antd'

export default{
  namespace:'book',
  state:{
  },
  effects:{
      *getChapter({payload,callback},{call,put,select}){
          const data = yield call(getChapter,payload);
          return data;
      },
      *getBook({payload,callback},{call,put,select}){
          const data = yield call(getBook,payload);
          return data;
      },
       *getBookOpt({payload,callback},{call,put,select}){
          const data = yield call(getBookOpt,payload);
          return data;
      },
       *handleOpt({payload,callback},{call,put,select}){
          const data = yield call(handleOpt,payload);
          return data;
      },
    
       *saveComments({payload,callback},{call,put,select}){
          const data = yield call(saveComments,payload);
          return data;
      },
       *handleLike({payload,callback},{call,put,select}){
          const data = yield call(handleLike,payload);
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