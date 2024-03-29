---
title: Win10 - MySQL 5.7 - Docker 搭建主从复制
date: 2021-02-16 21:30:58
updated: 
tags: 教程
categories: MySQL 主从复制
---

> 搭建环境：Windows 10 Docker Desktop WSL 2 based engine

## 创建

首先创建两个数据库，一个作为主库，另一个作为从库

### 编写 docker-conpose 文件

首先安装 docker，docker-compose
一般安装了 docker 都会安装 docker-compose，可以使用 `docker-compose -verison` 查看是否安装


`docker pull mysql:5.7` 拉取 mysql5.7 镜像


编写 docker-compose 文件「docker-compose.yaml」

```yaml
version: '2' 
networks:
  byfn:                                       #配置byfn网络
services:
  master:                                     #配置master服务
    image: 'mysql:5.7'                        #使用刚才pull下来的镜像
    restart: always
    container_name: mysql-master              #容器起名 mysql-master
    environment:
      MYSQL_USER: test
      MYSQL_PASSWORD: admin123
      MYSQL_ROOT_PASSWORD: admin123           #配置root的密码
    ports:
      - '3316:3306'                           #配置端口映射
    volumes:
      - "./master/my.cnf:/etc/mysql/my.cnf"   #配置my.cnf文件挂载，
    networks:
      - byfn                                  #配置当前servie挂载的网络
  slave:                                      #配置slave服务
    image: 'mysql:5.7'
    restart: always
    container_name: mysql-slave
    environment:
      MYSQL_USER: test
      MYSQL_PASSWORD: admin123
      MYSQL_ROOT_PASSWORD: admin123
    ports:
      - '3326:3306'
    volumes:
      - "./slave/my.cnf:/etc/mysql/my.cnf"
    networks:
      - byfn
```

### 编写 cnf 文件


在 `docker-compose.yaml` 当前目录下，建立两个文件夹，master 和 slave，里面分别写入文件「my.cnf」


```yaml
mater/my.cnf

[mysqld]
server-id=1
log-bin=/var/lib/mysql/mysql-bin

slave/my.cnf


[mysqld]
server-id=2
```

分别保存后退出


然后在当前 docker-compose.yaml 文件目录下执行

```shell
docker-compose -f docker-compse.yaml up -d
```

此时两个数据库创建成功

## 配置

### Master

启动之后进入 master 容器


```shell
docker exec -it mysql-master /bin/bash
mysql -uroot -padmin123
进入 mysql 终端之后
mysql> create user 'repl'@'%' identified by 'admin123';
mysql> GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'repl'@'%'; 
mysql> flush privileges;
mysql> show master status;
```

最后的 `show master status;`


```shell
mysql> show master status;
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000003 |      767 |              |                  |                   |
+------------------+----------+--------------+------------------+-------------------+
1 row in set (0.00 sec)
```

需要记住 File 名字，和 Position 偏移位置

### Slave

另起一个终端进入 slave 容器

```shell
docker exec -it mysql-slave /bin/bash
mysql -uroot -padmin123
进入 mysql 终端之后
mysql> CHANGE MASTER TO MASTER_HOST='mysql-master', MASTER_PORT=3306,  MASTER_USER='repl', MASTER_PASSWORD='admin123', MASTER_LOG_FILE='mysql-bin.000003', MASTER_LOG_POS=767;
mysql> start slave;
```

这里两个参数 MASTER_LOG_FILE 和 MASTER_LOG_POS 就是前面 master 上最后查询出来的；


```shell
mysql> show slave status\G
*************************** 1. row ***************************
               Slave_IO_State: Waiting for master to send event
                  Master_Host: mysql-master
                  Master_User: repl
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin.000003
          Read_Master_Log_Pos: 1116
               Relay_Log_File: eefecaed2964-relay-bin.000002
                Relay_Log_Pos: 320
        Relay_Master_Log_File: mysql-bin.000003
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
              Replicate_Do_DB:
          Replicate_Ignore_DB:
           Replicate_Do_Table:
```

查询 slave 的状态，看到 Slave_IO_Running 和 Slave_SQL_Running 都是 yes 即为同步成功


可以登录 master 上创建数据库，表，然后在 slave 这边查看数据是否同步
