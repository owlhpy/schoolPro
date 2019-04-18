import {searchValue} from '../../services/example'
import {message} from 'antd'

export default{
  namespace:'search',
  state:{
    user:{userName:'hpy'}
  },
  effects:{
      *searchValue({payload,callback},{call,put,select}){
           const data = yield call(searchValue,payload);
          return data;
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