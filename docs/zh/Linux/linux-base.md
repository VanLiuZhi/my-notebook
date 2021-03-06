# linux base

## 文件目录

/etc
存放系统管理和配置文件

/usr  (Unix System Resource)
用于存放系统应用程序，比较重要的目录/usr/local本地系统管理员软件安装目录（安装系统级的应用）。这是最庞大的目录，要用到的应用程序和文件几乎都在这个目录。

/usr/bin众多的应用程序
/usr/sbin超级用户的一些管理程序

/usr/src源代码，linux内核的源代码就放在/usr/src/linux里

/usr/local/bin本地增加的命令
/usr/local/lib本地增加的库

/proc
虚拟文件系统目录，是系统内存的映射。可直接访问这个目录来获取系统信息。

/sbin
存放二进制可执行文件，只有root才能访问。这里存放的是系统管理员使用的系统级别的管理命令和程序。如ifconfig等

一般，系统带的应用在/usr/bin   自己安装的在/usr/local/bin，/usr/sbin 也会有应用

如果你是编译安装的，最好用ln -s 源命令 /usr/local/bin，把编译安装的启动程序在通用安装目录下创建符号链接，这样就能直接在任何地方从命令行运行程序

## 文件类型

目录（d）   文件（-）  字符型文件（c ）  块设备（b） l 链接文件   p 管道文件

创建文件  touch

复制文件  cp -i  (覆盖提醒) cp -i file newfile

链接文件（new）    命令  ln

有硬链接和符号链接（软链接）

重命名  命令 mv

mv  a  b   操作上称为移动文件，a在当前目录移动成b，实现了修改名字的作用

## 文件权限

权限 r  w  x  文件的权限如下图所示，开始指文件类型

```
-rw-r--r-- 1 root root  664 Apr 12 22:46 uwsgi_params
-rw-r--r-- 1 root root 3610 Apr 12 22:46 win-utf
```

除去类型，开始三个 rw-  描述的是文件所有者的权限，r--  文件所属组 ，最后是其他用户。

关于所属组，比如system组，可以执行系统相关命令，当某个用户被临时加入到系统组，则该用户将拥有对应权限，比如：

```
-r-xr-sr-x（- 类型， r-x 文件所有者权限  r-s  文件所属组权限  r-x 文件其它用户权限 
```

如某个用户像执行它，只要加入系统组即可。

文件特殊权限  `SUID`   `SGID`

目录给予SGID权限，该目录下创建的文件都将是这个组的。

目录设置SBIT位，只能自己修改目录下的文件，该目录可能创建多个文件（不同用户），防止别人来修改自己的文件。

文件权限可以隐藏，此时ls -l 看不到，用lsattr查看隐藏权限。  

更进一步，对某个命令设置特定用户才能执行，对某个用户做设置。

权限后面是链接数，然后是文件所属用户名，之后是所属组名，然后文件大小，日期时间，文件名。

记住，一个文件被创建的时候，它拥有inode和block，每个文件占用一个独立的inode table，记录文件的权限和属性，包括数据地址。block数据存放的实际内容。ls -il  这个i参数可以查看inode。

知道该文件的einode，使用find-inum 可以找到所有指向inode的文件。

补充：

符号链接，可以对文件和目录创建符合链接。符号链接可以理解为快捷方式，它和原文件是两个不同的文件，所有他们的inode不一样，而且他数据很小，因为只做指向。在ls命令下，可以看到文件类型是 `l`，并且后面会有 `fileA -> fileB`，意为A是B的符号链接。原始文件被删除后，符号链接也失效。可以跨文件系统创建符号链接。不要创建符号链接的符号链接。

硬链接，会创建独立的虚拟文件，但是共享原文件的inode，使用ls命令查看，会发现它们完全一样（链接数都是2），除了名字外。引用硬链接等于引用原文件。不能对目录创建硬链接（目录下的所有数据都会被创建硬链接），不能跨文件系统。


## 挂载与分区 

linux 硬盘第一扇区512byte，记录着主引导记录和分区信息。主引导占了446byte，后面的空间一般分配3个主分区，1个扩展分区。每个占16byte。如果全是主分区，只能有4个，所以主分区不能超过4个。

挂载，/etc/fstab记载着挂载信息，SWAP称为交换分区，类似虚拟内存。

## 磁盘冗余阵列  

**RAID**

RAID 0～RAID 50等数个规范

RAID 0是组建磁盘阵列中最简单的一种形式，只需要2块以上的硬盘即可，成本低，可以提高整个磁盘的性能和吞吐量。RAID 0没有提供冗余或错误修复能力，但实现成本是最低的。最大的缺点在于任何一块硬盘出现故障，整个系统将会受到破坏，可靠性仅为单独一块硬盘的1/N。

**RAID1**

称为磁盘镜像，原理是把一个磁盘的数据镜像到另一个磁盘上，也就是说数据在写入一块磁盘的同时，会在另一块闲置的磁盘上生成镜像文件，在不影响性能情况下最大限度的保证系统的可靠性和可修复性上，只要系统中任何一对镜像盘中至少有一块磁盘可以使用，甚至可以在一半数量的硬盘出现问题时系统都可以正常运行,当一块硬盘失效时，系统会忽略该硬盘，转而使用剩余的镜像盘读写数据，具备很好的磁盘冗余能力。缺点磁盘利用率不高。

## epoll

这是linux的模块，python 的 torado会对其进行封装，提供接口，是实现高并发的关键。BSD系统的是kqueue，大概概念应该是类似的，BSD接触的较少了。

epoll是整个框架实现高性能的基础，所以为了发挥性能，你需要把程序部署在linux上，使用linux的epoll。 
  
要理解这个模块是做什么的，先说任务阻塞，多个任务阻塞了，一般的操作系统机制是使用轮询的方法，循环所有阻塞任务，看是否有被唤醒的，这样太浪费时间了，如果当前循环任务没有被唤醒的，CPU白白浪费了一次循环，所以有了epoll 这是一个代理，在操作系统设计的代码大概是这样的，原来的思路是循环任务列表，现在使用epoll，被循环的任务列表将由epoll提供，如果没有，那么CPU就不用浪费时间了，那么什么情况下会有呢？就是当有任务被唤醒的时候，比如任务因为别人的事件被唤醒，比如A给被阻塞的任务B一个事件“缓冲区非空”，B得到这个事件，B不用被阻塞了，它需要去缓冲区读取数据，这个时候就通知epoll，我可以被调度了。epoll的好处就是可以告诉内核那个任务可以调度，传统的轮询要一个一个任务的查看谁能被调度，如此，加入一个代理加快了CPU处理任务的速度。

## nohup

nohup 是后台作业的意思， nohup运行的进程将会忽略终端信号运行。即后台运行一个命令。 

nohup COMMAND & 用nohup运行命令可以使命令永久的执行下去，和用户终端没有关系，例如我们断开SSH连接都不会影响它的运行。

## supervisor

supervisor是用Python开发的一套通用的进程管理程序，能将一个普通的命令行进程变为后台daemon，并监控进程状态，异常退出时能自动重启。

安装 `apt-get install -y supervisor`

注意：终止进程后重启电脑，进程将会重启。所以要移除某个进程，要把对应的配置删除。

## 守护进程

什么是守护进程？其实感觉守护进程并没有什么明确的定义，只是守护进程有一些特征，这是它需要遵循的。

守护进程的第一个特征是长时间在后台运行的程序，并且主要是为了提供某种服务，而为了能够让服务尽可能随时都可用，就要求这个服务是一直运行的，于是守护进程就守护着这个服务不挂掉。linux里面常见的守护进程一般都是以d结尾的，比如apache的httpd,samba的smbd,ssh的sshd。

它的第二个特征是与启动它的进程的环境隔离，包括关闭它打开的所有文件描述符，终端，会话，进程组，某些环境变量（如工作目录），文件掩码。

1. 为什么要脱离终端？

如果它不脱离终端，那么就有可能收到来自终端的信号，比如SIGINT(Ctrl+c,会被发往所有前台进程组的进程，它的默认行为就是结束进程),SIGHUP（会被发往会话首进程）

2. 为什么要关闭它打开的所有文件描述符？

如果创建它的进程之前打开了某个文件，然后创建这个守护进程，这样子进程就继承了fd,如果守护进程不关闭这个fd,一个是会占用资源，二个我猜测和改变工作目录一样，如果这个文件是位于挂载目录，那么就无法umount了

3. 为什么要清掩码？

这是因为假设它的父进程之前对掩码做过特殊设置，守护进程作为子进程会继承这个，那么它创建文件时，因为掩码的缘故，文件的权限就可能和实际设置的不一致。

第三个特征，守护进程通常由启动脚本启动

# apt-utils

apt-utils是Linux系统的兼容程序，在安装系统时有提示推荐安装apt-utils，如果未安装会无法安装第三方提供的Linux软件，只能使用官方推出的软件。比如wget是第三方软件，如果没有apt-utils会导致安装不上


