import {getList} from '../../services/example'

export default{
	namespace:'signup',
	state:{
    test:'ok',
    list:[],
    title:"日推"
	},
	effects:{
		* getList({payload,callback},{call,put,select}){
			const data = yield call(getList,payload);

			console.log(data)
			if(data.code==0){
				const list=data.data.result
				// console.log(list)
				yield put({type:'querySuccess',payload:{list:list}})
				callback&&callback(list)
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