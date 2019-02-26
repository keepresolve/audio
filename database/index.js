// let { DB_CONFIG } = require('../config')
let Sequelize = require("sequelize");
// const sequelize = new Sequelize('caoshiyuan', 'root', '123456', {
//     host: '106.14.114.139',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
//     // 请参考 Querying - 查询 操作符 章节
//     operatorsAliases: false
// })
var sequelize = new Sequelize("caoshiyuan", "root", "123456", {
  dialect: "mysql",
  // 'dialectOptions': {
  //     charset: "utf8mb4",
  //     collate: "utf8mb4_unicode_ci",
  //     supportBigNumbers: true,
  //     bigNumberStrings: true
  // },
  host: "106.13.52.142",
  port: 3306,
  //解决中文输入问题
  define: {
    underscored: true,
    charset: "utf8mb4"
  }
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
require("./mp3")(sequelize, Sequelize);
require("./user")(sequelize, Sequelize);
sequelize.sync();
// const User = sequelize.define('mp3', {
//     username: Sequelize.STRING,
//     birthday: Sequelize.DATE
// })

// sequelize
//     .sync()
//     .then(() =>
//         User.create({
//             username: 'janedoe',
//             birthday: new Date(1980, 6, 20)
//         })
//     )
//     .then(jane => {
//         console.log(jane.toJSON())
//     })
module.exports = {
  sequelize
};
