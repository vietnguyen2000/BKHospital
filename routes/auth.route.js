var express = require("express");
var controller = require("../controllers/auth.controller");

var router = express.Router();

router.get("/login", controller.login);

router.post("/login", controller.postLogin);

module.exports = router;



// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.render("landing");
// });

// module.exports = router;

