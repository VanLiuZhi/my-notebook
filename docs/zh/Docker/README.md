---
sidebarDepth: 2
---

# Docker 笔记
---
![image](/my-notebook/images/docker/docker.png)

## 命令

    docker ps 列出容器列表
    docker container ls 管理容器

两个命令都是查看正在运行的容器，加 -a 参数可以查看更多的信息

    docker run     docker container run   都是运行容器(但是本质还是不同的，可以深入研究下)
    Ctrl+P+Q  退出容器不关闭

    docker start goofy_almeida  启动容器在后台运行
    docker attach goofy_almeida 后台容器进入终端

    docker network create <name>
    docker network inspect <name>

    docker stats 容器ID  查看容器状态
    docker logs 把容器运行后产生的输入都打印出来，不要轻易尝试

### 多个终端访问容器

有时候需要开启多个终端来访问容器，通过容器ID，执行命令 `docker exec -it 40c330755e61 /bin/bash` 就可以了，这个终端的退出不会影响到已经开启的终端

### 创建容器的参数

- -d：后台运行容器，并返回容器ID
- -i：以交互模式运行容器，通常与 -t 同时使用
- -t：为容器重新分配一个伪输入终端，通常与 -i 同时使用

## 容器连接

容器连接就是把容器接到一起，让它们可以相互通信，如果你使用一个容器运行一个软件的方式，容器连接就是很有必要的，比如你的服务和数据库进行通信，那么你的容器就要连接在一起。
使用到的命令有 `--link` ，不过新的特性推荐使用 `network` ，network把容器都加到一个网络中，实现之间的互相通信。

### 相关命令
---
1. 创建网络，`my_network` 是网络的名称。创建完网络，把容器加入到网络就行了。
```
docker network create my_network
```

tip 加入网络示例：

`docker run -it --name=web_django --network web_network --network-alias django -v /root/py_web_vadmin/:/root/web_work -p 8080:8080 debian:v2 bash`

`docker run -it --name=web_nginx --network web_network --network-alias nginx -v /root/py_web_vadmin/:/root/web_work -p 80:80 nginx bash`

把debian和nginx加入到一个已创建的网络中。

2. 查看网络
```
docker network ls 查看已创建的网络，默认有服务自己创建的网络
```
效果如下：
```
NETWORK ID      NAME    DRIVER  SCOPE
9872c9881f6e    bridge  bridge  local
6fc119c0ceda    host    host    local
c3fdf8d5c56e    none    null    local 
```
- bridge：默认网络，所有容器默认连接到它
- none：没有网络接口
- host：连接到主机的网络栈，主机和容器间的网络没有隔离

## 数据卷

数据卷用来做数据持久化，如果你的数据在容器中，比如数据库文件，日志文件等，这些文件是会不断生成的，当你关闭容器，再次启动容器，数据倒是不会丢失，如果你从镜像启动新的容器，数据就没了（出现这种情况是因为：通常使用run命令来启动容器，如果没有定义name，那么每次使用run命令都会从镜像创建新的容器，这样上次容器的操作都没了，应该养成定义容器name的习惯，创建同名的容器是不允许的）。数据要想保持，除非你不断的提交镜像，当然这种做法是不可取的，所以要用到数据卷技术。数据可以让容器和宿主主机共享一个目录，通常把程序，数据库文件等放在宿主机上，通过创建数据卷，让容器可以操作到宿主机文件，并把新的数据写到此。

```
docker container run -v /root/data:/root/PythonProjects/GitTest -it -p 8080:8080 debian:v2 bash
```
上面命令的含意是：本机目录/root/data映射到容器目录/root/PythonProjects/GitTest（在启动容器的时候就得使用-v 命令，容器和主机共用一个目录，关闭容器，在启动容器也得带-v命令）
一般会把程序放在宿主机上，更新修改都在这，不过修改了代码后，记得进入容器中去重启项目。

## 文件操作

```
从主机复制到容器 sudo docker cp host_path containerID:container_path
从容器复制到主机 sudo docker cp containerID:container_path host_path
```
操作流程：先把容器运行起来，宿主主机执行 docker container 查询正在运行的container 的containerID 然后去执行上面的命令

保存容器修改：
- pull 了一个新的image后，或操作已有的容器，并对容器做了修改，退出容器后
- 执行 docker ps -l 得到 容器的ID
- 执行 docker commit 容器ID 镜像名称 该操作将覆盖现有进行为修改后的容器
- docker commit 容器ID 镜像名称:v2 保存修改为tag为v2的镜像

## 容器

容器(container)是docker一个很重要的概念，通过镜像我们就可以创建容器。这里记录一些相关命令。

```vim
查看
docker container ls 等同于 docker ps  -a 查看更多的信息

删除
docker rm  container id
docker rmi  image id

杀死所有正在运行的容器
docker kill $(docker ps -a -q)

删除所有已经停止的容器(容器不再使用了，可以使用此命令把它们都清空了)
docker rm $(docker ps -a -q)

删除所有未打 dangling 标签的镜像
docker rmi $(docker images -q -f dangling=true)

删除所有镜像
docker rmi $(docker images -q)

强制删除镜像名称中包含“doss-api”的镜像
docker rmi --force $(docker images | grep doss-api | awk '{print $3}')

删除所有未使用数据
docker system prune

只删除未使用的volumes
docker volume prune

docker start goofy_almeida  启动容器在后台运行
docker attach goofy_almeida 后台容器进入终端
```

### docker ps --选项

| Name, shorthand	| Default	| Description                                             |
| ----------------- |:---------:| :------------------------------------------------------:|
| --all , -a		|           | Show all containers (default shows just running)        |
| --filter , -f		|           | Filter output based on conditions provided              |
| --format		    |           | Pretty-print containers using a Go template             |
| --last , -n	    | -1	    | Show n last created containers (includes all states)    |
| --latest , -l		|           | Show the latest created container (includes all states) |
| --no-trunc		|           | Don’t truncate output                                   |
| --quiet , -q		|           | Only display numeric IDs                                |
| --size , -s		|           | Display total file sizes                                |


使用 `docker attach` 命令进入container（容器）有一个缺点，那就是每次从container中退出到前台时，container也跟着退出了。
要想退出container时，让container仍然在后台运行着，可以使用 `docker exec -it` 命令。每次使用这个命令进入container，当退出container后，container仍然在后台运行，命令使用方法：
```s
docker exec -it goofy_almeida /bin/bash

goofy_almeida：要启动的container的名称

/bin/bash：在container中启动一个bash shell
```
这样输入“exit”或者按键“Ctrl + C”退出container时，这个container仍然在后台运行。

::: tip
关于容器的运行，我本人的做法会使用 `screen` (linux的一个软件)，一般没有做后台运行。
:::

### container总结  

run 命令后从镜像创建container(容器)，此时的容器是新的，如果修改了内容，用exit退出，这个容器被关闭了（进入了Exited状态），如果想留着修改，最好是Ctrl+P+Q  退出容器不关闭  这样docker ps  可以查看容器还在，这样就可以通过start 容器name再次进入容器了。（这里我感觉容器的状态是有用的，具体就要看文档了，因为run新容器后，通过exit命令退出了，再次run，此时ps命令应该是创建了一次，然后关闭，又创建了一次，出现过两个name, 但是第二次run的容器是新的，上次修改的拿不到。 但是修改后，exit退出，通过docker ps -l，可以看到容器id,  这里可以进行提交。所以像保持容器的修改，最好用上面的流程，等理清楚了生命周期，就比较清楚整个流程了）经测试，docker ps -l列不出的容器，通过docker ps -a找到，即使状态不是update也可以去commit。
::: tip 容器的status
One of created, restarting, running, removing, paused, exited, or dead
:::

## 容器导入导出

    docker save imageID > filename.tar
    docker load < filename.tar

    docker export imageID > filename.tar
    docker import < filename.tar

镜像和容器导出和导入的区别

镜像导入和容器导入的区别：
1. 容器导入 是将当前容器 变成一个新的镜像
2. 镜像导入 是复制的过程

save 和 export区别：
1. save 保存镜像所有的信息-包含历史
2. export 只导出当前的信息

## Dockerfile 使用

除了通过拉取官方镜像的方式外，使用Dockerfile可以定制镜像，使其更加灵活。
整个Dockerfile文件就是执行的脚本，由特定的命令组成，一个redis镜像Dockerfile文件大概是这样的。

```vim
FROM centos:latest

RUN yum -y update; yum clean all
RUN yum -y install epel-release; yum clean all
RUN yum -y install redis; yum clean all

# 设置挂载点
VOLUME ["/data/redis"]

# Define working directory.
WORKDIR /data

EXPOSE 6379

CMD ["redis-server"]
```

上述Dockerfile文件是基于基础镜像CentOS来制作Redis。

`docker build -t centos:v2 .` 在文件所在目录下执行构建命令

### 指令

Dockerfile指令就是上述文件中开头的FROM，RUN等。Dockerfile 是一个文本文件，其内包含了一条条的指令(Instruction)，每一条指令构建一层，因此每一条指令的内容，就是描述该层应当如何构建。镜像的定制实际上就是定制每一层所添加的配置、文件。如果我们可以把每一层修改、安装、构建、操作的命令都写入一个脚本，用这个脚本来构建、定制镜像。

FROM scratch 如果你以 scratch 为基础镜像的话，意味着你不以任何镜像为基础，接下来所写的指令将作为镜像第一层开始存在。

```vim
ADD
COPY
ENV
EXPOSE
FROM
LABEL
STOPSIGNAL
USER
VOLUME
WORKDIR
```

## docker-compose

这个工具是用来做容器编排的，简单来说就是可以一次启动多个容器，包括了设置端口映射，数据卷，容器连接等。在使用docker部署项目时，还是应该一个软件对应一个容器，而不是基于一个容器安装多个软件（这样就搞成一个虚拟机了），你要依次启动4，5个容器，设置端口映射，容器连接等会很麻烦，使用docker-compose只需要编写一个 `docker-compose.yaml` 文件就可以了。

使用了docker-compose，最好再配合一下Dockerfile，这样很快速就可以搭建一个环境。

以Python语言为例，流程应该是编写Dockerfile，在Dockerfile中基于一个基本容器（ubuntu，或者是Python3等容器），设置一些参数，然后安装依赖 `RUN pip install -r requirements.txt`，这样语言环境就有了，下面就是各个服务，比如MySQL，Redis等，这些不是太复杂的情况，直接在Dockerfile中指定image就行了。

总结：

1. Dockerfile 定义应用的运行环境
2. docker-compose.yml 定义组成应用的各服务
3. docker-compose up 启动整个应用

### 编写yaml文件

这个编写很简单，就是把各个容器怎么运行，参数配置组织在一起

来看一个简单的官方例子：

```yaml
version: '3'
services:
  web:
    build: .
    ports:
    - "5000:5000"
    volumes:
    - .:/code
    - logvolume01:/var/log
    links:
    - redis
  redis:
    image: redis
volumes:
  logvolume01: {}
```

官方文档总结：

一份标准配置文件应该包含 version、services、networks 三大部分，其中最关键的就是 services 和 networks 两个部分，官方这里的例子使用links，而没有使用新的networks特性。configs配置在3.3及以上版本使用，用于配置文件的访问权限。

- version：用来指定版本，依照官方的例子，现在可以使用3版本了，不同版本对一些配置的支持不同，比如配置参数从字符串到对象的变化，这里不再深入了

- services：就是需要运行的容器，容器通过build或image指定，build就是使用Dockerfile文件，image就是使用镜像，本地有的使用本地的，否则下载仓库的。build后面还可以加参数，例如context，args，用来设置上下文，参数等，这属于Dockerfile相关的内容，一般情况，直接在build指定当前目录就行了。ports指定端口映射，volums指定数据卷（使用数据卷，修改代码不用重启容器），在这个官方例子中，在最外层也就是顶级定义了volumes，这是为服务定义的，使用一个单机开发环境在services中定义就行了。标签有两种情况，在服务上（部署集群的时候）deploy: labels: ’标签内容‘，在容器上只需要用labels。看到deploy，它下面的配置都是和部署有关的。depends_on依赖关系，依赖的容器会先启动。command命令，类似python3 manage.py runserver 0.0.0.0:8000。pid: "host" 将PID模式设置为主机PID模式，跟主机系统共享进程命名空间。容器使用这个标签将能够访问和操纵其他容器和宿主机的名称空间。extra_hosts 添加主机名的标签，就是往/etc/hosts文件中添加一些记录，与Docker client的--add-host类似。

### 命令

| Command | Description 
| ------- | :-----
| build   | 构建或重建服务，这会把Dockerfile再执行一次
| help    | 命令帮助 
| kill    | 杀掉容器 
| logs    | 显示容器的输出内容 
| port    | 打印绑定的开放端口 
| ps      | 显示容器 
| pull    | 拉取服务镜像 
| restart | 重启服务 
| rm      | 删除停止的容器 
| run     | 运行一个一次性命令，run web bash
| exec    | Execute a command in a running container，感觉run差不多
| scale   | 设置服务的容器数目 
| start   | 开启服务 
| stop    | 停止服务 
| up      | 创建并启动容器 
| version | 查看版本，如果你是2版本的，就不要在yaml里面使用3版本的写法了

使用总结：

- 个人心得，大致浏览了一下官方文档，docker-compose最大的用处应该是集群，它提供了很多功能，不过对于单机来说仍然有它的价值，省去了很多命令，同样作为单机来用，不需要学的很深入，很多配置都是用不到的

- 启动容器：使用up命令来启动容器，同时也会把build配置生成镜像，在我使用的版本中，给出了警告，对于需要使用Dockerfile构建的镜像，警告说应该先使用 `docker-compose up --build`，不过这对容器的启动到是没什么影响（不知道这里官方想表达什么）。build命令只会构建镜像，并不会去启动容器，up命令启动容器后，会把容器的输出打印到终端，要想在后台运行，应该 `up -d`

- name：使用image的，镜像名称就是指定的，使用build，镜像名称为当前目录加上在services中的配置，在容器中的name也是当前目录加上在services中的配置。使用docker-compose需要在yaml文件目录执行，这样在services中的配置，比如一个叫做web的配置，第一次使用镜像（或用build构建）是Python，生成的容器也是 `当前目录_web_1`，修改了web配置，image变成Redis，那么上次创建的容器会被删除，创建新的容器，容器的名称是一样的，因为修改的是image，而不是web。使用container_name可以自定义容器name，不过通过ps命令可以看到系统的缺省名称是web_1，如果自定义了，那么在集群上因为名称相同导致错误

- exited with code 0：我用自定义的dockerfile启动容器，结果返回这么一个信息容器就停止了，我分析了官方例子做了一些测试后发现，如果你的容器启动后，什么都不做，那就会退出了，一些情况也是会退出的，比如你用 `command echo $HOME` 终端会打印这个信息，然后退出容器，我写了一个Python循环，用logging打印信息，终端一直在打印信息，没有退出。也就是说启动容器不能什么也不做

- 使用command，推荐绝对路径

:sunny:docker-compose应该这么来理解，它把多个容器组织在一起，并默认加到一个网络中（如果你没有定义网络或把容器分到不同的网络），通过run命令可以向整个环境发送命令(`docker-compose run dev /bin/zsh` 进入交互环境)，同时也可以使用docker的命令。体现了一个整体的概念。



