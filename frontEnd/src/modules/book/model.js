import {getChapter,getBook} from '../../services/example'
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
      
     

  },
  reducers:{
      querySuccess(state, action) {
            return { ...state,
                ...action.payload
            }
        },
  }
}