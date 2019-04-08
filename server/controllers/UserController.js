const { query } = require('../mysql/mysql')

class UserController {
	static async getAllUser(ctx, next) {
	let {username,password} = ctx.query
    let sql = `SELECT * FROM tb_bs_user where penName="${username}" and pwd="${password}"`
    let result = await query( sql )
    if(result.length>0){
    	console.log('sql result',result)
    	ctx.body = {code:'0',message:'查询成功',data:result}
    }else{
    	console.log('sql result',result)
    	ctx.body = {code:'1',message:'没有这个人'}
    }
	}

    static async logout(ctx,next){
        ctx.session.__SID = null;
        ctx.body = {code:'0',message:'退出登录成功'}
    }
    // replace(uuid(), '-', '')

}

module.exports = UserController;
