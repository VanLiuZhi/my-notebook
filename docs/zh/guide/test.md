# 记录随笔内容，`?` 表示有疑问的点

django 的框架默认服务器是通过创建线程的方式来处理请求的

使用 Django+gunicorn的方式，默认模式也是通过创建线程来处理请求的

？最重要的一点是，会同时处理多个请求吗？这涉及到数据一致性的问题