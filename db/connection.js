const db = require("./pool");

async function getConnection(callback){
    const connection = await db.getConnection();
    try{
        
    }catch(err){

    }
}