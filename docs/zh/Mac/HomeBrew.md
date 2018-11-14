# HomeBrew
mac 平台的包管理工具，官网地址[https://brew.sh/](https://brew.sh/)

```sh
安装命令
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

记得先安装Xcode，保证安装脚步需要的环境都是可行的。

常用命令

| Command         	           |  Description                    |
| ---------------------------- |:-------------------------------:|
| brew info [包名]		        |           查看已安装包都信息       |
| brew search [包名]		    |           搜索包                 |
| brew install remove rm [包名] |           安装包                 |
| brew uninstall [包名]	        | 	        卸载包                 |
| brew list		               |           查看已安装的包列表       |
| brew cleanup		           |           删除文件残留            |
| brew cleanup [包名]		    |                                 |
| brew deps [包名]		        |           查看包的依赖            |
| brew outdated                |           查看需要更新的包
| brew update                  |           更新包
| brew home [包名]              |       用浏览器打开，查看包的网页信息
