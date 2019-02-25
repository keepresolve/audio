
PRAGMA foregin_keys = ON;
PRAGMA defer_foreign_keys = true;
-- 每次重启不可删除表数据
-- DROP TABLE IF EXISTS tb_allEnterprise;
-- DROP TABLE IF EXISTS tb_maintenance;
CREATE TABLE IF NOT EXISTS tb_allEnterprise(
    id          INTEGER   PRIMARY KEY AUTOINCREMENT NOT NULL,  
    ep_id       INTEGER   NOT NULL,
    ep_name     TEXT      NOT NULL,
    es_domain   TEXT      NOT NULL,
    db_name     TEXT      NOT NULL,
    maintenance TEXT,     -- 运维服务器地址          
    createTime  INTEGER,
    status      INTEGER   DEFAULT 1,
    db_ver      INTEGER   DEFAULT 1
);
-- m_id        INTEGER,
-- FOREIGN KEY(m_id) REFERENCES tb_maintenance(id) ON DELETE SET NULL ON UPDATE CASCADE
CREATE TABLE IF NOT EXISTS tb_maintenance(
    id          INTEGER   PRIMARY KEY  , 
    ip          TEXT      NOT NULL, 
    domain      TEXT      NOT NULL, 
    province    TEXT,
    http_port   INTEGER   NOT NULL, 
    https_port  INTEGER   NOT NULL, 
    createTime  INTEGER
);
