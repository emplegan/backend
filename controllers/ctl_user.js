const user = require('../models/mdl_user');
const createUser = require('../models/mdl_user').createUser;
const Id = require('../utils/generateId');

exports.getAllUser = async(req,res)=>{
    try{
        //const result = await user.getAllUser();
        //console.log(result);
        res.json(await user.getAllUser());
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
};

exports.getUserById = async function(req,res){
    try{
        res.json(await user.getUserById(req.params.userid));
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
};

exports.getUserByUserName = async function(req,res){
    try{
        res.json(await user.getUserByUserName(req.params.username));
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
};

exports.createUser =async function(req,res){
    let newUser = Object.values(new user(req.body));
    newUser[0] =Id.generateId();
    let dataUser = new user(req.body)
    let logId =Id.generateId();
    let strSqlLogs = "insert into user values("+newUser[0]+
                ",'"+dataUser.user_name+"','"+dataUser.password+"',"+dataUser.employee_id+
                ","+dataUser.user_group_id+","+dataUser.user_number+")";
    let newLogs=[
        logId,
        new Date(),
        strSqlLogs,
        'user'
    ];
    const data = await user.getUserByUserName(dataUser.user_name);
    if(data.length==0){
        createUser(newUser,newLogs,(err,result)=>{
            if(!err){
                res.send(result);
                //res.send('Save data success');
                console.log(result);
            }else{
                console.log(err)
                res.sendStatus(500);
            }
        });
    }else {
        res.send("Username already exist");
    }
};
// exports.createUser = async function(req,res){
//     try{
//         let newUser = Object.values(new user(req.body));
//         newUser[0] =Id.generateId();
//         let dataUser = new user(req.body)
//         let logId =Id.generateId();
//         let strSqlLogs = "insert into user values("+newUser[0]+
//                     ",'"+dataUser.user_name+"','"+dataUser.password+"',"+dataUser.employee_id+
//                     ","+dataUser.user_group_id+","+dataUser.user_number+")";
//         let newLogs=[
//             logId,
//             new Date(),
//             strSqlLogs,
//             'user'
//         ];
//         const data = await user.getUserByUserName(dataUser.user_name);
//         if(data.length==0){
//             res.send("Username available");
//         }else {
//             res.send("Username already exist");
//         }

//         // try{
//         //     const data = await user.getUserByUserName(dataUser.user_name);
//         //     if(data.length==0){
//         //         try{
//         //             await user.createUser(newUser,newLogs);
//         //             res.send("Save data success");
//         //         }catch(err){
//         //             res.sendStatus(500);
//         //         }
//         //     }else{
//         //         res.send("Username already exist");
//         //     }
//         // }catch(err){
//         //     console.log(err);
//         //     res.sendStatus(500);
//         // }
//     }catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }
// };


exports.updateUser = function(req,res){

}
// exports.getAllUser = function(req, res) {
//     const result = user.getAllUser();
//     result
//     .then(data => res.json(data))
//     .catch(err => console.log("Err in showing all user: " + err));
// };

// exports.getAllUser = function(req, res) {
//     user.getAllUser(function(err, data) {
//         if (err){
//             console.log('Error :',err);
//             res.send(err);
//         }else{
//             console.log(data);
//             res.send(data);
//         }
//     });
// };

// exports.createUser = function(req,res){
//     let newUser = Object.values(new user(req.body));
//     newUser[0] =Id.generateId();
//     let dataUser = new user(req.body)
//     let logId =Id.generateId();

//     let strSqlLogs = "insert into user values("+newUser[0]+
//                     ",'"+dataUser.user_name+"','"+dataUser.password+"',"+dataUser.employee_id+
//                     ","+dataUser.user_group_id+","+dataUser.user_number+")";
//     let newLogs=[
//         logId,
//         new Date(),
//         strSqlLogs,
//         'user'
//     ];
//     getUserName(dataUser.user_name,i=>{
//         if(i===0){
//             if (!dataUser.user_name || !dataUser.password){
//                 res.status(400).send({ error:true, message: 'Please provide user name and passowrd' });
//             }else {
//                 user.createUser(newUser,newLogs,function(err, data) {
//                     if (err){
//                         res.send(err);
//                         console.log(err);
//                     }else{
//                         res.send("Save data success");
//                     }
//                 });
//             }
//         }else{
//             res.send("Username already exist");
//         }
//     });
// };

// exports.updateUser = function(req,res){
//     let updateUser=Object.values(new user(req.body));
//     let dataUser =new user(req.body);
//     updateUser.push(updateUser[0]);
//     let logId =Id.generateId();

// };