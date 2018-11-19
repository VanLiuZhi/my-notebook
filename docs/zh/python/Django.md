# Django 2.0 相关

对文档阅读的大致补充，框架拥有功能的概述，详细内容查阅文档。

![image](/my-notebook/images/Python/djangobooklogo_large.png)

## session

session是一种常用的web技术，在Django框架中很容易去使用它。

### session 概念 

大多数的应用都是用 `Cookie` 来实现 `Session` 跟踪的，第一次创建 `Session` 的时候，服务端会在HTTP协议中告诉客户端，需要在 Cookie里面记录一个 `Session ID`，以后每次请求把这个会话ID发送到服务器，我就知道你是谁了。如果客户端的浏览器禁用了Cookie怎么办？一般这种情况下，会使用一种叫做 `URL重写` 的技术来进行会话跟踪，即每次HTTP交互，URL后面都会被附加上一个诸如 `sid=xxxxx` 这样的参数，服务端据此来识别用户。

网站保存登录账号和密码是由本地的Cookie来实现的。

    关于缓存：为了实现性能，缓存还是有必要的，不过先做到数据库的实现。session还可以基于文件来实现

### 工作流程

session是要浏览器这边配合Cookie来实现的，所以浏览器不能禁用cookie：

1. 当用户来访问服务端时,服务端生成一个随机字符串；
2. 当用户登录成功后 把 {sessionID :随机字符串} 组织成键值对 加到 cookie里发送给用户；
3. 服务器以发送给客户端 cookie中的随机字符串做键，用户信息做值，保存用户信息；

### 代码流程（在默认配置下）

在代码上，我们直接 `request.session['name'] = "my name"` 这一步执行了，就是使用随机字符串，创建了session保存到数据库，然后把 `session_id`（随机字符串）放在cookie里面给到浏览器，浏览器就设置了cookie，下次浏览器就会在请求里面cookie带上这个id，框架流程上中间件会拿出请求体的cookie查询数据库，并将session对象赋值给 `request.session`。

### session序列化(框架文档有讲解)

session的数据会被序列化保存在数据库中，默认是json，一般不需要改，由于是json，所以数据创建的键最好是字符串，数据要能被json编码，你不能直接把一个对象设置在session的键值对当中。

如果想保存更高级的格式，就需要自己实现序列化程序。（从数据库的数据来看，存储的并不是是序列字符串，是一定规则化的字母，猜测是为了压缩数据，s.get_decoded()可以得到解码的结果）

### 会话对象准则

使用普通的Python字符串作为字典键 `request.session`。这是一个比硬性规定更重要的惯例。
以下划线开头的会话字典键由Django保留供内部使用。不要request.session用新对象覆盖，也不要访问或设置其属性。像Python字典一样使用它。

### 扩展

session 就是用来在后端，为了给无状态的HTTP协议提供识别（用户识别），扩展它是很重要的。比如我们不依赖cookie，而是每次都传递一个id，后端用这个id自己创建session，然后前端每次请求都带这个ID，这样后端中间件每次都通过ID查询数据库，赋值request.session

扩展依赖于 `SessionStore`

    from django.contrib.sessions.backends.db import SessionStore

如果 `SESSION_ENGINE` 不是数据库，需要从对应的引擎来引入，可以这样：

<HightCode>
<template>
from importlib import import_module
from django.conf import settings
SessionStore = import_module(settings.SESSION_ENGINE).SessionStore
</template>
</HightCode>

### 安全

如果您在cookie中设置了 `HttpOnly` 性，那么通过js脚本将无法读取到cookie信息，这样能有效的防止 `XSS` 攻击，具体一点的介绍请google进行搜索

遇到这个问题时：

    The request's session was deleted before the request completed. The user may have logged out in a concurrent request, for example.

该地址有讲解，不过这个问题应该是出现在开发阶段的调试中，如果出现了问题可以清除浏览器数据来解决，一劳永逸的方案（还没看，链接在下面）不一定需要。
[https://stackoverflow.com/questions/42211065/django-memcached-error-the-requests-session-was-deleted-before-the-request-c](https://stackoverflow.com/questions/42211065/django-memcached-error-the-requests-session-was-deleted-before-the-request-c)

## 密码加密

框架提供了密码加密功能，该部分讲解了密码如何存储，密码升级，密码验证，管理密码。

密码存储暂时没看。

密码升级有从下一版本升级到新版本的时候，使用新的算法，和对所有需要升级的一次处理，具体参考文档。

除了框架的自己提供的，还可以使用自己编写的算法进行加密

手动管理密码：包括几个函数，对密码进行加密得到加密的结果，这个用来保存在数据库，验证密码，把明文密码和数据库存储的加密密码进行验证，返回布尔值。

密码验证：控制用户输入的密码，避免太简单，例如用户的密码输入6为，验证规则是9位那么验证不通过。

配置文件：

<HightCode>
<template>
# 密码加密使用的算法
# 列表的第一个元素 (即settings.PASSWORD_HASHERS[0]) 会用于储存密码，
# 所有其它元素都是用于验证的哈希值，它们可以用于检查现有的密码。
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
    'django.contrib.auth.hashers.BCryptPasswordHasher',
    'django.contrib.auth.hashers.SHA1PasswordHasher',
    'django.contrib.auth.hashers.MD5PasswordHasher',
    'django.contrib.auth.hashers.UnsaltedSHA1PasswordHasher',
    'django.contrib.auth.hashers.UnsaltedMD5PasswordHasher',
    'django.contrib.auth.hashers.CryptPasswordHasher',
]
</template>
</HightCode>

## 模型字段

框架实现了大部分字段了，文件，图片都有，关于文件如果用到可以仔细看看，另外有模型API，方便获取对象的信息，这对于开发很有用。

### 一对一和一对多

一对多比较了解了，被to的模型，通常会被多个表to。如果字段是外键，并且这个外键只被这个字段to那么这个时候就可以用一对一了，就是这个被to的模型，一张表只被另一张表to（不知道再被另一张表to的时候会发生什么）。通常用来做详情或扩展，比如用户的扩展，那么扩展内容可以是一个新的模型，因为这些内容是和用户相关的，所以应该一条详情对应一个用户，就可以用一对一。

使用一对一模型，在查询的时候，这个被关联的字段可以互相取到双方的值。

如 `user` 有 `detail` 对到模型 `detail`：

<HightCode>
<template>
    u = user.objects.filter().first()
    u.detail.msg
    # 反向查询
    d = detail.objects.filter().first()
    d.user.name
    # 一对多，上面的详情变成了class
    u = user.objects.filter().first()
    u.class.msg
    # 反向查询
    c = class.objects.filter().first()
    c.user_set.all()  # 返回查询集
</template>
</HightCode>

反向查询如果设置了 `related_name`，比如 `class_user`，可以这样 `c.class_user`，默认用 `表名_set`。

### 重点说说多对多

一般通过外键，新建一个表，把两张表联系起来，实现多对多。或者在其中一个模型里面建立多对多字段。
此时进行正向查询，不会像一对多那样得到外键id或对象，应该 `.all()` 得到查询集（一对多方向才得到查询集），反向查询也是得到查询集，反向查询也是可以用 `related_name`。

### 什么时候用多对多

对于一对多来说，被to的可以说是独立的，它可以不依赖其它模型，比如学生和班级，班级就是班级，而学生要和班级建立关系就用一对多，班级被to了，才会通过反向查询得到所有的学生。

对于上诉情况也会有特殊情况，上诉情况比较实用于中学，中学就是一个学生属于一个班级，如果在大学，我们进行选课，那么课程会是一个模型，一个学生会选择多个课程，这个时候用多对多就比较合适了，当然也可以通过第三张表将课程和学生建立关系，用一对多来实现。

被用做多对多的字段，创建对象的时候，如何赋值，add, set, remove, clear。

## 其它功能

- 发送信号：在特点操作完成前后都可以发送信息，比如数据save()
- 聚合内容（RSS ATOM）
- 静态文件收集：方便部署
- 验证器：用在模型字段参数里面，对字段的值进行验证
froms:表单模型，表单相关，验证器可以在表单模型字段里面使用（表单模型不是我常用的东西）
- 日志记录模块