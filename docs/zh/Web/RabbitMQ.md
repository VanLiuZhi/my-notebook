# RabbitMQ

## 概念

需要了解一个协议：AMQP协议

## 虚拟主机

通过创建新的虚拟主机，实现隔离，不同的虚拟主机直接完全隔离，拥有自己的队列，绑定和交换机。就像创建了一个新用户，服务A做订单的，链接对应的虚拟主机，服务B做消息推送的，链接对应的虚拟主机。默认是虚拟主机是 `/`，使用guest做默认用户和密码，通过命令创建新的虚拟主机：

```sh
sudo rabbitmqctl add_user dongwm 123456
sudo rabbitmqctl add_vhost web_develop
sudo rabbitmqctl set_permissions -p web_develop dongwm ".*" ".*" ".*"
```

`rabbitmqctl set_permissions` 是配置权限，三个对应的权限是：配置（队列和交换的创建和删除）、写（发布消息）、读（消费消息）的权限。

## 常用命令

- sudo rabbitmqctl list_vhosts
- sudo rabbitmqctl list_queue -p web_develop
- sudo rabbitmqctl list_users