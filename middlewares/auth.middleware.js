const{ generateToken, verifyToken} = require("./helper.middleware");
const session = require('express-session');

module.exports ={
isAuth: (req, res, next) => {
  // const tokenFromClient = session.jwt;
  // !Bệnh nhan
  const tokenFromClient = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJIb1ZhVGVuTG90IjoiTmd1eWVuIFZhbm4iLCJUZW4iOiJCaWVuMiIsIkVtYWlsIjoiYkBnbWFpbC5jb20iLCJTRFQiOiIwMTIzNDU2NzgwIiwiR2lvaVRpbmgiOiJOYW0iLCJOZ2F5U2luaCI6IjIwMDAtMDEtMTBUMTc6MDA6MDAuMDAwWiIsIkRhblRvYyI6IktpbmgiLCJNYUJlbmhOaGFuIjoxLCJMb2FpIjoiS2jDtG5nIiwiUm9sZSI6IkJlbmhOaGFuIiwiaWF0IjoxNjA4MDg1ODE4fQ.Cfnz5dJyDf1O7lsgqnjx_jjsVCUkbwTKkPjnUCf_P0w";

  // ! Bác sĩ
  const tokenFromClient = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJIb1ZhVGVuTG90IjoiSHV5bmggTmhhdCIsIlRlbiI6Ik5hbTExIiwiRW1haWwiOiJuYW1AaHV5bmgiLCJTRFQiOiIwMzYyNDE2MDkwIiwiR2lvaVRpbmgiOiJO4buvIiwiTmdheVNpbmgiOiIyMDAwLTEwLTIwVDE3OjAwOjAwLjAwMFoiLCJEYW5Ub2MiOm51bGwsIk1hTmhhblZpZW4iOjExLCJNYUtob2FEaWV1VHJpIjozLCJUZW5LaG9hIjoiQSZFIiwiUm9sZSI6IkJhY1NpIiwiaWF0IjoxNjA4MDg1ODk3fQ.xQBdYOOsT7BTNjrzIaLhVrKnywGQd0XTqHOZnC6Wrxw";

  //! Quản lý
  // const tokenFromClient = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJIb1ZhVGVuTG90IjoiTmd1eWVuIEhvYW5nIiwiVGVuIjoiVmlldDEiLCJFbWFpbCI6InZpZXRAbmd1eWVuIiwiU0RUIjoiMDcwNzMwNzc0OCIsIkdpb2lUaW5oIjoiTmFtIiwiTmdheVNpbmgiOiIyMDAwLTA0LTIwVDE3OjAwOjAwLjAwMFoiLCJEYW5Ub2MiOm51bGwsIk1hUXVhbkx5IjoxLCJNYU5oYW5WaWVuIjoxLCJNYUtob2FEaWV1VHJpIjoxLCJUZW5LaG9hIjoiQ29tcHV0ZXIgU2NpZW5jZSIsIlJvbGUiOiJRdWFuTHkiLCJpYXQiOjE2MDgwNDYxNTN9.8XEo5MLG1yw8EBJp26OuBW6boOcAkKZDeISGEFEMJXA";
  if (tokenFromClient) {
    try {
      // const bearer = tokenFromClient.split(" ");
      // const bearerToken = bearer[1];

      // const check = await Token.find({ accessToken: bearerToken });

      // -------------------------  IDEA -------------------------
      // ---------------------CREATE TABLE Token: AccessToken: varchar(1000)------------------

      // --------------       TUI LẤY TOKEN TỪ DATABASE VÀ GÁN VÀO RESULT ---------------------
      // let result;
      // var sql = "SELECT * FROM Token;";
      //mysql.query(sql, (err, tokens) => {
      // if (err) throw err;
      // result = tokens;
      // });

      // ---------------------------------------------------------------------------------------

      //-----------------     TUI CHECK RESULT XEM CÓ bearerToken không -------------------
      // const check = result.includes(bearerToken)

      // if (!check) {
      //   const messageError = "Unauthorized";
      //   return new Error("Error", err);
      // }

      const decoded =  verifyToken(tokenFromClient, process.env.ACCESS_TOKEN_SECRET);
      decoded.then((result)=>{
        req.user = result;
        res.locals.user = result;
        req.isLoged = true;
        res.locals.isLoged= true;
        req.role = result.Role;
        res.locals.role = result.Role;
        // console.log(req.user);
        next();
      })      
    } catch (err) {
      return new Error("Error", err);
    }
  }
  else{
    let result = {
      Role: "AnDanh"
    };
    req.user = result;
    req.isLoged = false;
    res.locals.isLoged= false;
    req.role = result.Role;
    res.locals.role = result.Role;
    next();
  }
}
}