const { query } = require('../mysql/mysql')
const uuidv1 = require('uuid/v1');

function GetuuId(){
		let temp = uuidv1();
		temp = temp.split('-').join('');
		return temp;
}
class BookController{
	// 生成uuid
	
	static async pageBooks(ctx,next){
        
    }
    static async getChapter(ctx,next){
        const {chapterId} = ctx.query;
        // let sql = `select * from tb_sp_chapter as A inner join tb_sp_book as B where A.bookId` 	
    }
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
    static async bookSave(ctx,next){
    	console.log('ctx.body',ctx.request.body)
    	let writerId = ctx.header.__sid;
        let updateType = ctx.request.body.type;//0新增书及第一章，1修改一个草稿，2新增某本书的一个章节
        let status = ctx.request.body.status;//0草稿，1发表,2待新增
        if(updateType==0){
        const {bookTitle,chapterTitle,content,status,num} = ctx.request.body;
        let bookId  = GetuuId();
        let chapterId = GetuuId();
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