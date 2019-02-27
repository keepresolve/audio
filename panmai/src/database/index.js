const Sequelize = require('sequelize')
var path = require('path')

async function createModel() {
    const sequelize = new Sequelize('caoshiyuan', 'root', '123456', {
        dialect: 'mysql',
        // 'dialectOptions': {
        //     charset: "utf8mb4",
        //     collate: "utf8mb4_unicode_ci",
        //     supportBigNumbers: true,
        //     bigNumberStrings: true
        // },
        host: '106.13.52.142',
        port: 3306,
        //解决中文输入问题
        define: {
            underscored: true,
            charset: 'utf8mb4'
        }
    })
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err)
        })
    /**
     * 企业总表，存储开户企业基本信息
     * */

    const tb_allEnterprise = sequelize.define(
        'user',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }, //自增id
            user_name: { type: Sequelize.TEXT, allowNull: false }, //企业名称
            createTime: {
                type: Sequelize.INTEGER,
                allowNull: true
            }, //企业创建时间
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            } //企业状态 1 启用 2 停用
        },
        {
            //使用自定义表名
            freezeTableName: 'user',
            //去掉默认的添加时间和更新时间
            timestamps: false
        }
    )

    /**
     *服务器表 用于存储运维地址，做白名单鉴权
     * */

    const tb_maintenance = sequelize.define(
        'tb_maintenance',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }, //自增id
            ip: { type: Sequelize.TEXT, allowNull: true }, //ip地址
            domain: { type: Sequelize.TEXT, allowNull: false }, //域名
            province: { type: Sequelize.TEXT, allowNull: false }, //省份
            http_port: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, //http端口
            https_port: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, //https端口
            createTime: {
                type: Sequelize.INTEGER,
                allowNull: true
            } //企业创建时间
        },
        {
            //使用自定义表名
            freezeTableName: true,
            //去掉默认的添加时间和更新时间
            timestamps: false
        }
    )
    // tb_maintenance.hasOne(tb_allEnterprise, {
    //     foreignKey: 'm_id',
    //     sourceKey: 'id',
    //     onDelete: 'SET NULL',
    //     onUpdate: 'CASCADE'
    // })
    var result = await sequelize.sync()
    return result.models
}

// define 是定义模型，，可在需要时调用sync  直接创建数据库
module.exports = {
    createModel
}
