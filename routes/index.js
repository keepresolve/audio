var express = require("express");
var router = express.Router();
var nodemail = require("./email");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/login", function(req, res, next) {
  if (req.query.password == "caoshiyuan") {
    console.log(req.header);
    res.send({
      code: 200,
      info: "密码正确",
      src: ["./dist/index.js", "./dist/mian.css"]
    });
  } else {
    res.send({ code: 301, info: "密码不对" });
  }
});
router.post("/mails", nodemail.sendmail);
module.exports = router;
