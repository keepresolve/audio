var express = require("express");
var router = express.Router();
let { user } = sequelize.models;
/* GET users listing. */
router.get("/register", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-type");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT,POST,GET,DELETE,OPTIONS,PATCH"
  );
  res.header("Access-Control-Max-Age", 1728000); //预请求缓存20天
  res.send({
    code: 301,
    info: [
      { task: "\u6d4b\u8bd5\u4efb\u52a1", seat: "abc(1003)" },
      { task: "\u6d4b\u8bd5\u4efb\u52a1", seat: "abc(1004)" }
    ]
  });
});

module.exports = router;
