/**
 * @param dbName: 数据库名
 * */

module.exports = (sequelize, Sequelize) => {
    /**
     * 子企业表，用于存储各个企业的一些配置信息
     * */
    const tb_enterprise = sequelize.define(
        'tb_enterprise',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }, //自增id
            ep_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, //质检平台的企业id
            ep_name: {
                type: Sequelize.TEXT,
                allowNull: false
            }, //企业名称
            es_domain: {
                type: Sequelize.TEXT,
                allowNull: false
            }, //企业域名
            createTime: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, //企业创建时间
            callback_url: {
                type: Sequelize.TEXT,
                allowNull: false
            }, //企业回调地址
            recordType: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            }, // 录音文件存储类型 1 金山云 2 阿里云 3 ftp
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            }, //企业状态 1 启用 2 停用
            db_ver: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 1
            }
        },
        {
            //使用自定义表名
            freezeTableName: 'tb_enterprise',
            //去掉默认的添加时间和更新时间
            timestamps: false
        }
    )

    /**
     * 质检任务表
     * */

    const tb_task = sequelize.define(
        'tb_task',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }, //自增id
            task_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, //质检平台任务id
            taskName: {
                type: Sequelize.TEXT,
                allowNull: false
            }, //任务名称
            recordCount: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, //任务包含话单数量
            startTime: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, //任务开始时间
            stopTime: {
                type: Sequelize.INTEGER,
                allowNull: true
            }, //任务结束时间
            createTime: {
                type: Sequelize.INTEGER,
                allowNull: true
            }, // 任务创建时间
            updateTime: {
                type: Sequelize.INTEGER,
                allowNull: true
            }, //任务更新时间
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            } // 任务状态 1 排队中，2 处理中 3 失败 4 处理完毕 5 暂停处理
        },
        {
            //使用自定义表名
            freezeTableName: 'tb_task',
            //去掉默认的添加时间和更新时间
            timestamps: false
        }
    )

    /**
     * 质检项表
     * */

    const tb_taskItem = sequelize.define(
        'tb_taskItem',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }, //自增id
            task_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tb_task',
                    key: 'id'
                }
            }, //对应质检任务表主键id
            task_item_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, //对应质检平台中 质检项id
            task_item_name: {
                type: Sequelize.TEXT,
                allowNull: false
            }, //质检项名称
            originalKeyWord: {
                type: Sequelize.TEXT,
                allowNull: false
            } // 质检关键词 逗号分隔
        },
        {
            //使用自定义表名
            freezeTableName: 'tb_taskItem',
            //去掉默认的添加时间和更新时间
            timestamps: false
        }
    )

    /**
     * 录音信息表
     * */

    const tb_recordInfo = sequelize.define(
        'tb_recordInfo',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }, //自增id
            task_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tb_task',
                    key: 'id'
                }
            }, //对应质检任务表主键id
            call_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, //对应通话记录id,即话单中上传的条目
            recordName: {
                type: Sequelize.TEXT,
                allowNull: true
            }, //录音文件名
            res_token: {
                type: Sequelize.TEXT,
                allowNull: false
            }, //金山云下载地址凭证
            fileName: {
                type: Sequelize.TEXT,
                allowNull: true
            }, //转成xml对应文件名
            callText: {
                type: Sequelize.TEXT,
                allowNull: true
            }, // 录音文件内容
            cc_number: {
                type: Sequelize.TEXT,
                allowNull: false
            }, //cc_number
            seatNumber: {
                type: Sequelize.TEXT,
                allowNull: false
            }, // 坐席分机号
            createTime: {
                type: Sequelize.INTEGER,
                allowNull: true
            } //创建时间
        },
        {
            //使用自定义表名
            freezeTableName: 'tb_recordInfo',
            //去掉默认的添加时间和更新时间
            timestamps: false
        }
    )

    /**
     * 任务话单表 记录话单中每天记录的任务结果
     * */

    const tb_callRecord = sequelize.define(
        'tb_callRecord',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }, //自增id
            task_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tb_task',
                    key: 'id'
                }
            }, //对应质检任务表主键id
            record_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tb_recordInfo',
                    key: 'id'
                }
            }, //录音信息表id
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            }, // 1 正常进行中  2 失败 3 解析完成
            updateTime: {
                type: Sequelize.INTEGER,
                allowNull: true
            }, // 更新时间
            errInfo: {
                type: Sequelize.TEXT,
                allowNull: true
            } // 失败原因
        },
        {
            //使用自定义表名
            freezeTableName: 'tb_callRecord',
            //去掉默认的添加时间和更新时间
            timestamps: false
        }
    )
    /**
     * 质检结果表
     * */

    const tb_nlpResult = sequelize.define(
        'tb_nlpResult',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }, //自增id
            task_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tb_task',
                    key: 'id'
                }
            }, // 对应质检任务表主键id
            record_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tb_recordInfo',
                    key: 'id'
                }
            }, //录音信息表id
            item_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tb_taskItem',
                    key: 'id'
                }
            }, //质检项表id
            // nlpResult: {
            //     type: Sequelize.JSON,
            //     allowNull: true
            // }, // nlp质检结果
            analysis: {
                type: Sequelize.INTEGER, //1 包含 0 不包含
                allowNull: false
            } // 返回调用方需要结果 二次处理nlpResult
        },
        {
            //使用自定义表名
            freezeTableName: 'tb_nlpResult',
            //去掉默认的添加时间和更新时间
            timestamps: false
        }
    )
    // 设置外键级联关系
    tb_task.hasMany(tb_taskItem, {
        foreignKey: 'task_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    tb_task.hasMany(tb_recordInfo, {
        foreignKey: 'task_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    tb_task.hasMany(tb_callRecord, {
        foreignKey: 'task_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    tb_recordInfo.hasOne(tb_callRecord, {
        foreignKey: 'record_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    tb_task.hasMany(tb_nlpResult, {
        foreignKey: 'task_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    tb_recordInfo.hasOne(tb_nlpResult, {
        foreignKey: 'record_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    tb_taskItem.hasOne(tb_nlpResult, {
        foreignKey: 'item_id',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    return {
        tb_enterprise,
        tb_task,
        tb_taskItem,
        tb_recordInfo,
        tb_callRecord,
        tb_nlpResult
    }
}

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     operatorsAliases: false,
//     logging: false, //关闭打印输出
//     // 仅限 SQLite
//     storage: `${app.dbPath}/${dbName}`
// })
