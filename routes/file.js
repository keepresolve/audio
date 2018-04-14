var express = require('express');
var formidable = require('formidable');
var util = require('util');
var fs=require("fs")
var join =require("path").join
var image = require("imageinfo");
var router = express.Router();
/* GET users listing. */
router.post('/upload', function(req, res, next) {
		    //创建表单上传
		    var form = new formidable.IncomingForm();
		    //设置编辑
		    form.encoding = 'utf-8';
		    //设置文件存储路径
		    form.uploadDir = "public/mp3";
		    //保留后缀
		    form.keepExtensions = true;
		    //设置单文件大小限制    
		    // form.maxFieldsSize = 2 * 1024 * 1024;
		    //form.maxFields = 1000;  设置所以文件的大小总和
		    form.multiples = true;
            
		    form.parse(req, function(err, fields, files) {
				    if(!err){
				    	fs.rename(files["file/upload"]["path"], 'public/mp3/'+ files["file/upload"]["name"]);
				    	// fs.appendFileSync('public/mp3/mp3.json','public/mp3/'+ files["file/upload"]["name"])
				    	res.send({code:200,info:"上传成功",files:util.inspect({fields: fields, files: files})});
				    }else{
				    	res.send({
				    		code:501,
				    		info:"上传出错"
				    	})
				    }
		      
		       })
    });
	router.get('/getfileSrc',function(req, res, next){
		console.log({query:req.query})
		let fileNames=findSync('./public/mp3');
		res.send(fileNames)
	})
	function findSync(startPath) {
	  let result=[];
		function finder(path) {
		let files=fs.readdirSync(path);
		files.forEach((val,index) => {
		let fPath=join(path,val);
		let stats=fs.statSync(fPath);
		if(stats.isDirectory()) finder(fPath);
		if(stats.isFile()) result.push(fPath);
		});

		}
		finder(startPath);
		return result;
}

module.exports = router;