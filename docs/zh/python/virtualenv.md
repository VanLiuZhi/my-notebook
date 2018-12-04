# python 虚拟环境

使用虚拟环境是很有必要的，在windows和Linux上还是有区别的。

## Linux python virtualenv

大致和windows上是一样的，安装virtualenv

virtualenv -p 解释器目录 virtual目录

ls /usr/bin/python*  一般现在的linux都有python3，在这里指定解释器就可以了，没有就装一个

source py34env/bin/activate  激活

deactivate  退出    

windows上的虚拟环境还是不能直接在linux上用，虽然可以跑，但是创建这个虚拟环境的时候是指定了解释器的，直接跑解释器不对，包的内容和版本也不对，所以还是在linux上创建虚拟环境吧。

## virtualenvwrapper 

virtualenvwrapper 是对virtualenv的扩展，利用它管理虚拟环境，最好的特征就是直接用命令就可以进入虚拟环境，不用像原来一样需要切换到目录下进入。[简书](https://www.jianshu.com/p/9f47a9801329)

基本命令

workon   查看虚拟环境

workon  环境名称  进入对应虚拟环境

deactivate 退出环境

export WORKON_HOME=/  环境安装路径

export VIRTUALENVWRAPPER_PATHON= /  python解释器路径

source  /  virtualenvwrapper.sh  路径

我的流程： pip 安装  virtualenvwrapper  virtualenv  配置  ~/.bash_profile 为上面内容  把virtualenv添加符号链接

source ~/.bash_profile(激活环境变量，让workon命令可以被执行到，仅本次登陆有效)

## Anaconda

该软件有新的包管理工具 conda 这个不仅是python，是一个其它语言也可以用的包管理工具。用conda命令安装的python包，会去寻找相关依赖，提示你需要安装依赖，并一起安装。而pip虽然也会连同依赖一起装（听说没有conda好），但是有些包不会（猜测依赖的机制是包自身的，有些第三方包没有做这个处理，导致你安装了后，运行报错还要去装其它的，个人猜测）。

`conda env export > environment.yaml` 命令导出当前虚拟环境，可以用这个文件恢复虚拟环境。这个文件中有一个pip相关的信息，记录了该环境用pip安装的包。    

虽然用了conda，但是还是有一些包没法安装，还得用pip安装（猜测是一些个人写的包，不出名，没在conda上记录，或者就是单纯的没有记录）conda 和 pip ，conda可以管理pip和自己安装的包（用conda list查看），pip好像不行，只能管理自己的。

关于安装的时候是否选择添加到path，如果你电脑已经有了python，就不要选了。选了这个直接在命令行输入python，就会使用Anaconda的虚拟环境。

在新的虚拟环境中执行 `pip install -r requirements.txt` 导入pip安装的包

- activate 环境名称：进入对应环境    
- conda env list：列出当前环境
- mac下进入环境，前面加 source

心得：Anaconda也用了一段时间，感觉并没有网上说的那么强大，对于一些科学计算，或者说是由其它语言编写，Python来调用的那种包，对，就是那种很高端的，是可以用conda安装管理的，但是像一些小包，尤其是纯Python写的，只有pip才能安装，这样你还是摆脱不了pip。
