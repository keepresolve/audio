    PRAGMA foregin_keys = ON;
    PRAGMA defer_foreign_keys = true;
    -- tb_enterprise  子企业表，用于存储各个企业的一些配置信息 
    CREATE TABLE IF NOT EXISTS tb_enterprise(
        id              INTEGER  PRIMARY KEY  AUTOINCREMENT NOT NUll, 
        ep_id           INTEGER  NOT NULL, 
        ep_name         TEXT     NOT NULL,     
        es_domain       TEXT     NOT NULL,              -- 企业所属域名
        createTime      INTEGER  NOT NULL,              -- 企业创建时间
        callback_url    TEXT     NOT NULL,              --  回调地址
        recordType      INTEGER  NOT NULL,              -- 录音文件存储类型 1 金山云 2 阿里云 3 ftp
        status          INTEGER  DEFAULT 1,              -- 企业状态 1 启用 2 停用
        db_ver          INTEGER DEFAULT 1               --版本
    );
    -- tb_task  质检任务表
    CREATE TABLE IF NOT EXISTS tb_task(
        id              INTEGER         PRIMARY KEY AUTOINCREMENT NOT NUll, 
        task_id         INTEGER         NOT NULL,      -- //质检平台任务id
        taskName        TEXT            NOT NULL,      -- //任务名称
        recordCount     INTEGER         NOT NULL,      -- //任务包含话单数量
        startTime       INTEGER         NOT NULL,      -- //任务开始时间
        stopTime        INTEGER          ,   -- //任务结束时间
        createTime      INTEGER          ,      -- // 任务创建时间
        updateTime      INTEGER         ,      -- //任务更新时间
        status          INTEGER         NOT NULL       -- // 任务状态 1 排队中，2 处理中 3 失败 4 处理完毕 5 暂停处理 
    );
    --tb_taskItem  质检项表
    CREATE TABLE IF NOT EXISTS tb_taskItem(
        id              INTEGER         PRIMARY KEY AUTOINCREMENT NOT NUll, 
        task_item_id    INTEGER         NOT NULL,        -- //对应质检平台中 质检项id
        task_item_name  TEXT            NOT NULL,        -- //质检项名称
        originalKeyWord TEXT            NOT NULL,        -- //质检关键词 逗号分隔
        task_id         INTEGER         NOT NULL,        -- //对应质检任务表主键id
        FOREIGN KEY(task_id) REFERENCES tb_task(id) ON DELETE CASCADE ON UPDATE CASCADE  
    );
   --tb_recordInfo  录音信息表
    CREATE TABLE IF NOT EXISTS tb_recordInfo (
        id              INTEGER         PRIMARY KEY AUTOINCREMENT NOT NUll, 
        task_id         INTEGER         NOT NULL, 
        call_id         INTEGER         NOT NULL,
        recordName      TEXT           ,
        res_token       TEXT            NOT NULL,
        fileName        TEXT           , 
        callText        TEXT           ,
        cc_number       TEXT            NOT NULL, 
        seatNumber      TEXT            NOT NULL, 
        createTime      INTEGER        ,
    FOREIGN KEY(task_id) REFERENCES tb_task(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

    create index if not exists cc_number_record on tb_recordInfo(cc_number);
    create index if not exists task_record on tb_recordInfo(task_id);
    create index if not exists fileName_record on tb_recordInfo(fileName);

    --tb_callRecord
    CREATE TABLE IF NOT EXISTS tb_callRecord(
        id              INTEGER         PRIMARY KEY AUTOINCREMENT NOT NUll, 
        task_id         INTEGER         NOT NULL, 
        record_id       INTEGER         NOT NULL,
        status          INTEGER         NOT NULL  default 1, 
        updateTime      INTEGER         ,
        errInfo         TEXT            ,
        FOREIGN KEY(task_id) REFERENCES tb_task(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

    create index if not exists record_id_call on tb_callRecord(record_id);

    --tb_nlpResult
    CREATE TABLE IF NOT EXISTS tb_nlpResult (
        id              INTEGER         PRIMARY KEY AUTOINCREMENT NOT NUll, 
        task_id         INTEGER         NOT NULL, 
        record_id       INTEGER         NOT NULL,
        item_id         INTEGER         NOT NULL, 
        -- nlpResult       JSON            NOT NULL,
        analysis        TEXT            NOT NULL,
        FOREIGN KEY(task_id) REFERENCES tb_task(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(item_id) REFERENCES tb_taskItem(id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    -- nlpResultView
    CREATE View nlpResultView as select tb_task.taskName || " ( id:" || tb_task.id || ")" as task,
    tb_taskItem.task_item_name || " ( id:" ||  tb_taskItem.id || ")" as taskItem,
    tb_taskItem.originalKeyWord as itemContent, 
    tb_recordInfo.fileName,tb_recordInfo.callText,tb_nlpResult.analysis 
    from tb_recordInfo,tb_nlpResult,tb_task,tb_taskItem  where 
    tb_recordInfo.task_id = tb_task.id  and tb_nlpResult.item_id = tb_taskItem.id and 
    tb_nlpResult.record_id = tb_recordInfo.id group by tb_taskItem.id,tb_recordInfo.id;
