import {checkLogin,bookSave,getChapter,getProducts,getFriends,getInviteBooks,getIBChapter} from '../../services/example'
import {routerRedux} from 'dva/router'
import {message} from 'antd'

export default{
  namespace:'selfs',
  state:{

  },
  effects:{
      // wrirte编辑章节、新增书
      *bookSave({payload,callback},{call,put,select}){
          const data = yield call(bookSave,payload)
          if(data.code==0){
            message.success("成功！")
            // yield put(routerRedux.push('/product'));
          }
      },
      // selfs的index判断权限
      *checkLogin({payload,callback},{call,put,select}){
          const data = yield call(checkLogin,payload);
          if(data.code==0){
            console.log(data.msg)
          }
      },
      // write获取章节详情
      *getChapter({payload,callback},{call,put,select}){
          const data = yield call(getChapter,payload);
          if(data.code==0){
            console.log(data.msg)
          }
      },
      // product的datasource
      *getProducts({payload,callback},{call,put,select}){
          const data = yield call(getProducts,payload);
          if(data.code==0){
            console.log(data.data);
            let products = {selfProd:data.data,editProd:[]}
            return products;
          }
      },
      // friiend获取好友列表
      *getFriends({payload,callback},{call,put,select}){
          const data = yield call(getFriends,payload);
          return data;
      },
      // friiend获取可选的书
      *getInviteBooks({payload,callback},{call,put,select}){
          const data = yield call(getInviteBooks,payload);
          return data;
      },
       // friiend获取可选的书之后获取对应章节
      *getIBChapter({payload,callback},{call,put,select}){
          const data = yield call(getIBChapter,payload);
          return data;
      }
      
      


     

  },
  reducers:{
      querySuccess(state, action) {
            return { ...state,...action.payload}
        }
  }
}