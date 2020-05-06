var express = require('express');
var router = express.Router();
//const user = require("../controllers/ctl_user");
/* GET home page. */

router.get('/', function(req,res) {
    res.send("Index Page")
});
module.exports = router;