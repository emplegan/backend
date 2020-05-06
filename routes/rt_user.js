const express = require('express');
var router = express.Router();
const user = require("../controllers/ctl_user");

//get
router.get('/',user.getAllUser);
router.get('/userid/:userid', user.getUserById);
router.get('/username/:username', user.getUserByUserName);

//post/insert user
router.post('/insert/',user.createUser);

//patch/update user
router.patch('/update/',user.updateUser);

module.exports = router;