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
4. `_object` # obey python coding convention, consider it as private;

核心风格：避免用下划线作为变量名的开始。

因为下划线对解释器有特殊的意义，而且是内建标识符所使用的符号，我们建议程序员避免用下划线作为变量名的开始。一般来讲，变量名 `_object` 被看作是“私有 的”，在模块或类外不可以使用，不能用 `'from moduleimport *'` 导入。当变量是私有的时候，用 `_object` 来表示变量是很好的习惯。因为变量名 `__object__` 对Python来说有特殊含义，对于普通的变量应当避免这种命名风格。

python有关private的描述，python中不存在protected的概念，要么是public要么就是private，但是python中的private不像C++, Java那样，它并不是真正意义上的private，通过name mangling（名称改编(目的就是以防子类意外重写基类的方法或者属性)，即前面加上“单下划线”+类名,eg：_Class__object）机制就可以访问private了。

"单下划线" 开始的成员变量叫做保护变量，意思是只有类对象和子类对象自己能访问到这些变量；"双下划线" 开始的是私有成员，意思是只有类对象自己能访问，连子类对象也不能访问到这个数据。(如下列所示)
以单下划线开头 `（_foo）` 的代表不能直接访问的类属性，需通过类提供的接口进行访问，不能用 `“from xxx import *”` 而导入；以双下划线开头的 `（__foo）` 代表类的私有成员；以双下划线开头和结尾的 `（__foo__）` 代表python里特殊方法专用的标识，如 `__init__（）` 代表类的构造函数。

变量轧压：Python把以两个或以上下划线字符开头且没有以两个或以上下划线结尾的变量当作私有变量。私有变量会在代码生成之前被转换为长格式（变为公有）。转换机制是这样的：在变量前端插入类名，再在前端加入一个下划线字符。这就是所谓的私有 `变量轧压`（Private name mangling）。

注意：
- 一是因为轧压会使标识符变长，当超过255的时候，Python会切断，要注意因此引起的命名冲突。
- 二是当类名全部以下划线命名的时候，Python就不再执行轧压。

## 特殊方法

| name          | Description
| :-----------: | :---------------
| `__class__`   | 类对象的类型
| `__name__`    | 在模块外和类中代表不同的含义，类中调用返回类名（str），只能类调用，实例调用：`self.__class__.__name__`
| `__doc__`     | 类的文档字符串
| `__bases__`   | 类的所有父类组成的元祖，只能类调用，实例需要通过 `__class__`
| `__dict__`    | 得到一个属性字典，类和实例都可以调用，得到它们对应的属性
| `__module__`  | 类定义所在的模块（类的全名是 `__main__.className`，如果类位于一个导入模块mymod中，那么 `className.__module__` 等于 mymod）
| `__str__`     | 实例来调用，打印实例，输出实例都会执行定义的方法
| `__repr__`    | 实例调用，输出不变，打印变
| `__getattribute__` |  获取属性，针对所有属性运行
| `__getattr__` | 获取属性，针对未定义的属性运行
| `__getitem__` | 字典相关获取属性
| `__slots__`   | 限制实例能绑定的属性

## time

该模块归属在 gengrice operating system services中，接近操作系统底层。围绕着Unix  Timestamp 进行。 需要注意的是在该模块中的大多数函数是调用了所在平台C library的同名函数(比如sleep，其实是调用了平台的C代码)， 所以要特别注意有些函数是平台相关的，可能会在不同的平台有不同的效果。另外一点是，由于是基于Unix Timestamp，所以其所能表述的日期范围被限定在 1970 - 2038 之间，如果你写的代码需要处理在前面所述范围之外的日期，那可能需要考虑使用datetime模块更好。为了解决这个问题，C出里新的标准库代替原来的，这里留个心眼。

## 重定向

在Python中，文件对象sys.stdin、sys.stdout和sys.stderr分别对应解释器的标准输入、标准输出和标准出错流。在程序启动时，这些对象的初值由sys.__stdin__、sys.__stdout__和sys.__stderr__保存，以便用于收尾(finalization)时恢复标准流对象。

print语句默认写入标准输出流，也可重定向至文件或其他可写对象(所有提供write方法的对象)。这样，就可以使用简洁的print语句代替笨拙的object.write('hello'+'\n')写法。因此，在python中调用 print obj 打印对象时，缺省情况下等效于调用sys.stdout.write(obj+'\n').

控制台重定向(>和>>)：
Windows命令提示符(cmd.exe)和Linux Shell(bash等)均通过">"或">>"将输出重定向。其中，">"表示覆盖内容，">>"表示追加内容。类似地，"2>"可重定向标准错误。重定向到"nul"(Windows)或"/dev/null"(Linux)会抑制输出，既不屏显也不存盘。

示例：

    Linux 下
    python print_test.py >>out.txt


## argv

获取输入参数

```python
import sys
a = sys.argv
print(a)

# 在shell输入python print_test.py 321
# 打印：['print_test.py', '321']
```

## 操作Excel

- xlrd 读取文件，但不能对其进行操作
- xlwt 生成Excel文件（可以用来控制生成的格式），但是不能在已有的Excel文件基础上进行修改
- xluntils 可以修改文件，该模块需要依赖于xlrd，xlwt

```py
wb = Workbook()
ws = wb.active #激活 worksheet，就是创建一张表，表名默认，worksheet就是该表的对象
```

xlwt 中  write_merge(5,6,4,7,'hello')  在第五行，第四列这里输入数据，结果跨1行（5+1），
跨3列（4+3）

openpyxl：也可以用来操作Excel，由于文件格式的原因，在超过最大行数的时候，xlwt将不能处理，这时候可以使用 `openpyxl`

## 内置序列函数

- map(func, seq1[, seq2,…]) 
第一个参数接受一个函数名，后面的参数接受一个或多个可迭代的序列，返回的是一个列表。

- filter(func, seq1[, seq2,…])
用法和map一样，对每个迭代的元素执行func，如果返回结果是真，这个值就留下。

- reduce()
函数接收的参数和 map()类似，一个函数 f，一个list，但行为和 map()不同，reduce()传入的函数 f 必须接收两个参数，reduce()对list的每个元素反复调用函数f，并返回最终结果值。

调用 reduce(f, [1, 3, 5, 7, 9])时，reduce函数将做如下计算：

1. 先计算头两个元素：f(1, 3)，结果为4；
2. 再把结果和第3个元素计算：f(4, 5)，结果为9；
3. 再把结果和第4个元素计算：f(9, 7)，结果为16；
4. 再把结果和第5个元素计算：f(16, 9)，结果为25；
5. 由于没有更多的元素了，计算结束，返回结果25。

上述计算实际上是对 list 的所有元素求和。虽然Python内置了求和函数sum()，但是，利用reduce()求和也很简单。`__iter__`，`__next__` 这个结合，实现一个迭代器，让对象可以迭代。

- zip([iterable, ...])
zip()是Python的一个内建函数，它接受一系列可迭代的对象作为参数，将对象中对应的元素打包成一个个tuple（元组），然后返回由这些tuples组成的list（列表）。若传入参数的长度不等，则返回list的长度和参数中长度最短的对象相同。利用*号操作符，可以将list unzip（解压）。

```s
>>> a = [1,2,3]
>>> b = [4,5,6]
>>> c = [4,5,6,7,8]
>>> zipped = zip(a,b)
[(1, 4), (2, 5), (3, 6)]
>>> zip(a,c)
[(1, 4), (2, 5), (3, 6)]
>>> zip(*zipped)
[(1, 2, 3), (4, 5, 6)]
```

## 时间模块

- utc时区：协调世界时，又称世界统一时间，世界标准时间，国际协调时间，简称UTC 不属于任意时区

- 中国大陆、中国香港、中国澳门、中国台湾、蒙古国、新加坡、马来西亚、菲律宾、西澳大利亚州的时间与UTC的时差均为+8，也就是UTC+8。

- 时间模块有调用操作系统底层的函数，所以你直接看源码看不出什么东西来，源码上的函数是对应到底层的，这个函数真正的实现在底层。

- 一般用time, datetime这两个模块。

1. time
该模块一般用的少

- 获取时间戳：time.time()
- 由给定的时间返回时间戳：time.mktime(t)，t是一个时间元组。先设一个时间元组，9个参数，最后3位可为0：

```py
t = (2016,7,21,22,47,45,0,0,0）
```

- 英文显示：time.asctime(t)
- 格式化结果：time.strftime()，time模块是封装好的一个类，可以理解为直接的time就是时间，但是你不能这么用，得调用类的方法，而strftime方法是将结果格式化的方法
- 时区转换：`time.gmtime()` 将时间戳转换成UTC时区，这里的时间戳就是time.time()

2. datetime
常用的时间对象处理模块

datetime 模块包含了几个常用的模块来处理时间，如date日期，datetime当前日期加上时间

- 获取时间：datetime.datetime.now()

```py
datetime.date.today()
```

- 时间计算（如做加减法，返回几天前的日期）：获取的时间 和 datetime.timedelta(days=1)
做计算，如果是加法就可以得到当前时间一天后的时间，也可传分钟minutes等其它变量，用他们英文的复数形式。

- 时间对象格式化，字符串转换时间对象

strftime：这个函数是时间对象的格式化函数，只要你是时间对象就可以用这个格式化，结果是str

strptime：这个是上面是反着的，将一个字符串转换成时间对象，字符串要和格式化模式一致。比如 `‘2017-8-12’` 对应的格式化模式是 `‘%Y-%m-%d'` 这里的Y如果用小写y，就不对了，小写对应的是 `%y`

- time模块可以直接调用上面的函数
datetime模块你要先创建一个时间对象才能使用上面的函数。因为datetime格式化是类的方法，你要先创建一个实例（时间对象）才能调用方法，而对于time来说这个两个是模块里面的函数，不是类的方法。直接看源码即可理解。

| 格式符	|说明
| :-----:  | ----
| %a	   | 星期的英文单词的缩写：如星期一， 则返回 Mon
| %A	   | 星期的英文单词的全拼：如星期一，返回 Monday
| %b	   | 月份的英文单词的缩写：如一月， 则返回 Jan
| %B	   | 月份的引文单词的缩写：如一月， 则返回 January
| %c	   | 返回datetime的字符串表示，如03/08/15 23:01:26
| %d	   | 返回的是当前时间是当前月的第几天
| %f	   | 微秒的表示： 范围: [0,999999]
| %H	   | 以24小时制表示当前小时
| %I	   | 以12小时制表示当前小时
| %j	   | 返回 当天是当年的第几天 范围[001,366]
| %m	   | 返回月份 范围[0,12]
| %M	   | 返回分钟数 范围 [0,59]
| %P	   | 返回是上午还是下午–AM or PM
| %S	   | 返回秒数 范围 [0,61]。。。手册说明的
| %U	   | 返回当周是当年的第几周 以周日为第一天
| %W	   | 返回当周是当年的第几周 以周一为第一天
| %w	   | 当天在当周的天数，范围为[0, 6]，6表示星期天
| %x	   | 日期的字符串表示 ：03/08/15
| %X	   | 时间的字符串表示 ：23:22:08
| %y	   | 两个数字表示的年份 15
| %Y	   | 四个数字表示的年份 2015
| %z	   | 与utc时间的间隔 （如果是本地时间，返回空字符串）
| %Z	   | 时区名称（如果是本地时间，返回空字符串）

- 时间戳和时间对象转换

```py
d = datetime.datetime.fromtimestamp(timeStamp) 
```

`d.timestapo()`，3.0 datetime模块时间对象的方法，如果是2.0，先把时间对象转换成时间元组，利用time模块的time.mktime(t)也可以得到时间戳。

:sunny:总结：时间对象，时间戳，时间对象格式化成字符串，字符串转换为时间对象，时间对象计算（可以将结果转换成秒，在比较的时候有作用，只要是时间对象，都可以进行算数运算）

## 基本数据结构

1. 基本顺序存储结构——列表与元组

- 切片一般是字符串，不过列表也是可以切片的，从a到b, 这个b可以用负数来做索引。关于倒叙排列 a [ : : -1]，只操作最后一步“步进”

- isdigit()，字符串才有的方法，判断是不是数字

- `a[1:20] = [5]` 可以对列表某部分切片了进行值修改，属于在原处修改

- 复制（浅拷贝）`s[:]   or  s.copy()`

- `s.extend(t)  or  s += t` 在后面插入一组，相当于 `+=`

- `s.insert(i, x)` 在i处插入x (等价于 `s[i:i] = [x]`)

- 清空：`del s[:]   or   s.clear()`

- 删除：`s.pop([i])` 默认删除尾部元素，否则删除i处的元素，`s.remove(x)` 删除第一个等于x的元素
`s.reverse()` 列表反向

:sunny:上面这几个操作 `pop` 有返回值，其它都没有

2. 基本哈希存储结构——字典

| name                       | description
| -------------------------- | ------------
| len(d)                     | 返回字典元素个数 
| d[key]                     | 返回key对应的value 
| d[key]=value               | 为字典元素赋值，如果没有则增加元素 
| del d[key]                 | 删除字典元素 
| key ind/key not ind        | 查看key是否在d中 
| iter(d)                    | 返回一个迭代器，具有__next__()方法 
| clear()                    | 清空 
| copy()                     | 浅复制 
| fromkeys(seq[,value])      | 以seq作为键，value作为值建立字典，默认value为None 
| get(key[,default])         | 安全的get方法，如果不存在返回default，如果不指定default则报错 
| items()                    | 列出一个键值对的view 
| keys()                     | 列出key的view,通常用于遍历 
| values()                   | Returnanewviewofthedictionary'svalues. 
| pop(key[,default])         | 如果键值key存在与字典中，删除dict[key]，返回dict[key]的value值。key值必须给出。否则，返回default值。如果default值没有过出，就会报出KeyError异常。pop()方法至少接受一个参数，最多接受两个参数。 
| popitem()                  | 弹出一个键值对，为key的哈希序列中的第一个 
| setdefault(key[,default])  | 安全的添加操作，如果存在就返回value不更改值，如果不存在添加一个key:default的表项，default默认为0 
| update([other])            | 更改操作，other可以是键值对的列表或元组（二级的），也可以是字典，用other中的键值对添加到或替换原有键值对 

字符串：`s.upper()` 小写转大写







