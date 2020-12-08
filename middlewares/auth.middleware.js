
const verifyToken = require("./helper.middleware");
import { Token } from "../common/model/token.model";
import { ACCESS_TOKEN_SECRET } from "../config/.env";
// import { error } from "../common/service/response.service";

export const isAuth = async (req, res, next) => {
  const tokenFromClient = req.headers["authorization"];

  if (typeof tokenFromClient !== "undefined") {
    try {
      const bearer = tokenFromClient.split(" ");
      const bearerToken = bearer[1];

      const check = await Token.find({ accessToken: bearerToken });
      if (check.length == 0) {
        const messageError = "Unauthorized";
        return new Error("Error", err);
        // return error(res, messageError, 401);
      }

      const decoded = await verifyToken(bearerToken, ACCESS_TOKEN_SECRET);
      req.authorized_user = decoded;

      next();
    } catch (err) {
      return new Error("Error", err);
      //   return error(res, err);
    }
  }

  // return res.status(403).send({
  //   message: "No token provided",
  // });
};
