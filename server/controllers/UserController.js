const { query } = require('../mysql/mysql')

class UserController {
    // 登录函数
	static async userLogin(ctx, next) {
	let {nickName,password} = ctx.request.body
    let sql = `SELECT * FROM tb_sp_user where nickName="${nickName}" and password="${password}"`
    let result = await query( sql )
    if(result.length>0){
    	console.log('sql result',result)
        ctx.session.userInfo = 'test';
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
    // 登出函数
    static async logout(ctx,next){
        ctx.session.__SID = null;
        ctx.body = {code:'0',message:'退出登录成功'}
    }
    // replace(uuid(), '-', '')

}

module.exports = UserController;
