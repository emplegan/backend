const db = require("../db/pool");
const dbConfig = require("../config/config").db;

let itemCategory = function(itemCategory){
    this.item_category_id=itemCategory.item_category_id
    this.code=itemCategory.code
    this.name=itemCategory.name
    this.user_id=itemCategory.user_id
    this.reg_date=itemCategory.reg_date
    this.last_update=itemCategory.last_update
};

