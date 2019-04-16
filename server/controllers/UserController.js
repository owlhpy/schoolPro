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
        let sql = `insert into tb_sp_bookInvite (id,transmitId,receiveId,create_date,bookId,chapterNum)
        values("${id}","${transmitId}","${receiveId}",now(),"${bookId}","${chapterNum}") `
        let result = await query( sql );
        let sql2 = `update tb_sp_book set isInvite=1 where id = "${bookId}"`
        let result2 = await query( sql2 );
        if(result&&result2){
            ctx.body = {code:'0',message:'成功'} 
        }else{
            ctx.body = {code:'1',message:'失败'} 
        }
    }
    // handle受邀写作
    static async saveInvite(ctx,next){
        let receiveId = ctx.header.__sid;
        let {bookId,status,chapterNum} = ctx.request.body;
        let chapterId = GetuuId('time');
        
        // 拒绝
        if(status==2){
           let sql = `update tb_sp_bookInvite set status=2 where bookId="${bookId}" and receiveId="${receiveId}" and status=0`;
           let result = await query( sql );
           let sql2 = `update tb_sp_book set isInvite=0 where id="${bookId}"`;
           let result2 = await query( sql2 );
            if(result&&result2){
            ctx.body={code:'0',msg:'成功'}
        }else{
            ctx.body={code:'1',msg:'拒绝出错'}
        }
        }else{
            let sql = `update tb_sp_bookInvite set status=1 where bookId="${bookId}" and receiveId="${receiveId}" and status=0`;
           let result = await query( sql );
            let sql2 = `update tb_sp_book set isInvite=0,currentWriter="${receiveId}" where id="${bookId}"`;
           let result2 = await query( sql2 );
            let sql3 = `insert into tb_sp_chapter (id,writerId,num,bookId,create_date) values("${chapterId}","${receiveId}","${chapterNum}","${bookId}",now())`
          let result3 = await query( sql3 );
              if(result&&result2&&result3){
            ctx.body={code:'0',msg:'成功'}
        }else{
            ctx.body={code:'1',msg:'出错'}
        }
             


        }
        

        
             




    }

    // 获取受邀写作信息
    static async getInvitedBookMsg(ctx,next){
        let receiveId = ctx.header.__sid;
        let sql = `select S1.id as bookId,S2.chapterNum,S1.bookName,S2.status,S3.penName,S3.id as transmitId from tb_sp_book S1 join tb_sp_bookInvite S2 on S1.id = S2.bookId join tb_sp_user S3 on S2.transmitId = S3.id where S2.receiveId = "${receiveId}" and S2.status=0`;
        let result = await query( sql );
        if(result.length>0){
            ctx.body = {code:'0',msg:"成功",data:result}
        }else{
            ctx.body = {code:'0',msg:"暂无数据",data:[]}
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
