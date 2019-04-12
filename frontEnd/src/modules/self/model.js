import {checkLogin,bookSave,getChapter,getProducts} from '../../services/example'
import {routerRedux} from 'dva/router'
import {message} from 'antd'

export default{
  namespace:'selfs',
  state:{
    chapter:{},
    products:{editProd:[],selfProd:[]}
  },
  effects:{
      // wrirte编辑章节、新增书
      *bookSave({payload,callback},{call,put,select}){
          const data = yield call(bookSave,payload)
          if(data.code==0){
            message.success("成功！")
            routerRedux.push('/product');
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


     

  },
  reducers:{
      querySuccess(state, action) {
            return { ...state,
                ...action.payload
            }
        }
  }
}