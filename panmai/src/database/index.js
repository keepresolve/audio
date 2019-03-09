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

    const user = sequelize.define(
        'user',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }, //自增id
            userName: { type: Sequelize.TEXT, allowNull: true }, //企业名称
            passWord: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            unit: {
                type: Sequelize.TEXT,
                allowNull: false
            }, //所属单位
            rules: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            }, //企业状态 1 普通用户 0 admin
            token: {
                type: Sequelize.TEXT,
                allowNull: false
            }, //企业状态 1 普通用户 0 admin
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }, //企业状态 1 启用 2 停用
            createTime: {
                type: Sequelize.INTEGER,
                allowNull: true
            } //企业创建时间
        },
        {
            //使用自定义表名
            freezeTableName: 'user',
            //去掉默认的添加时间和更新时间
            timestamps: false
        }
    )

    const numberRecord = sequelize.define(
        'numberRecord',
        {
            //自增id
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            // 手机号
            number: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            //是否已经售出 0 未售出 1正在拍卖 2 已售出
            bought: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            // 起拍价
            startPrice: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            // 拍卖人
            Auctioneer: { type: Sequelize.TEXT, allowNull: true },
            //最大拍卖价格
            maxPrice: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            room: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            createTime: {
                type: Sequelize.INTEGER,
                allowNull: true
            } //企业创建时间
        },
        {
            //使用自定义表名
            freezeTableName: 'numberRecord',
            //去掉默认的添加时间和更新时间
            timestamps: false
        }
    )
    const chat = sequelize.define(
        'chat',
        {
            //自增id
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            // 手机号
            userName: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            //操作
            message: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            userid: {
                type: Sequelize.INTEGER
            },
            createTime: {
                type: Sequelize.INTEGER,
                allowNull: true
            } //企业创建时间
        },
        {
            //使用自定义表名
            freezeTableName: 'chat',
            //去掉默认的添加时间和更新时间
            timestamps: true
        }
    )
    var result = await sequelize.sync()
    return result.models
}

// define 是定义模型，，可在需要时调用sync  直接创建数据库
module.exports = {
    createModel
}
