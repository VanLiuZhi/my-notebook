# 异步与协程

异步编程是一个很难的点，不同于同步编程，编程模型将变得复杂。下文引用理查德·史蒂文斯（William Richard (Rich) Stevens，1951年2月5日－1999年9月1日）所编写的《UNIX网络编程》关于I/O Models 部分内容。

## 同步、异步

- 概念：消息的通知机制

- 解释：涉及到IO通知机制；所谓同步，就是发起调用后，被调用者处理消息，必须等处理完才直接返回结果，没处理完之前是不返回的，调用者主动等待结果；所谓异步，就是发起调用后，被调用者直接返回，但是并没有返回结果，等处理完消息后，通过状态、通知或者回调函数来通知调用者，调用者被动接收结果。

## 阻塞、非阻塞

- 概念：程序等待调用结果时的状态

- 解释：涉及到CPU线程调度；所谓阻塞，就是调用结果返回之前，该执行线程会被挂起，不释放CPU执行权，线程不能做其它事情，只能等待，只有等到调用结果返回了，才能接着往下执行；所谓非阻塞，就是在没有获取调用结果时，不是一直等待，线程可以往下执行，如果是同步的，通过轮询的方式检查有没有调用结果返回，如果是异步的，会通知回调。

## 五种IO模型

- blocking IO （阻塞IO）
- nonblocking IO （非阻塞IO）
- IO multiplexing （IO多路复用）
- signal driven IO （信号驱动IO）
- asynchronous IO （异步IO）

以上五种IO模型不仅在操作系统中存在，也可以引申到编程模型中，有些框架的原理就是其中的一种。

再说一下IO发生时涉及的对象和步骤。

对于一个network IO (这里我们以read举例)，它会涉及到两个系统对象，一个是调用这个IO的process (or thread)，另一个就是系统内核(kernel)。当一个read操作发生时，它会经历两个阶段：
1. 等待数据准备 (Waiting for the data to be ready)
2. 将数据从内核拷贝到进程中 (Copying the data from the kernel to the process)
记住这两点很重要，因为这些IO Model的区别就是在两个阶段上各有不同的情况。

## blocking IO

在linux中，默认情况下所有的socket都是blocking，一个典型的读操作流程大概是这样：

![image](/my-notebook/images/Python-async/blocking-io.jpeg)

当用户进程调用了recvfrom这个系统调用，kernel就开始了IO的第一个阶段：准备数据。对于network io来说，很多时候数据在一开始还没有到达（比如，还没有收到一个完整的UDP包），这个时候kernel就要等待足够的数据到来。而在用户进程这边，整个进程会被阻塞。当kernel一直等到数据准备好了，它就会将数据从kernel中拷贝到用户内存，然后kernel返回结果，用户进程才解除block的状态，重新运行起来。

所以，blocking IO的特点就是在IO执行的两个阶段都被block了。

## non-blocking IO

linux下，可以通过设置socket使其变为non-blocking。当对一个non-blocking socket执行读操作时，流程是这个样子：

![image](/my-notebook/images/Python-async/noblocking-io.jpeg)

从图中可以看出，当用户进程发出read操作时，如果kernel中的数据还没有准备好，那么它并不会block用户进程，而是立刻返回一个error。从用户进程角度讲 ，它发起一个read操作后，并不需要等待，而是马上就得到了一个结果。用户进程判断结果是一个error时，它就知道数据还没有准备好，于是它可以再次发送read操作。一旦kernel中的数据准备好了，并且又再次收到了用户进程的system call，那么它马上就将数据拷贝到了用户内存，然后返回。

所以，用户进程其实是需要不断的主动询问kernel数据好了没有。

## IO multiplexing

IO multiplexing这个词可能有点陌生，但是如果我说select，epoll，大概就都能明白了。有些地方也称这种IO方式为event driven IO。我们都知道，select/epoll的好处就在于单个process就可以同时处理多个网络连接的IO。它的基本原理就是select/epoll这个function会不断的轮询所负责的所有socket，当某个socket有数据到达了，就通知用户进程。它的流程如图：

![image](/my-notebook/images/Python-async/io-multiplexing.jpeg)

当用户进程调用了select，那么整个进程会被block，而同时，kernel会“监视”所有select负责的socket，当任何一个socket中的数据准备好了，select就会返回。这个时候用户进程再调用read操作，将数据从kernel拷贝到用户进程。
这个图和blocking IO的图其实并没有太大的不同，事实上，还更差一些。因为这里需要使用两个system call (select 和 recvfrom)，而blocking IO只调用了一个system call (recvfrom)。但是，用select的优势在于它可以同时处理多个connection。（多说一句。所以，如果处理的连接数不是很高的话，使用select/epoll的web server不一定比使用multi-threading + blocking IO的web server性能更好，可能延迟还更大。select/

在IO multiplexing Model中，实际中，对于每一个socket，一般都设置成为non-blocking，但是，如上图所示，整个用户的process其实是一直被block的。只不过process是被select这个函数block，而不是被socket IO给block。

## Asynchronous I/O

linux下的asynchronous IO其实用得很少。先看一下它的流程：

![image](/my-notebook/images/Python-async/asynchronous-io.jpeg)

用户进程发起read操作之后，立刻就可以开始去做其它的事。而另一方面，从kernel的角度，当它受到一个asynchronous read之后，首先它会立刻返回，所以不会对用户进程产生任何block。然后，kernel会等待数据准备完成，然后将数据拷贝到用户内存，当这一切都完成之后，kernel会给用户进程发送一个signal，告诉它read操作完成了。