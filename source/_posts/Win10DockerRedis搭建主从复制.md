---
title: 在 Win 10 Docker 上搭建 Redis 主从复制
date: 2021-02-17 13:43:58
updated: 
tags: 教程
categories: Redis
---

## 在 Win 10 Docker 上搭建 Redis 主从复制

前面介绍了 MySQL 可以主从复制，Rdies 当然也可以，而且是极简风格，只需要一个命令 `replicaof`，如果你对 Docker 的操作不熟悉的话，可以看看下面的详细步骤
## 启动节点
使用 Docker 创建一个主节点，两个从节点
### 启动主节点
```bash
docker pull redis
docker run -itd --name redis-6379  -p 6379:6379 redis --appendonly yes --protected-mode no
docker exec -it redis-6379 /bin/bash
$redis-cli
```
### 启动从节点 1
```bash
docker pull redis
docker run -itd --name redis-6380  -p 6380:6379 redis --appendonly yes --protected-mode no
docker exec -it redis-6380 /bin/bash
$redis-cli
replicaof 172.19.16.1 6379
```
### 启动从节点 2
```bash
docker pull redis
docker run -itd --name redis-6381  -p 6381:6379 redis --appendonly yes --protected-mode no
docker exec -it redis-6381 /bin/bash
$redis-cli
replicaof 172.19.16.1 6379
```
## 搭建主从复制
> tip：Redis5.0之前，主从配置命令使用 `slaveof`

### 查看 IP 地址
```bash
docker inspect -f '{{.Name}} - {{.NetworkSettings.IPAddress }}' $(docker ps -aq)
```
更多查看 IP 的命令请看这篇文章
记住主节点 IP
### 从节点 1
填主节点 IP 与 端口
```bash
replicaof  172.17.0.2 6379
```
查看状态
```bash
info replication
---
127.0.0.1:6379> info replication
## Replication
role:slave
master_host:172.17.0.2
master_port:6379
master_link_status:up
```
### 从节点 2
填主节点 IP 与 端口
```bash
replicaof  172.17.0.2 6379
```
查看状态
```bash
info replication
---
127.0.0.1:6379> info replication
## Replication
role:slave
master_host:172.17.0.2
master_port:6379
master_link_status:up
```
## 验证
主节点设置 aa
```bash
127.0.0.1:6379> keys *
(empty array)
127.0.0.1:6379> set aa bb
OK
127.0.0.1:6379> keys *
1) "aa"
```
从节点查看
```bash
127.0.0.1:6379> keys *
1) "aa"
127.0.0.1:6379>  get aa
"bb"
```