const dotenv = require('dotenv');
dotenv.config();

const {
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_HOST_LOCAL,
    DB_USER_LOCAL,
    DB_PASSWORD_LOCAL,
} = process.env;

const dbconfigAzure = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: 3306,
    ssl: true,
    database:'hospital'
}

const dbconfigLocal = {
    host: DB_HOST_LOCAL,
    user: DB_USER_LOCAL,
    password: DB_PASSWORD_LOCAL,
    database: 'hospital'
}
if (process.argv.includes("--localDatabase")){
    console.log("Database local selected");
    dbconfig = dbconfigLocal;
}
else{
    console.log("Database Azure selected");
    dbconfig = dbconfigAzure;
}
module.exports = {
    port: PORT,
    dbconfig: dbconfig,
}