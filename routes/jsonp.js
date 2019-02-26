var express = require("express");
var router = express.Router();
let { user } = sequelize.models;
/* GET users listing. */
router.post("/jsonp", function(req, res) {
  var _callback = req.query.callback;
  var _data = { email: "example@163.com", name: "jaxu" };
  if (_callback) {
    res.type("text/javascript");
    res.send(_callback + "(" + JSON.stringify(_data) + ")");
  } else {
    res.json(_data);
  }
});

module.exports = router;
