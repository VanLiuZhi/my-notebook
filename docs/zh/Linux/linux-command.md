# Linux 命令

## chsh 修改用户使用的shell

查看 `cat /etc/shells` 文件，显示当前系统支持的shell，使用 `chsh -s /bin/zsh` 修改。该命令最终的效果会修改 `/etc/passwd` 文件。

## env printenv 查看环境变量

理解全局环境变量和局部环境变量，全局变量包括系统设置的和用户自己添加的，系统变量一般是全大写字母，通过printenv命令可以查看变量值 `printenv HOME`。

## scp 拷贝命令

scp命令 （主机和服务器相互拷贝数据，该命令要求开启scp服务。

从服务器到本地 `scp root@ip:拷贝路径 本地路径`

从本地到服务器 `scp 本地路径 root@ip:拷贝路径`

## grep

内容查找命令，配合其它命令一起使用

## find 查找命令

查找命令，列出符合条件的文件路径。 find / -name *

## uptime 

查看系统运行情况，启动时间，登陆时间等。最后的三个数字代表系统最近1分钟，5分钟，15分钟负载情况。

    liuzhi@localhost  ~  uptime
    23:03  up 13:47, 3 users, load averages: 1.04 1.25 1.37


## lsof

lsof 是 linux 下的一个非常实用的系统级的监控、诊断工具。
它的意思是 `List Open Files`，很容易你就记住了它是 `“ls + of”` 的组合。
它可以用来列出被各种进程打开的文件信息，记住：linux 下 “一切皆文件”，
包括但不限于 pipes, sockets, directories, devices, 等等。
因此，使用 lsof，你可以获取任何被打开文件的各种信息。

监控进程：`lsof -p 2854` 查看指定进程打开的文件。

监控网络：`lsof -i:8080` 查看端口被哪些进程使用。
