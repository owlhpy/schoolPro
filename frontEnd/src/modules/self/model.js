import {checkLogin,bookSave,getChapter,getProducts,getFriends,getInviteBooks,getIBChapter,sendInvite,getMessage,getFriendInvite,getInviteReply,getEditChapter,saveInvite,sendMsg,getInvitedBookMsg} from '../../services/example'
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
            let products = {selfProd:data.data.selfProd,editProd:data.data.editProd}
            return products;
          }
      },
      // friend获取好友列表
      *getFriends({payload,callback},{call,put,select}){
          const data = yield call(getFriends,payload);
          return data;
      },
      // friend获取可选的书
      *getInviteBooks({payload,callback},{call,put,select}){
          const data = yield call(getInviteBooks,payload);
          return data;
      },
       // friend获取可选的书之后获取对应章节
      *getIBChapter({payload,callback},{call,put,select}){
          const data = yield call(getIBChapter,payload);
          return data;
      },
       // friend的留言
      *sendMsg({payload,callback},{call,put,select}){
          const data = yield call(sendMsg,payload);
          return data;
      },
      // friend的邀请
      *sendInvite({payload,callback},{call,put,select}){
          const data = yield call(sendInvite,payload);
          return data;
      },
      // message获取书的受邀信息
      *getInvitedBookMsg({payload,callback},{call,put,select}){
          const data = yield call(getInvitedBookMsg,payload);
          return data;
      },
      // message handle书的邀请
      *saveInvite({payload,callback},{call,put,select}){
          const data = yield call(saveInvite,payload);
          return data;
      },
      // message handle书的邀请
      *getEditChapter({payload,callback},{call,put,select}){
          const data = yield call(getEditChapter,payload);
          return data.data;
      },
      // get邀请回复
      *getInviteReply({payload,callback},{call,put,select}){
          const data = yield call(getInviteReply,payload);
          return data;
      },
       // get好友邀请
      *getFriendInvite({payload,callback},{call,put,select}){
          const data = yield call(getFriendInvite,payload);
          return data;
      },
       // get留言
      *getMessage({payload,callback},{call,put,select}){
          const data = yield call(getMessage,payload);
          return data;
      },
      

      
      
      
      
      


     

  },
  reducers:{
      querySuccess(state, action) {
            return { ...state,...action.payload}
        }
  }
}