---
sidebarDepth: 2
---

# Flask
![image](/my-notebook/images/Python/Flask.png)

## 关于扩展

通过安装对应的扩展包，可以扩展框架的很多功能（这些扩展和框架会有结合，有点想开启框架的功能一样），Flask的扩展都暴露在flask.ext命名空间下，你可以在环境中通过pip安装好相应扩展，然后再在程序中导入相应的包即可使用扩展。

## 自定义url转换器

在路由中，使用<>来获取动态参数，默认是字符串类型的，如果想要指定参数类型，需要标记成`<converter:variable_name>` 这样的格式，类似 `<int:quantity>`，使用any可以指定多种路径，类似`<any(a, b:page_name)>`。像any，int做为类型可以自定义，比如定义list类型，代码如下：

<highlight-code lang='python'>

    from urllib import parse

    from flask import Flask
    from werkzeug.routing import BaseConverter

    app = Flask(__name__)


    class ListConverter(BaseConverter):

        def __init__(self, url_map, separator='+'):
            super(ListConverter, self).__init__(url_map)
            self.separator = parse.unquote(separator)  # unquote 对url进行解码

        def to_python(self, value):
            return value.split(self.separator)

        def to_url(self, values):
            return self.separator.join(BaseConverter.to_url(self, value)
                                    for value in values)


    app.url_map.converters['list'] = ListConverter


    @app.route('/list1/<list:page_names>/')
    def list1(page_names):
        print(page_names)
        return 'Separator: {} {}'.format('+', page_names)


    @app.route('/list2/<list(separator=u"|"):page_names>/')
    def list2(page_names):
        return 'Separator: {} {}'.format('|', page_names)


    if __name__ == '__main__':
        app.run(host='0.0.0.0', port=9000)

</highlight-code>

## 唯一url

在路由的装饰器中，如果指定了结尾的反斜杠，类似这样的路径 `\page\`，那么浏览器访问地址以反斜杠结尾，或者没有反斜杠都可以访问(访问一个不以反斜杠结尾的url会被重定向到到反斜杠的url上)，如果路由是`\page`，那么浏览器访问以反斜杠结尾会报错。

## 扩展响应

这是一个很常见的需求，对返回对象进行包装，比如返回一个ORM的查询实例，这个是不能被json序列化的，通过扩展返回数据，可以对特定对象进行处理。另一种情况，是重写响应类，`app.response = JSONResponse`

## 静态文件管理

在创建flask实例的时候，通过static_folder修改默认静态文件路径，`Flask(__name__, static_folder='/tmp')`

## 关于视图

通常使用函数视图，但是这样就发挥不出类的作用了，比如继承一个基类，定义一些基础的东西，flask也可以使用基于类的视图

### 标准类视图

标准类视图是继承自 `flask.views.View`，并且在子类中必须实现 `dispatch_request` 方法，这个方法类似于视图函数，也要返回一个基于Response或者其子类的对象。通过 `app.add_url_rule(url_rule, view_func)` 来进行注册

<highlight-code lang='python'>

    from flask.views import View
    class PersonalView(View):
        def dispatch_request(self):
            return "hello"
    
    app.add_url_rule('/users/',view_func=PersonalView.as_view('personalview'))

</highlight-code>



### 基于调度方法的视图

继承自 `flask.views.MethodView`，可以对不同的HTTP方法执行对应的函数，使用方法的小写名。在类视图中定义一个属性叫做decorators，然后存储装饰器。以后每次调用这个类视图的时候，就会执行这个装饰器

<highlight-code lang='python'>

    from flask import Flask, jsonify
    from flask.views import MethodView
    from flask import session

    app = Flask(__name__)


    def login_required(func):
        def wrapper(*args, **kwargs):
            if not session.get("user_id"):
                return 'auth failure'
            return func(*args, **kwargs)

        return wrapper


    class UserAPI(MethodView):
        decorators = [login_required]

        def get(self):
            return jsonify({
                'username': 'fake',
                'avatar': 'http://lorempixel.com/100/100/nature/'
            })

        def post(self):
            return 'UNSUPPORTED!'


    app.add_url_rule('/user', view_func=UserAPI.as_view('userview'))

    if __name__ == '__main__':
        app.run(host='0.0.0.0', port=9000)
        
</highlight-code>

## 使用命令行接口

和Django一样，flask框架也提供了很多命令，flask命令需要添加都环境变量，这个一般在安装后就有了。然后需要设置flask应用的环境变量，可以使用 `export FLASK_APP='app.py path'` 。

也可以自定义命令，比如 `flask run_test` 执行一个测试脚本，代码如下：

<highlight-code lang='python'>

    @app.cli.command()
    def run_test():
        print('this is a test script')

</highlight-code>

## Context

理解请求上下文和应用上下文。

## werkzeug

WSGI 协议工具集

## 其它

Flask-Assets  用于静态资源管理
压缩静态文件，在需要的时候通过标签就能找到路径引用它

Flask-Script  manager  启动命令相关

表单