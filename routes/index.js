var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function (req, res, next) {
  if (req.query.password == "caoshiyuan") {
    res.send({ code: 200, info: "密码正确", src: "./dist-wp/bundle.js" })
  } else {
    res.send({ code: 301, info: "密码不对" })
  }

});
module.exports = router;
