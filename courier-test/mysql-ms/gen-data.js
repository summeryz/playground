var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.99.100',
  user     : 'root',
  password : 'root',
  port     : '3307',
  database : 'master-test'
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
// var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];

batchInsert();

closeConn(connection);

function batchInsert() {
    var  addSql = 'INSERT INTO users(name,content,age) VALUES(?,?,?)';

    for (var i = 0; i < 1; i++) {
        var  addSqlParams = ['person-' + i, 'content-' + i, 12 + i];
        connection.query(addSql, addSqlParams, function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }

            console.log('--------------------------INSERT----------------------------');
            //console.log('INSERT ID:',result.insertId);        
            console.log('INSERT ID:',result);        
            console.log('-----------------------------------------------------------------\n\n');  
        });
    }
}

function closeConn (conn) {
    conn.end((err)=> {
        if(err){
            console.log('mysql关闭失败:${err}!');  
        }else{
            console.log('mysql关闭成功!');  
        }
    });
}