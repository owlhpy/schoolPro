const { query } = require('../mysql/mysql')


class UserController {
    // 登录函数
	static async userLogin(ctx, next) {
	let {nickName,password} = ctx.request.body
    let sql = `SELECT * FROM tb_sp_user where nickName="${nickName}" and password="${password}"`
    let result = await query( sql )
    if(result.length>0){
    	console.log('sql result',result)
        ctx.session.__SID = result[0].id;
        console.log('ctx.session.__SID',ctx.session.__SID)
    	ctx.body = {code:'0',message:'查询成功',data:result}
    }else{
    	console.log('sql result',result)
    	ctx.body = {code:'1',message:'没有这个人'}
    }
	}
    // 注册函数
    static async userSignup(ctx,next){
        let {nickName,password} = ctx.request.body
        let birthday = new Date();
        // console.log('uuid',replace(uuid(), '-', ''))
        // console.log(ctx.request.body);
        let sql = `insert into tb_sp_user (id,penName,nickName,password,birthday) values(replace(uuid(), '-', ''),"${nickName}","${nickName}","${password}",now())`
        let result = await query( sql )
        console.log('result',result)
        if(result){
           ctx.body = {code:'0',message:'注册成功'} 
       }else{
        ctx.body = {code:'1',message:'注册错误'}
       }
        
    }
    // 判断是否登录
    static async checkLogin(ctx,next){
        console.log('sid',ctx.header.__sid)
        if((ctx.header.__sid==='null') || (!ctx.session.__SID)  ){
           
           ctx.body={code:'404',msg:'/login'}
           // ctx.redirect('/login');
        }else{
             ctx.body={code:'0',msg:'aaaaa'}
        }
    }
    // 登出函数
    static async logout(ctx,next){
        ctx.session.__SID = null;
        ctx.body = {code:'0',message:'退出登录成功'}
    }
    // 获取好友列表
    static async getFriends(ctx,next){
        let userId = ctx.header.__sid
        let sql= `select * from tb_sp_friendInvite where transmitId="${userId}" or receiveId = "${userId}"`
        let result = await query( sql );
        if(result.length>0){
            let id = result.map(item=>{
                if(item.status==1){
                    if(item.transmitId!==userId){
                        return item.transmitId
                    }
                    if(item.receiveId!==userId){
                        return item.receiveId;
                    }
                }
            })
            
            id= id.filter(item=>{return item!==undefined}).toString();
            console.log('ids',id)
            let sql3 = `select * from tb_sp_user where FIND_IN_SET(id,"${id}")`;
            let result3 = await query( sql3 );
            if(result3.length>0){
               ctx.body = {code:'0',data:result3,msg:'成功'} 
           }else{
            ctx.body = {code:'1',msg:'查询出错'} 
           }
            

        }else{
            ctx.body = {code:'2',msg:'没有好友',data:[]} 
        }

        
    }
    // replace(uuid(), '-', '')

}

module.exports = UserController;
