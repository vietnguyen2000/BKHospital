var express = require("express");
var validate = require("../validates/user.validate");
var router = express.Router();

var controller = require("../controllers/user.controller");

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", controller.create);

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
