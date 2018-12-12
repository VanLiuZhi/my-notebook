# 线程

使用标准库threading来创建线程。虽然python GIL 的存在，导致多线程同一时刻只能有一个线程获得解释器（在py3中，大概执行1000行字节码后，会释放解释器，当线程被阻塞的时候，会让出解释器，释放GIL）

可以通过time.sleep(3)来阻塞线程

一个简单例子：

<highlight-code lang='python'>

    import threading

    # 计算密集型任务
    def func():
        a = [i for i in range(1111)]
        print('hello world')


    t = threading.Thread(target=func)
    t.start()
    print('sleep')
    # 此时创建列表a占用了解释器，先hello world 再 sleep


    # 计算密集型任务
    def func():
        a = [i for i in range(11111111111)]
        print('hello world')


    t = threading.Thread(target=func)
    t.start()
    print('sleep')
    # 这种情况，先打印sleep再是hello world（执行一定的字节码后，释放了解释器）

</highlight-code>

## threading的属性和方法

- current_thread()  # 返回当前线程对象.
- main_thread()  # 返回主线程对象.
- active_count()  # 当前处于alive状态的线程个数.
- enumerate()  # 返回所有活着的线程的列表，不包括已经终止的线程和未开始的线程.
- get_ident()  # 返回当前线程ID，非0整数.

看一个例子：

<highlight-code lang='python'>

    import threading

    def func():
        # a = [i for i in range(1111)]
        print('current thread = {}'.format(threading.current_thread()))
        print('main thread = {}'.format(threading.main_thread()), '"主线程对象"')
        print('active count = {}'.format(threading.active_count()), '"alive"')
        print('hello world')


    t = threading.Thread(target=func)
    t.start()
    print('sleep')
    print('current thread = {}'.format(threading.current_thread()))
    print('main thread = {}'.format(threading.main_thread()), '"主线程对象"')
    print('active count = {}'.format(threading.active_count()), '"alive"')

</highlight-code>

运行以上代码，每次的执行结果是不一样的，而且是print是线程不安全的。要解释这个问题，需要再了解一些线程相关的概念。

## thread实例的属性和方法

- name: 只是一个名称标识，可以重名，getName()、setName()来获取、设置这个名词。
- ident: 线程ID，它是非0整数。线程启动后才会有ID，否则为None。线程退出，此ID依旧可以访问。此ID可以重复使用。
- is_alive(): 返回线程是否活着。

通过threading.Thread()  我们创建了线程类的实例，像面向对象一样，可以有对应的方法，属性

`t = threading.Thread(target=func, name='my_thread', args=('1', ), kwargs={'a': 2})`

- start(): 启动线程。每一个线程必须且只能执行该方法一次。

开始线程活动。

对每一个线程对象来说它只能被调用一次，它安排对象在一个另外的单独线程中调用run()方法（而非当前所处线程）。
当该方法在同一个线程对象中被调用超过一次时，会引发RuntimeError(运行时错误)。

- run(): 运行线程函数。

代表了线程活动的方法。

你可以在子类中重写此方法。标准run()方法调用了传递给对象的构造函数的可调对象作为目标参数，如果有这样的参数的话，顺序和关键字参数分别从args和kargs取得。

start() 后，还会执行run。如果你重写线程类，在调用start和run的时候，加入打印代码，start执行的线程，会派生出子线程，在子线程中去执行run，配合threading.current_thread()可以看到整个过程。

而run只在当前线程中执行。

## 多线程情况

我们开启两个线程，然后start他们，利用threading.current_thread()获取当前线程