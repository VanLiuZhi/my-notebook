# other

## 网络


网关和路由器最大的区别是是否连接相似的网络。如果连接相似的网络，则称为路由器。而连接不相似的网络，称为网关。（个人认为这个关字可以从海关上来理解，出关，海关）

相似的网络和不相似的网络有两种不同的含义。

逻辑层面：

相似的网络：如果都是互联网上的两个网络，我们称为相似的网络。不相似的网络：如果一个是私网，一个是公网。我们称为不相似的网络。

物理层面：

相似的网络：都是以太网或者同一种介质的网络。
不相似的网络：一边是以太，一边是SDH或者ATM等


子网（Sub-net）出口路由器就叫网关了，后面还有很多中继路由器。所以网关一定是路由器，但路由器不一定用来做网关

TTL   Time to live   域名解析在DNS服务器中存留时间        

实际指转发的最大跳数，主机发送ip包的时候，在网络中转发，转发一次该值减1，为了防止无限转发和循环而设置这个值。如果变成1还没到目标地址，即为超时。

内网映射