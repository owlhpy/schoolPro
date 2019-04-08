const mysql = require('mysql')
// 创建数据池
const pool  = mysql.createPool({
  host     : 'localhost',   // 数据库地址
  user     : 'root',    // 数据库用户
  password : '123',   // 数据库密码
  database : 'school'  // 选中数据库
})
//封装异步query查询方法
let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }