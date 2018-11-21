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
