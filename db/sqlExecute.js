//import {pool} from './pool';
const pool = require('./pool');
const util = require('util');

function getConnection(){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err) reject (err);
            resolve(connection);
        })
    })
}

function beginTransaction(connection){
    return new Promise((resolve,reject)=>{
        connection.beginTransaction(err=>{
            if(err) reject(err);
            resolve(connection);
        })
    })
}

function rollBack(connection){
    return new Promise((resolve,reject)=>{
        connection.rollback(err => {
            if(err) reject(err);
            resolve(connection);
        });
    })
}
function commitTransaction(connection){
    return new Promise((resolve,reject)=>{
        connection.commit(err=>{
            if (err) {
                connection.rollback(function () {
                    reject(false);
                });
            }
            resolve(true);
        })
    })
}

// const getData = async(strQry,values)=>{
//     const connection = await getConnection();

// }

// const getData = async (strQry,values)=>{
//     try{
//         const connection = await getConnection();
        
//     }catch (err) {
//         console.log(err)
//         return(err);
//     }
//     // return new Promise(async(resolve,reject)=>{
//     //     try{
//     //         const connection = await getConnection();
//     //         connection.query(strQry,values,(err,result)=>{
//     //             if(err) reject(err);
//     //             resolve(result);
//     //             connection.release();
//     //         });
//     //     }catch(err){
//     //         reject(err);
//     //     }
//     //     finally{
//     //         connection.release();
//     //     }
//     // });
// }

const query = (connection,strQry,values)=>{
    return new Promise((resolve,reject)=>{
        connection.query(strQry,values,(err,result)=>{
            if(err) reject(err);
            resolve(result);
        });
    })
}

const a = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('resolve of a()')
        },200);
    })
};

const b = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('resolve of b()')
        },100);
    })
};

const c = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('resolve of c()')
        },300);
    })
};

// const sqlTransaction = async()=>{
//     try {
//         var resultA = await a();
//         var resultB = await b();
//         var resultC = await c();

//         return new promise(resolve=>{
//             resolve({values :[resultA,resultB,resultC]});
//         });
//     }catch(err) {
//         throw err;
//     }
// }

const sqlTransaction = async values=>{
    return new Promise(async (resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err);
            try {
                const result = [];
                connection.beginTransaction(err=>{
                    if(err) reject(err);
                    connection.query(values[0][0],values[0][1],err=>{
                        if(err){
                            connection.rollback(function () {
                                reject(err);
                            });
                        }
                        result.push('1 Rows Affect')
                        connection.query(values[1][0],values[1][1],err=>{
                            if(err){
                                connection.rollback(function () {
                                    reject(err);
                                });
                            }
                            result.push('2 Rows Affect :',2)
                            connection.commit(err=>{
                                if (err) {
                                    connection.rollback(function () {
                                        reject(err);
                                    });
                                }
                                resolve(result);
                                connection.release();
                            });
                        });
                    });

                    // for(var i=0;i<values.length;i++){
                    //     query(connection,values[i][0],values[i][1])
                    //         .then(res=> {
                    //             result.push('Rows Affect :',i)
                    //         })
                    //         .catch(err=>{
                    //             connection.rollback(function () {
                    //                 reject(err);
                    //                 throw err;
                    //             });
                    //         });
                    // }
                    
                    // connection.commit(err=>{
                    //     if (err) {
                    //         connection.rollback(function () {
                    //             reject(err);
                    //         });
                    //     }
                    //     resolve(result);
                    //     connection.release();
                    // });


                    // for(var i=0;i<values.length;i++){
                    //     connection.query(values[i][0],values[i][1],err=>{
                    //         if(err){
                    //             try{
                    //                 console.log(err);
                    //                 connection.rollback(function () {
                    //                     reject(err);
                    //                 });
                    //             }catch(err){
                    //                 throw err;    
                    //             }
                    //         }
                    //         result.push(['Rows Affect :',i])
                    //     });
                    // }
                    // connection.commit(err=>{
                    //     if (err) {
                    //         connection.rollback(function () {
                    //             reject(err);
                    //         });
                    //     }
                    //     resolve(result);
                    //     connection.release();
                    // });
                })
            }catch (err){
                throw err;
            }
        })
    })
}

/** See documentation from original answer */`enter code here`
async function transaction(values) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const queryPromises = [];

        for(var i=0;i<values.length;i++){
            // queryPromises.push(connection.query(values[i][0],values[i][1]))
            await connection.query(values[i][0],values[i][1]);
        }
        queryPromises.push(i+1,' Rows Affect')
        //const results = await Promise.all(queryPromises);

        // connection.commit(err=>{
        //     if (err) {
        //         connection.rollback(function () {
        //             throw err;
        //         });
        //     }
        //     //resolve(result);
        //     connection.release();
        // });
        await connection.commit()
       //  await connection.commit();
        await connection.release();
        //result.push(i+1,': Affected Rows');
        return queryPromises;
        // return new Promise(resolve=>{
        //     resolve(result);
        // })
    } catch (err) {
        await connection.rollBack();
        //return Promise.reject(err)
        throw err;
        //return Promise.reject(err)
        //throw err;
    }
}

// const sqlTransaction = async values => {
//     const connection = await getConnection();
//     await connection.beginTransaction();
//     try {
//         for(var i=0;i<values.length;i++){
//             await connection.query(values[i][0],values[i][1]);
//         }
//         await connection.commit();
//         return new Promise(resolve=>{
//             resolve('Save data success');
//         });
//     }catch(err) {
//         console.log(err);
//         await connection.rollBack();
//         throw err;
//     }finally {
//         connection.release();
//     }
// }

// const queryTransaction = async(values)=>{
//     return new Promise((resolve,reject)=>{
//         await sqlTransaction( async connection=>{
//             for(var i=0;i<values.length;i++){
//                 await query(connection,values[i][0],values[i][1]);
//             }
//         })
//     })
// }

// const sqlTransaction = async (values) => {
//     const connection = await getConnection();
//     return new Promise(async(resolve,reject)=>{
//         await beginTransaction(connection);
//         for(var i=0;i<values.length;i++){
//             await query(connection,values[i][0],values[i][1]);
//         }
//         await commitTransaction()
//             .then (response => {
//                 resolve('Save data success');
//                 connection.release();
//             })
//             //.catch (err => reject(err)); 
//     })
// }

// const sqlTransaction = (values)=>{
//     return new Promise(async(resolve,reject)=>{
//         try{
//             const connection = await getConnection();
//             //await beginTransaction(connection);
//             // for(var i=0;i<values.length;i++){
//             //     console.log(values[i][0]);
//             //     console.log(values[i][1]);
//             //     //await query(connection,values[i][0],values[i][1]);
//             // }
//         }catch(err){
//             //await rollBack();
//             reject(err);
//         }finally{
//             connection.release();
//         }
//     });
// }

//GetData
const getData = (strQry,values)=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err) reject(err);
            connection.query(strQry,values,(err,result)=>{
                if(err) reject(err);
                resolve(result);
                connection.release();
            });
        });
    });
}

// const getData = (strQry,values)=>{
//     pool.getConnection()
//         .then(conn=>{
//             const result = conn.query(strQry,values);
//             conn.release();
//             return result;
//         })
//         // .then(result=>{
//         //     //console.log(result[0]);
//         // })
//         .catch(err=>{
//             throw err;
//         });
// }

//sql transaction
const sqlTrans = function (values){
    return new Promise( function (resolve,reject){
        pool.getConnection( function (err,connection){
            if(err)reject(err);
                connection.beginTransaction(err=>{
                if(err) reject(err);
                connection.query(values[0][0],values[0][1], function (err,result){
                    if(err){
                        console.log(err);
                        connection.rollback(function () {
                            reject(err);
                        });
                    };
                    connection.query(values[1][0],values[1][1], function (err,result){
                        if(err){
                            console.log(err);
                            connection.rollback(function () {
                                reject(err);
                            });
                        };
                        connection.commit(err=>{
                            if (err) {
                                connection.rollback(function () {
                                    reject(err);
                                });
                            }
                            resolve(result);
                            connection.release();
                        });
                    });   
                });
                // for(var i=0;i<values.length;i++){
                //     connection.query(values[i][0],values[i][1],(err,result)=>{
                //         if(err){
                //             console.log(err);
                //             connection.rollback(function () {
                //                 reject(err);
                //             });
                //         };
                //     });
                // }
                // connection.commit(err=>{
                //     if (err) {
                //         connection.rollback(function () {
                //             reject(err);
                //         });
                //     }
                //     resolve('Save data success');
                //     connection.release();
                // });
            })
        });
    });
}

// async function sqlTransaction (callback) {
//     const connection = await pool.getConnection();
//     await connection.beginTransaction();
//     try {
//         await callback(connection);
//         await connection.commit();

//     } catch (err) {
//         await connection.rollback();
//         // Throw the error again so others can catch it.
//         throw err;

//     } finally {
//         connection.release();
//     }
// }


// /** See documentation from original answer */`enter code here`
//  const sqlTransaction = async function (values) {
//     // if (queries.length !== queryValues.length) {
//     //     return Promise.reject(
//     //         'Number of provided queries did not match the number of provided query values arrays'
//     //     )
//     // }
//     const connection = await pool.getConnection({ transaction: true });
//     try {
//         await connection.beginTransaction()
//         const queryPromises = []

//         for(var i=0;i<values.length;i++){
//             queryPromises.push(connection.query(values[i][0],values[i][1]))
//         }
//         const results = await Promise.all(queryPromises)
//         await connection.commit()
//         await connection.release();
//         return results
//     } catch (err) {
//         await connection.rollback()
//         //await connection.end()
//         return Promise.reject(err)
//     }
// }

module.exports = {getData,sqlTrans,sqlTransaction,transaction};

