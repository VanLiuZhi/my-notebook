---
sidebarDepth: 2
---

# gunicorn

Gunicorn 'Green Unicorn' is a Python WSGI HTTP Server for UNIX. It's a pre-fork worker model. The Gunicorn server is broadly compatible with various web frameworks, simply implemented, light on server resources, and fairly speedy.

## 运行

    gunicorn -w 2 --threads=4 application:app -b localhost:8080

-w 指启动的进程数量如2

`ps -ef|grep python` 可以看到python共有3个进程，其中一个主进程和两个work进程（两个work进程是master的子进程）

gunicorn 工作模式

- sync
- eventlet - Requires eventlet >= 0.9.7
- gevent - Requires gevent >= 0.13
- tornado - Requires tornado >= 0.2
- gthread - Python 2 requires the futures package to be installed
- gaiohttp - Requires Python 3.4 and aiohttp >= 0.21.5

Linux进程有父进程和子进程之分,windows的进程是平等关系

gunicorn的同步模式，一次只处理一个请求（此时使用一个进程，4个线程来处理任务，任意时刻只能有一个请求被执行吗？）

虽然python有GIL，但不是所有操作都是线程安全的

## 问题

遇到的问题汇总

### 启动django项目，找不到静态资源

gunicorn 来直接启动django项目，找不到静态资源，在url配置文件中加入

<highlight-code lang='python'>

    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    urlpatterns += staticfiles_urlpatterns()

</highlight-code>

问题解决来自 [Stack Overflow](https://stackoverflow.com/questions/12800862/how-to-make-django-serve-static-files-with-gunicorn)