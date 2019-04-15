const { query } = require('../mysql/mysql')
const uuidv1 = require('uuid/v1');
const uuidV4 = require('uuid/v4');

function GetuuId(type){
    var temp;
    if(type=='time'){
        temp = uuidv1();
        temp = temp.split('-').join('');
    }else{
        temp = uuidV4();
        temp = temp.split('-').join('');
        

    }
        
        return temp;
}

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
        // console.log('sid',ctx.header.__sid)
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
    // 发送留言
    static async sendMsg(ctx,next){
        let {receiveId,content} = ctx.request.body
        let transmitId = ctx.header.__sid;
        let id = GetuuId("time");
        let sql = `insert into tb_sp_message (id,transmitId,receiveId,content,create_date) values("${id}","${transmitId}","${receiveId}","${content}",now())`;
        let result = await query( sql );
        if(result){
            ctx.body = {code:'0',message:'成功'}
        }else{
            ctx.body = {code:'1',message:'失败'} 
        }
        
    }
    // 发送邀请
    static async sendInvite(ctx,next){
        let {bookId,chapterNum,receiveId} = ctx.request.body
        let transmitId = ctx.header.__sid;
        let id = GetuuId("time");
        let chapterId = GetuuId();
        let sql = `insert into tb_sp_bookInvite (id,transmitId,receiveId,create_date,bookId,chapterId)
        values("${id}","${transmitId}","${receiveId}",now(),"${bookId}","${chapterId}")
        `
        let result = await query( sql );
        let sql1 = `insert into tb_sp_chapter (id,bookId,num,status,receiveWriterId) values("${chapterId}","${bookId}","${chapterNum}",2,"${receiveId}")`;
        let result1 = await query( sql1 );
        if(result&&result1){
            ctx.body = {code:'0',message:'成功'} 
        }else{
            ctx.body = {code:'1',message:'失败'} 
        }
    }
    // handle受邀写作
    static async saveInvite(ctx,next){
        let receiveId = ctx.header.__sid;
        let {chapterId,status} = ctx.request.body;
        var sql,result,result1;
        if(status==2){
            sql = `delete from tb_sp_chapter where id = "${chapterId}"`;
            result = await query( sql );
            if(result){
            ctx.body={code:'0',msg:'成功'}
        }else{
            ctx.body={code:'1',msg:'出错'}
        }
        }else{
            
             sql = `update tb_sp_bookInvite set status=1 where receiveId="${receiveId}" and chapterId="${chapterId}"`
             result = await query( sql );
              let sql1 = `update tb_sp_chapter set status = 0,writerId="${receiveId}" where id="${chapterId}"`
              result1 = await query( sql1 );
              if(result&&result1){
            ctx.body={code:'0',msg:'成功'}
        }else{
            ctx.body={code:'1',msg:'出错'}
        }
             


        }
        

        
             




    }

    // 获取受邀写作信息
    static async getInvitedBookMsg(ctx,next){
        let id = ctx.header.__sid;
        let sql = `select * from tb_sp_bookInvite where receiveId="${id}"`;
        let result = await query( sql );
        console.log('getInvitedBookMsg',result)
        let ids = result.map(item=>{
            return item.chapterId;
        }).toString();
        if(result.length>0){
            let sql2 = `select C.penName,C.id as transmitId,A.bookName,B.num,B.status,B.id as chapterId 
            from tb_sp_user C join tb_sp_book A join tb_sp_chapter B on A.id = B.bookId 
            where FIND_IN_SET(B.id,"${ids}") and C.id = "${result[0].transmitId}" `;
            let result2 = await query( sql2 );
            if(result2.length>0){
                ctx.body = {code:'0',message:'成功',data:result2} 
            }else{
            ctx.body = {code:'1',message:'失败'} 
            }

        }else{
           ctx.body = {code:'0',message:'暂无邀请',data:[]}  
        }
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
