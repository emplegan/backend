//// using mysql
//// -------------------------------------------------------------------------
const dbConfig = require("../config/config");
// var mysql = require("mysql");
var mysql = require("mysql2");
//var mysql = require('promise-mysql2');
//var mysql = require('mysql2/promise');

////poolConnection
const pool = mysql.createPool({ 
  host: dbConfig.db.host,
  port: dbConfig.db.port,
  user: dbConfig.db.username,
  password: dbConfig.db.password,
  database: dbConfig.db.database,
  connectionLimit: dbConfig.db.connectionLimit
});

// pool.getConnection((err, connection) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('Database connection was closed.')
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('Database has too many connections.')
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.error('Database connection was refused.')
//         }
//     }
//     console.log('Database connection status :',connection.state);
//     if (connection) connection.release()
//     //return connection;
//     return;
// })

module.exports = pool;

