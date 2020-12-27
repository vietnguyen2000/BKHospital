const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();

const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_HOST_LOCAL,
  DB_USER_LOCAL_ANDANH,
  DB_PASSWORD_LOCAL_ANDANH,
  DB_USER_LOCAL_BENHNHAN,
  DB_PASSWORD_LOCAL_BENHNHAN,
  DB_USER_LOCAL_BACSI,
  DB_PASSWORD_LOCAL_BACSI,
  DB_USER_LOCAL_QUANLY,
  DB_PASSWORD_LOCAL_QUANLY,
  ACCESS_TOKEN_SECRET,
} = process.env;
console.log(DB_HOST_LOCAL,
  DB_USER_LOCAL_ANDANH,
  DB_PASSWORD_LOCAL_ANDANH,
  DB_USER_LOCAL_BENHNHAN,
  DB_PASSWORD_LOCAL_BENHNHAN,
  DB_USER_LOCAL_BACSI,
  DB_PASSWORD_LOCAL_BACSI,
  DB_USER_LOCAL_QUANLY,
  DB_PASSWORD_LOCAL_QUANLY);

const dbconfigAzure = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: 3306,
  ssl: true,
  database: "hospital",
  dateStrings: true
};

const dbconfigLocalAnDanh = {
  host: DB_HOST_LOCAL,
  user: DB_USER_LOCAL_ANDANH,
  password: DB_PASSWORD_LOCAL_ANDANH,
  database: "hospital",
  ssl: true,
  dateStrings: true
};
const dbconfigLocalBenhNhan = {
  host: DB_HOST_LOCAL,
  user: DB_USER_LOCAL_BENHNHAN,
  password: DB_PASSWORD_LOCAL_BENHNHAN,
  database: "hospital",
  ssl: true,
  dateStrings: true
};
const dbconfigLocalBacSi = {
  host: DB_HOST_LOCAL,
  user: DB_USER_LOCAL_BACSI,
  password: DB_PASSWORD_LOCAL_BACSI,
  database: "hospital",
  ssl: true,
  dateStrings: true
};
const dbconfigLocalQuanLy = {
  host: DB_HOST_LOCAL,
  user: DB_USER_LOCAL_QUANLY,
  password: DB_PASSWORD_LOCAL_QUANLY,
  database: "hospital",
  ssl: true,
  dateStrings: true
};
function selectDbconfig() {
  if (process.argv.includes("--localDatabase")) {
    console.log("Database local selected");
    console.log(session.role);
    if (session.role)
      dbconfig =
        session.role == "AnDanh"
          ? dbconfigLocalAnDanh
          : session.role == "BenhNhan"
          ? dbconfigLocalBenhNhan
          : session.role == "BacSi"
          ? dbconfigLocalBacSi
          : dbconfigLocalQuanLy;
    else dbconfig = dbconfigLocalAnDanh;
  } else {
    console.log("Database Azure selected");
    dbconfig = dbconfigAzure;
  }
}

module.exports = {
  port: PORT,
  dbconfig: dbconfigLocalAnDanh,
  dbconfigBenhNhan: dbconfigLocalBenhNhan,
  dbconfigBacSi: dbconfigLocalBacSi,
  dbconfigQuanLy: dbconfigLocalQuanLy,
};
