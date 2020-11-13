const mysql = require('mysql');
const config = require('./config');
const conn = mysql.createConnection(config.dbconfig);
conn.connect(err=>{
    if (err){
        console.log("FAILED TO CONNECT TO DATABASE!");
        throw(err);
    }
    else{
        console.log("Database Connected!");
    }
})
module.exports = conn;