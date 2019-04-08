import {getList,userLogin} from '../../services/example'

export default{
	namespace:'login',
	state:{
    test:'ok',
    list:[],
    title:"日推"
	},
	effects:{
		*getList({payload,callback},{call,put,select}){
			const data = yield call(getList,payload);

			console.log(data)
			if(data.code==0){
				const list=data.data.result
				// console.log(list)
				yield put({type:'querySuccess',payload:{list:list}})
				callback&&callback(list)
			}

		},
		*userLogin({payload,callback},{call,put,select}){
			// console.log('model',payload)
			console.log('err1')
	
				const data =yield call(userLogin,payload)
				return data
			
         
			
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