# Python 笔记

基础永远是重中之重，虽然在应用开发中，很少会去使用语言的一些特性，比如一些高级话题，描述符，元类。但是掌握这些可以帮助理解框架源代码，从更深层次理解语言。

## callable(object)

检查对象object是否可调用。如果返回True，object仍然可能调用失败；但如果返回False，调用对象ojbect绝对不会成功。
- 注意：类是可调用的，而类的实例实现了__call__()方法才可调用。
- 版本：该函数在python2.x版本中都可用。但是在python3.0版本中被移除，而在python3.2以后版本中被重新添加。

## 继承一个类

如果已经定义了Person类，需要定义新的Student和Teacher类时，可以直接从Person类继承：

<HightCode>
<template>
class Person(object):
    def __init__(self, name, gender):
        self.name = name
        self.gender = gender
</template>
</HightCode>

定义Student类时，只需要把额外的属性加上，例如score：

<HightCode>
<template>
class Student(Person):
    def __init__(self, name, gender, score):
        super(Student, self).__init__(name, gender)
        self.score = score
</template>
</HightCode>

一定要用 `super(Student, self).__init__(name, gender)` 去初始化父类，否则，继承自 Person 的 Student 将没有 name 和 gender。
函数 `super(Student, self)` 将返回当前类继承的父类，即 Person ，然后调用__init__()方法，注意self参数已在super()中传入，在__init__()中将隐式传递，不需要写出（也不能写）。

`super(Teacher,self).__init__(name,gender)` 和 `Person.__init__(self,name,gender)` 等价的，二者选一就好。

假如一个类C继承了类A和类B，类A和类B有不同的属性，并且类C在创建时要初始化这些属性，此时在类C的构造函数__init__中使用super(C，self).__init__调用就无法实现了

<HightCode>
<template>
class A(object):
    def __init__(self, a):
        self.a = a
class B(object):
    def __init__(self, b):
        self.b = b
class C(A, B):
    def __init__(self, a, b):
        super(C, self).__init__(a, b)  # <----这样写是错误的

</template>
</HightCode>

正确的写法:

<HightCode>
<template>
class C(A, B):
    def __init__(self, a, b):
        A.__init__(self, a)
        B.__init__(self, b)

</template>
</HightCode>

**建议养成习惯，不要使用super()这个函数，即便是单继承，也使用上面的方式**

## 反射 & 自省

当执行对象的方法，或者对某个字段赋值的时候，你要操作的字段名或者方法名在编码的时候不确定，这时候需要通过某种机制访问未知的属性。

这个机制被称为反射（反过来让对象告诉我们他是什么），或是自省（让对象自己告诉我们他是什么）。

1. 使用反射获取到的函数和方法可以像平常一样加上括号直接调用
2. 获取到类后可以直接构造实例
3. 不过获取到的字段不能直接赋值，因为拿到的其实是另一个指向同一个地方的引用，赋值只能改变当前的这个引用而已

## 单下划线/双下划线

Python 用下划线作为变量前缀和后缀指定特殊变量/方法。

主要存在四种情形：
1. `object` # public
2. `__object__` # special, python system use, user should not define like it
3. `__object` # private (name mangling during runtime)
4. `_object` # obey python coding convention, consider it as private &cent;

核心风格：避免用下划线作为变量名的开始。

因为下划线对解释器有特殊的意义，而且是内建标识符所使用的符号，我们建议程序员避免用下划线作为变量名的开始。一般来讲，变量名 `_object` 被看作是“私有 的”，在模块或类外不可以使用，不能用 `'from moduleimport *'` 导入。当变量是私有的时候，用 `_object` 来表示变量是很好的习惯。因为变量名 `__object__` 对Python来说有特殊含义，对于普通的变量应当避免这种命名风格。

python有关private的描述，python中不存在protected的概念，要么是public要么就是private，但是python中的private不像C++, Java那样，它并不是真正意义上的private，通过name mangling（名称改编(目的就是以防子类意外重写基类的方法或者属性)，即前面加上“单下划线”+类名,eg：_Class__object）机制就可以访问private了。

"单下划线" 开始的成员变量叫做保护变量，意思是只有类对象和子类对象自己能访问到这些变量；"双下划线" 开始的是私有成员，意思是只有类对象自己能访问，连子类对象也不能访问到这个数据。(如下列所示)
以单下划线开头 `（_foo）` 的代表不能直接访问的类属性，需通过类提供的接口进行访问，不能用 `“from xxx import *”` 而导入；以双下划线开头的 `（__foo）` 代表类的私有成员；以双下划线开头和结尾的 `（__foo__）` 代表python里特殊方法专用的标识，如 `__init__（）` 代表类的构造函数。

变量轧压：Python把以两个或以上下划线字符开头且没有以两个或以上下划线结尾的变量当作私有变量。私有变量会在代码生成之前被转换为长格式（变为公有）。转换机制是这样的：在变量前端插入类名，再在前端加入一个下划线字符。这就是所谓的私有 `变量轧压`（Private name mangling）。

注意：
- 一是因为轧压会使标识符变长，当超过255的时候，Python会切断，要注意因此引起的命名冲突。
- 二是当类名全部以下划线命名的时候，Python就不再执行轧压。
