var fs = require("fs");
var static = require('node-static');

var file = new static.Server('./dist');
const options = {
    key: fs.readFileSync('./emicmh.com.key'),
    cert: fs.readFileSync('./emicmh.com.cer')
};
require('https').createServer(options, function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(3002, function () {
    console.log("listen port at 3002 url:https://localhost:3002")
});