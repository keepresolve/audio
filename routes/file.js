var express = require("express");
var formidable = require("formidable");
var util = require("util");
var fs = require("fs");
let path = require("path");
var join = require("path").join;
var image = require("imageinfo");
var router = express.Router();
let { mp3 } = sequelize.models;
let isFirst = true;
/* GET users listing. */
router.post("/upload", async function(req, res, next) {
  // User.create({ username: 'fnord', job: 'omnomnom' })
  //创建表单上传
  var form = new formidable.IncomingForm();
  //设置编辑
  form.encoding = "utf-8";
  //设置文件存储路径
  form.uploadDir = path.resolve(__dirname + "/../public/mp3");
  //保留后缀
  form.keepExtensions = true;
  //设置单文件大小限制
  // form.maxFieldsSize = 2 * 1024 * 1024;
  //form.maxFields = 1000;  设置所以文件的大小总和
  form.multiples = true;
  form.parse(req, async function(err, fields, files) {
    if (!err) {
      try {
        let fileName = files["fileName"]["name"];

        let result = await mp3.create({
          fileName: fileName,
          path: "0",
          remotePath: `./mp3/${fileName}`
        });
        let sourcePath = files["fileName"]["path"];
        let targetPath = path.resolve(
          __dirname + `/../public/mp3/${result.id}.mp3`
        );
        fs.renameSync(sourcePath, targetPath);
        let update = await mp3.update(
          {
            path: targetPath,
            remotePath: `./mp3/${result.id}.mp3`
          },
          {
            where: { id: result.id }
          }
        );
      } catch (error) {
        return res.send({
          code: 501,
          info: error.message
        });
      }

      // fs.appendFileSync('public/mp3/mp3.json','public/mp3/'+ files["file/upload"]["name"])
      res.send({
        code: 200,
        info: "上传成功",
        files: util.inspect({ fields: fields, files: files })
      });
    } else {
      res.send({
        code: 501,
        info: "上传出错"
      });
    }
  });
});
router.get("/getfileSrc", function(req, res, next) {
  let fileNames = findSync("./public/mp3");
  console.log({ query: req.query });
  mp3.findAll().then(result => {
    // if(isFirst){
    //   result.map( async item=>{
    //     if(!fileNames.find(v=>path.extname(v)==path.extname(path.extname(item.path)))){
    //       await mp3.destroy({
    //         where:{
    //          id:item.id
    //        }
    //      })
    //      v=undefined
    //     }
    //   })
    //   for(let i =0 ; i++ ; i<result.length){
    //      if(result[i]){
    //         delete result[i]
    //      }
    //   }

    // 	isFirst=false
    // 	res.send(result);
    // }else{
    // 	res.send(result);
    // }
    res.send(result);
  });
});
router.get("/removefile", async function(req, res, next) {
  // console.log({query:req.query.removeList})
  try {
    for (let item of req.query.removeList) {
      await mp3.destroy({
        where: {
          id: item.id
        }
      });
    }
    res.send({ code: 200, info: "删除成功" });
  } catch (error) {
    res.send({ code: 500, info: error.message });
  }

  deleteFolder(req.query.removeList, req, res);
});
//获取文件目录下的所有文件名字
function findSync(startPath) {
  let result = [];
  function finder(path) {
    let files = fs.readdirSync(path);
    console.log({ findSync: files });
    files.forEach((val, index) => {
      let fPath = join(path, val);
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) result.push(fPath);
    });
  }
  finder(startPath);
  return result;
}
function deleteFolder(pathList, req, res) {
  var len = 0;
  var info = "文件删除成功;";
  pathList.map(v => {
    if (fs.existsSync(v)) {
      fs.unlink(v, function(err) {
        if (err) {
          res.send({ code: 401, info: err });
          return;
        }
        len++;
        console.log(v + "文件删除成功");
        if (len == pathList.length) {
          //   res.send({ code: 200, info: info });
        }
      });
    } else {
      info += v + "is not found;";
      console.log(v + "is not found");
      if (len == pathList.length) {
        // res.send({ code: 200, info: info });
      }
    }
  });
}

module.exports = router;
