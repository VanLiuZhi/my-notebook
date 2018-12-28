# Redis

## Database Number

Redis 使用 DB number 实现类似关系型数据库中 schema 的功能。不同 DB number 表示的数据库是隔离的，但是目前只能使用数字来表示一个数据库，Ubuntu 默认的配置文件配置了16个数据库，DB number 是从0开始的，并且默认连接0号数据库。

`redis-cli -n <dbnumber>` 连接指定数据库

## 在docker中使用Redis

