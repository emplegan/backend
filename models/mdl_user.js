const db = require("../db/pool");
const dbConfig = require("../config/config").db;
const logs = require("./mdl_logs");
const getData = require ('../db/sqlExecute').getData;
const sqlTrans = require ('../db/sqlExecute').sqlTrans;
const sqlTransaction = require ('../db/sqlExecute').sqlTransaction
const transaction = require ('../db/sqlExecute').transaction

let user = function(userData){
	this.user_id=userData.user_id;
	this.user_name=userData.user_name;
	this.password=userData.password;
	this.employee_id=userData.employee_id;
	this.user_group_id=userData.user_group_id;
	this.user_number=userData.user_number;
};

user.getAllUser = () => getData('select * from user',null);
user.getUserById = userid => getData('select * from user where user_id=?',userid);
user.getUserByUserName = username => getData('select * from user where user_name=?',username);

user.createUser = (newUser,newLogs,callback) =>{ 
    let values = [];
    let strQryUser = 'INSERT INTO user values (?,?,?,?,?,?);';
    values.push([strQryUser,newUser]);
    let strQryLogs="insert into logs_download (logs_id,create_date,query_string,table_name)" +
                 " values(?,?,?,?);";
    values.push([strQryLogs,newLogs]);

    // sqlTransaction(values)
    //     .then(result => callback(null,result))
    //     .catch(err => callback(err,null));
    
    sqlTransaction(values)
    //.then(result => console.log(result))
    .then(result => {
        callback(null,result);
        //console.log(result);
    })
    // .catch(err => console.log('error cuy'));
    .catch(err => {
        callback(err,null);
        //console.log('error cuy');
    });

    // await sqlTransaction(async connection=>{
    //     await connection.query(strQryUser,newUser);
    //     await connection.query(strQryLogs,newLogs);
    // })
    //sqlTransaction(values);
    // sqlTransaction()
    //     //.then(result => console.log(result))
    //     //.catch(err=> console.log(err));
    //     .then(result => callback(null,result))
    //     //.catch(err=> console.log(err));
    //     .catch(err => callback(err,null));
};

// user.getAllUser = async function(){
//     try{
//         const result = await new Promise((resolve,reject)=>{
//             db.getConnection((err,connection)=>{
//                 if(err) resolve(err);
//                 connection.query('select * from user',(err,res)=>{
//                     if (err) resolve(err);
//                     resolve(res);
//                     //console.log(connection.threadId);
//                     connection.release();
//                 })
//             })
//         })
//         return result;
//     }catch(error){
//         console.log(error);
//     }       
// }   


// user.getAllUser =function(result){
//     db.getConnection((err,connection)=>{
//         if(err){
// 			result(err, null);
//         }else{
//             connection.query('select * from user', function(err,res){
//                 if(err) {
//                     result(err,null);
//                 }
//                 else{ 
//                     result(null, res);
//                 }
//                 connection.release();
//             })
//         }
//     })
// }

// user.createUser = function(newUser,newLogs,result){
//     db.getConnection((err,connection)=>{
//         if(err) result(err,null);
//         connection.beginTransaction(err=>{
//             if(err) result(err,null);
//             let strQry = "INSERT INTO user values (?,?,?,?,?,?);"
//             connection.query(strQry,newUser,(err,res)=>{
//                 if(err){
//                     return connection.rollback(function () {
//                         result(err,null);
//                         connection.release();
//                     });
//                 }
//                 logs.insertLogs(connection,newLogs,(err,res)=>{
//                     if(err){
//                         return connection.rollback(function () {
//                             result(err,null);
//                         });
//                     }else{
//                         connection.commit(function (err) {
//                             if (err) {
//                                 return connection.rollback(function () {
//                                     result(err,null);
//                                 });
//                             }
//                             connection.release();
//                             //result(null, 'success');
//                         });
//                     }
//                 })
//             })
//         })
//     })
// }


user.updateUser= function (updateUser,newLogs,result){
    db.getConnection((err,connection)=>{
        if(err) result(err,null);
        connection.beginTransaction(err=>{
            if(err) result(err,null);
            let strQry = "update user set user_id=?,user_name=?"+
            ",password=?,employee_id=?,user_group_id=?,user_number=? where user_id=?;"
            connection.query(strQry,updateUser,(err,res)=>{
                if(err){
                    return connection.rollback(function () {
                        result(err,null);
                    });
                }
                let strQryLogs = "insert into logs_download (logs_id,create_date,query_string,table_name)" +
                                    " values(?,?,?,?);"
                connection.query(strQryLogs,newLogs,(err,res)=>{
                    if(err){
                        return connection.rollback(function(){
                            result(err,null);
                        }); 
                    }
                    connection.commit(function (err) {
                        if (err) {
                            return connection.rollback(function () {
                                result(err,null);
                            });
                        }
                        connection.release();
                        result(null, res.insertId);
                    });
                })
            })
        })
    })
}

module.exports = user;
