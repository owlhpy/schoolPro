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
	
	
	static async pageBooks(ctx,next){
        
    }
    // 某本书的详情页
    static async getBook(ctx,next){
       const {bookId} = ctx.query;
       
        let sql2 = `select bookId,bookName,chapterNum,A.id,isDelete,isShow,num,pic,title,A.writerId from tb_sp_chapter A join tb_sp_book B on A.bookId=B.id where A.bookId = "${bookId}"`
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
    // 某个章节的详情页
    static async getChapter(ctx,next){
    	console.log('I come here')
       const {chapterId} = ctx.query;
        // let writerId = ctx.header.__sid;
        //当前章节
        let sql = `select * from tb_sp_chapter S1 join tb_sp_book S2 on S1.bookId=S2.id where S1.id="${chapterId}"`;
        let result = await query( sql );
        let bookId = result[0].bookId;
        let userId = result[0].writerId;
        let sql2 = `select * from tb_sp_chapter where bookId = "${bookId}"`
        let result2 = await query( sql2 );
        let sql3 = `select * from tb_sp_user where id="${userId}"`;
        let result3 = await query( sql3 );
        console.log('result3',result3)   
        if(result.length>0&&result2.length>0){
        	ctx.body = {code:'0',msg:'成功',data:{bookMsg:result2,chapterMsg:result[0],userMsg:result3[0]}}
        }else{
        	ctx.body = {code:'1',msg:'错误'}
        }	
    }
    // 作品页的首页
    static async getProducts(ctx,next){
        const {chapterId} = ctx.query;
        let writerId = ctx.header.__sid;
        let sql = `select S1.num,S2.bookName,S1.id,S2.pic from tb_sp_chapter S1 join tb_sp_book S2 on S1.bookId=S2.id where S1.writerId="${writerId}"`;
        let result = await query( sql );
        if(result){
        	ctx.body = {code:'0',msg:'成功',data:result}
        }else{
        	ctx.body = {code:'1',msg:'错误'}
        }
        // let sql = `select * from tb_sp_chapter as A inner join tb_sp_book as B where A.bookId` 	
    }

    // 获取可用作邀请的作品
    static async getInviteBooks(ctx,next){
        const {chapterId} = ctx.query;
        let writerId = ctx.header.__sid;
        let sql = `select S2.chapterNum,S2.bookName,S2.id from tb_sp_chapter S1 join tb_sp_book S2 on S1.bookId=S2.id where S1.writerId="${writerId}"`;
        let result = await query( sql );
        if(result){
            ctx.body = {code:'0',msg:'成功',data:result}
        }else{
            ctx.body = {code:'1',msg:'错误'}
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
        let updateType = ctx.request.body.type;//0新增书及第一章，1修改一个草稿，2新增某本书的一个章节
        let status = ctx.request.body.status;//0草稿，1发表,2邀请中章节的status
        if(updateType==0){
        const {bookTitle,chapterTitle,content,status,num} = ctx.request.body;
        let bookId  = GetuuId();
        let chapterId = GetuuId("time");
        // 书新增
        let sql1 = `insert into tb_sp_book (id,bookName,writerId,status,create_date) 
        values("${bookId}","${bookTitle}","${writerId}","${status}",now());`;
        // 章节新增
        let sql2 = `insert into tb_sp_chapter (id,writerId,bookId,num,content,title,status,create_date)
        values("${chapterId}","${writerId}","${bookId}","${num}","${content}","${chapterTitle}","${status}",now());`;
        let result1 = await query( sql1 );
        let result2 = await query( sql2 );
        if(result1&&result2){
        	ctx.body = {code:'0',msg:'发布成功'}
        }else{
        	ctx.body = {code:'1',msg:'报错'}
        }
        }else if(updateType==2){
        	let {bookTitle,chapterTitle,content,status,num,bookId} = ctx.request.body;
        	let chapterId = GetuuId();
        	let sql2 = `insert into tb_sp_chapter (id,writerId,bookId,num,content,title,status,create_date)
                 values("${chapterId}","${writerId}","${bookId}","${num}","${content}","${chapterTitle}","${status}",now());`;
                 let result2 = await query( sql2 );
        	if(status==1&&result2){        		 
                 let sql1 = `update tb_sp_book set num=num+1 where id = "${bookId}"`;
                 let result1 = await query( sql1 );
        	}
       

        }
       
        
    }

}


module.exports = BookController;