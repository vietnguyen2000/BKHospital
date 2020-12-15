const verifyToken = require("./helper.middleware");
import { ACCESS_TOKEN_SECRET } from "../config/.env";

export const isAuth = async (req, res, next) => {
  const tokenFromClient = req.headers["authorization"];

  if (typeof tokenFromClient !== "undefined") {
    try {
      const bearer = tokenFromClient.split(" ");
      const bearerToken = bearer[1];

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

      if (!check) {
        const messageError = "Unauthorized";
        return new Error("Error", err);
      }

      const decoded = await verifyToken(bearerToken, ACCESS_TOKEN_SECRET);
      // req.authorized_user = decoded;

      next();
    } catch (err) {
      return new Error("Error", err);
    }
  }
};