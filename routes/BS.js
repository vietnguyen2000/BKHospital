const express = require("express");
const mysql = require("../conn");
var validate = require("../validates/user.validate");

const router = express.Router();
router.get("/", (req, res) => {
  res.render("BS/index");
});

router.get("/khambenhbacsibenhnhan", (req, res) => {
  var sql = "SELECT * FROM KhamBenh;";
  mysql.query(sql, (err, KhamBenh) => {
    if (err) throw err;
    sql = "SELECT * FROM KhoaDieuTri";
    mysql.query(sql, (err, TrieuChung) => {
      res.render("BS/khambenhbacsibenhnhan", { KhamBenh, TrieuChung });
    });
  });
});

router.post("/khambenhbacsibenhnhan", controller.create);

router.post("/create", validate.postCreate, controller.postCreate);

router.get("/:id", controller.get);

// function middleware1(req, res, next) {
//     console.log('middleware1');
//     next();
// }
// function middleware2(req, res, next) {
//     console.log('middleware2');
//     res.send('Hello');
// }
// router.get('/test', middleware1, middleware2)

module.exports = router;
