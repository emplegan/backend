const db = require("../db/pool");
const dbConfig = require("../config/config").db;

let logs = function(logs)
{
        this.logs_id=logs.logs_id;
        this.create_date=logs.create_date;
        this.query_string=logs.query_string;
        this.table_name=logs.table_name;
};

logs.insertLogs = function(connection,newLogs,callback){
    let strQryLogs = "insert into logs_download (logs_id,create_date,query_string,table_name)" +
                     " values(?,?,?,?);"
    connection.query(strQryLogs,newLogs,(err,res)=>{
        if(err) callback(err,null);
        callback(null,res);
    })
}
module.exports = logs;