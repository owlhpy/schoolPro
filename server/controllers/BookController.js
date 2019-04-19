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
class BookController{
	
	// 首页的书本信息
	static async pageBooks(ctx,next){
        let sql = `select bookName,t.recommends,t.collections,S3.id,S3.chapterNum from (select sum(recommends) as recommends,sum(collections) as collections,S1.id from tb_sp_book S1 join tb_sp_bookOpt S2 on S1.id=S2.bookId group by S1.id) t join tb_sp_book S3 on t.id = S3.id`;
        let result = await query( sql );
        let sql2 = `select bookName,id from tb_sp_book order by create_date desc limit 5`
        let result2 = await query( sql2 );
        if(result.length>0){
            ctx.body = {code:'0',msg:'成功',data:{daily:result,newBooks:result2}}
        }else{
             let sql = `select chapterNum,bookName,id from tb_sp_book `
            let result = await query( sql );

            ctx.body = {code:'0',msg:'成功但没有opt',data:{daily:result,newBooks:result2}}
        }
        
    }
    
    // 首页章节comments
    static async saveComments(ctx,next){
        if((ctx.header.__sid==='null') || (!ctx.session.__SID)  ){
           
           ctx.body={code:'1',msg:'请登录再进行操作！'}
           // ctx.redirect('/login');
        }else{
            let transmitId = ctx.header.__sid;
        let {content,chapterId} = ctx.request.body;
        let id = GetuuId("time");
        let sql = `insert into tb_sp_comment (id,transmitId,content,chapterId,create_date) values("${id}","${transmitId}","${content}","${chapterId}",now())`
        let result = await query( sql );
        if(result){
            ctx.body = {code:'0',msg:'成功'}
        }else{
            ctx.body = {code:'1',msg:'出错'}
        }

        }
        
        
    }


    
    // 查询某书的bookOpt
    static async getBookOpt(ctx,next){  
        let {id} = ctx.query;
        let sql = `select t.recommends,t.collections,S3.chapterNum from (select sum(recommends) as recommends,sum(collections) as collections,S1.id from tb_sp_book S1 join tb_sp_bookOpt S2 on S1.id=S2.bookId group by S1.id) t join tb_sp_book S3 on t.id = S3.id where S3.id="${id}"`;
        let result = await query( sql );
        if(result.length>0){
            ctx.body = {code:'0',msg:'成功',data:result[0]}
        }else{
             let sql = `select chapterNum from tb_sp_book where id= "${id}"`
            let result = await query( sql );

            ctx.body = {code:'0',msg:'暂无数据',data:{recommends:0,collections:0,chapterNum:result[0].chapterNum}}
        }
        
    }
    static async handleOpt(ctx,next){
         // console.log('ctx.path',ctx.path)
          if((ctx.header.__sid==='null') || (!ctx.session.__SID)  ){
           
           ctx.body={code:'1',msg:'请登录再进行操作！'}
           // ctx.redirect('/login');
        }else{

                let { type, bookId } = ctx.query;
      let transmitId = ctx.header.__sid;
      console.log('transmitId',transmitId)
    
let sql1 = `select recommends,collections from tb_sp_bookOpt where transmitId = "${transmitId}" and bookId="${bookId}"`;
let result1 = await query(sql1);
console.log('result1',result1)
if (result1.length>0) {
  let sql, result;

  if (type == 1 && result1[0].recommends==0) {
    sql = `update tb_sp_bookOpt set recommends = 1 where transmitId = "${transmitId}" and bookId="${bookId}"`;
    result = await query(sql);
    if (result) {
      ctx.body = { code: "0", msg: "成功" };
    } else {
      ctx.body = { code: "1", msg: "错误" };
    }
  } else if(type == 1 && result1[0].recommends==1) {
    ctx.body = { code: "1", msg: "您已推荐过此书！" };
  }
  if (type == 0 && result1[0].collections == 0) {
    sql = `update tb_sp_bookOpt set collections = 1 where transmitId = "${transmitId}" and bookId="${bookId}"`;
    result = await query(sql);
    if (result) {
      ctx.body = { code: "0", msg: "成功" };
    } else {
      ctx.body = { code: "1", msg: "错误" };
    }
  } else if(type == 0 && result1[0].collections==1) {
    ctx.body = { code: "1", msg: "您已收藏过此书！" };
  }
} else {
  let sql, result;
  if (type == 1) {
    sql = `insert into tb_sp_bookOpt (transmitId,bookId,recommends,create_date) values("${transmitId}","${bookId}",1,now())`;
    result = await query(sql);
  } else {
    sql = `insert into tb_sp_bookOpt (transmitId,bookId,collections,create_date) values("${transmitId}","${bookId}",1,now())`;
    result = await query(sql);
  }
  if (result) {
    ctx.body = { code: "0", msg: "成功" };
  } else {
    ctx.body = { code: "1", msg: "错误" };
  }
}

        }
  

    }

   static async handleLike(ctx,next){
    if((ctx.header.__sid==='null') || (!ctx.session.__SID)  ){
           
           ctx.body={code:'1',msg:'请登录再进行操作！'}
           // ctx.redirect('/login');
        }else{
              let {chapterId} = ctx.query
    let transmitId = ctx.header.__sid;
    let sql1 = `select likes from tb_sp_chapterOpt where transmitId = "${transmitId}" and chapterId="${chapterId}"`;
    let result1 = await query(sql1);
    if(result1.length>0){
        ctx.body={code:'1',msg:'您已发表喜欢过这个章节！'}
    }else{
        let sql = `insert into tb_sp_chapterOpt (chapterId,transmitId,likes,create_date) values("${chapterId}","${transmitId}",1,now())`
        let result = await query(sql);
        if(result){
            ctx.body = {code:'0',msg:'成功'}
        }else{
            ctx.body = {code:'1',msg:'出错'}
        }
    }

        }
  

   }
    
    // 某本书的详情页
    static async getBook(ctx,next){
       const {bookId} = ctx.query;
       
        let sql2 = `select bookId,bookName,chapterNum,A.id,isDelete,isShow,num,pic,title,A.writerId from tb_sp_chapter A join tb_sp_book B on A.bookId=B.id where A.bookId = "${bookId}" order by A.num`
        let result2 = await query( sql2 );
        if(result2.length>0){
            var user = result2.map(item=>{
                return item.writerId;
            })
            user = user.filter(item=>{return item!==undefined}).toString();
            let sql3 = `select * from tb_sp_user where FIND_IN_SET(id,"${user}")`;
            let result3 = await query( sql3 );
            if(result3.length>0){
            ctx.body = {code:'0',msg:'成功',data:{chapterMsg:result2,userMsg:result3}}
        }else{
            ctx.body = {code:'1',msg:'错误'}
        } 

        };
          
    }
    // 搜索用
    static async searchValue(ctx,next){
       let {data} = ctx.query;
       let sql = `select * from tb_sp_book where bookName like '%${data}%'`;
       let result = await query( sql );
       let sql1 = `select * from tb_sp_user where penName like '%${data}%' or nickName like '%${data}%'`;
       let result1 = await query( sql1 );
       if(result&&result1){
        ctx.body={code:'0',msg:'成功',data:{bookMsg:result,writerMsg:result1}}
       }else{
        ctx.body={code:'1',msg:'错误'}
       }
          
    }
    
    // 某个章节的详情页
    static async getChapter(ctx,next){
    	console.log('I come here')
        const {chapterId} = ctx.query;
        // let writerId = ctx.header.__sid;
        //当前章节
        let sql = `select * from tb_sp_chapter S1 join tb_sp_book S2 on S1.bookId=S2.id where S1.id="${chapterId}" order by S1.num `;
        let result = await query( sql );
        let bookId = result[0].bookId;
        let userId = result[0].writerId;
        let sql2 = `select * from tb_sp_chapter where bookId = "${bookId}" and status=1 order by num`
        let result2 = await query( sql2 );
        let sql3 = `select * from tb_sp_user where id="${userId}"`;
        let result3 = await query( sql3 ); 
        let sql4 = `select penName,content,S1.create_date,pic from tb_sp_comment S1 join tb_sp_user S2 on S1.transmitId = S2.id where chapterId="${chapterId}"`
        let result4 = await query( sql4 );
        let sql5 = `select count(likes) as likes from tb_sp_chapterOpt where chapterId = "${chapterId}"`
        let result5 = await query( sql5 );   
        if(result.length>0&&result2.length>0){
        	ctx.body = {code:'0',msg:'成功',data:{bookMsg:result2,chapterMsg:result[0],userMsg:result3[0],comments:result4,likes:result5[0].likes}}
        }else{
        	ctx.body = {code:'1',msg:'错误'}
        }	
    }
    static async getRefresh(ctx,next){
         const {chapterId,type} = ctx.query;
         var sql,result;
         switch (type) {
                case 'like':
                 {sql = `select count(likes) as likes from tb_sp_chapterOpt where chapterId = "${chapterId}"`
                result = await query( sql )
                if(result){
            ctx.body={code:'0',msg:'成功',data:result[0].likes}
         }else{
            ctx.body={code:'1',msg:'出错'}
         }
                 } 
                 break;
                 case 'comments':
                 { sql = `select penName,content,S1.create_date,pic from tb_sp_comment S1 join tb_sp_user S2 on S1.transmitId = S2.id where chapterId="${chapterId}"`
                                   result = await query( sql )
                                    if(result){
            ctx.body={code:'0',msg:'成功',data:result}
         }else{
            ctx.body={code:'1',msg:'出错'}
         }
                               }
                  break;

             
         }
         

    }
    // write的某个章节的修改
    static async getEditChapter(ctx,next){
        // console.log('I come here')
        const {chapterId,bookId} = ctx.query;
        // let writerId = ctx.header.__sid;
        //当前章节
        let sql = `select content,title,bookName,pic,S1.num,S1.id as chapterId,S2.id as bookId,S2.isInvite from tb_sp_chapter S1 join tb_sp_book S2 on S1.bookId=S2.id where S1.id="${chapterId}"`;
        let result = await query( sql );
           
        if(result.length>0){
            ctx.body = {code:'0',msg:'成功',data:result[0]}
        }else{
            ctx.body = {code:'1',msg:'错误'}
        }   
    }
    // 作品页的首页
    static async getProducts(ctx,next){
        const {chapterId} = ctx.query;
        let writerId = ctx.header.__sid;
        let sql = `select S1.num,S2.bookName,S1.id,S2.pic from tb_sp_chapter S1 join tb_sp_book S2 on S1.bookId=S2.id where S1.writerId="${writerId}" and S1.status=1`;
        let sql2 = `select S1.num as chapterNum,S2.bookName,S1.id as chapterId,S2.id as bookId from tb_sp_chapter S1 join tb_sp_book S2 on S1.bookId=S2.id where S1.writerId="${writerId}" and S1.status=0`;//where S1.receiveWriterId="${writerId}" and S1.status=0
        let sql3 = `select S1.id,S1.bookName from tb_sp_book S1 join tb_sp_bookOpt S2 on S1.id=S2.bookId where S2.transmitId = "${writerId}"`
        let result = await query( sql );
        let result2 = await query( sql2 );
        let result3 = await query( sql3 );
        if(result&&result2&&result3){
        	ctx.body = {code:'0',msg:'成功',data:{editProd:result2,selfProd:result,collectProd:result3}}
        }else{
        	ctx.body = {code:'1',msg:'错误'}
        }
        // let sql = `select * from tb_sp_chapter as A inner join tb_sp_book as B where A.bookId` 	
    }

    // 获取可用作邀请的作品
    static async getInviteBooks(ctx,next){
        let writerId = ctx.header.__sid;
        let sql = `select chapterNum,bookName,S2.id from tb_sp_book S2 join tb_sp_chapter S1 on S1.bookId=S2.id where S1.writerId="${writerId}" and S2.isInvite=0 and S1.status=1 and S2.currentWriter = "${writerId}"`;
        let result = await query( sql );
        if(result){
           if(result.length>0){
            ctx.body = {code:'0',msg:'成功',data:result}
        }else if(result.length==0){
            ctx.body = {code:'0',msg:'暂无数据',data:[]}
        } 
    }else{
        ctx.body = {code:'1',msg:'出错'}
    }
        
        // let sql = `select * from tb_sp_chapter as A inner join tb_sp_book as B where A.bookId`   
    }
    // 获取可用作邀请的作品的对应章节
    static async getIBChapter(ctx,next){
        const {chapterId} = ctx.query;
        // let writerId = ctx.header.__sid;
        let sql = `select chapterNum from tb_sp_book where id = "${chapterId}"`;
        let result = await query( sql );
        if(result){
            ctx.body = {code:'0',msg:'成功',data:result[0]}
        }else{
            ctx.body = {code:'1',msg:'错误'}
        }
        // let sql = `select * from tb_sp_chapter as A inner join tb_sp_book as B where A.bookId`   
    }
    

    
    // 写作修改新增
    static async bookSave(ctx,next){
    	console.log('ctx.body',ctx.request.body)
    	let writerId = ctx.header.__sid;
        let updateType = ctx.request.body.type;//0新增书及第一章，1修改一个草稿
        let status = ctx.request.body.status;//0草稿，1发表
        if(updateType==0){
        let {bookTitle,chapterTitle,content,status,num} = ctx.request.body;
        num = parseInt(num)
        status = parseInt(status)
        let bookId  = GetuuId();
        let chapterId = GetuuId("time");
        // 书新增
        let sql1 = `insert into tb_sp_book (id,bookName,writerId,status,create_date,currentWriter) 
        values("${bookId}","${bookTitle}","${writerId}",${status},now(),"${writerId}");`;
        // 章节新增
        let sql2 = `insert into tb_sp_chapter (id,writerId,bookId,num,content,title,status,create_date)
        values("${chapterId}","${writerId}","${bookId}",${num},"${content}","${chapterTitle}",${status},now());`;
        let result1 = await query( sql1 );
        let result2 = await query( sql2 );
        if(result1&&result2){
        	ctx.body = {code:'0',msg:'发布成功'}
        }else{
        	ctx.body = {code:'1',msg:'报错'}
        }
        }else{
            console.log('i come to update chapter')
        	let {bookTitle,chapterTitle,content,status,num,bookId,chapterId} = ctx.request.body;
        	let sql2 = `update tb_sp_chapter set content="${content}",title="${chapterTitle}",status=${status} where id = "${chapterId}";`
            let result2 = await query( sql2 );
        	if(status==1&&result2){        		 
                 let sql1 = `update tb_sp_book set chapterNum=${num},isInvite=0 where id = "${bookId}"`;
                 let result1 = await query( sql1 );
                 if(result1){
                    ctx.body={code:'0',msg:'成功'}
                 }else{
                    ctx.body={code:'1',msg:'setBook失败'}
                 }
        	}else{
                ctx.body={code:'0',msg:'保存成功'}
            }

       

        }
       
        
    }

}


module.exports = BookController;