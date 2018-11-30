# my-notebook
Based on the vuepress, an app for taking personal notes

## 概述

本项目基于[https://github.com/nicejade/vuepress-web-app.git](https://github.com/nicejade/vuepress-web-app.git)，感谢原作者。

vuepress还是一个不错的项目，不过官方的例子太少了，对于一个后端程序员来说还是不太友好，我只想安安静静的写写笔记，直接使用现有的模板了。原作者也进行了自己的一些扩张，包括评论，推广，页面排版等，不过本项目都没使用这些，我只想套用一下模版，主要是vue插件扩展，项目的主要功能还是作为笔记记录。

## 高亮扩展

文档：[代码高亮扩展 vue-highlight.js](https://www.npmjs.com/package/vue-highlight.js)

虽然vuepress说明了代码的高亮是用了highlight，不过要修改配置似乎不是这么简单，这里使用vue-highlight，就可以自定义很多了，比如修改渲染样式。
### 如果要使用自定义代码高亮组件，最好在全局安装模块，不然build会出问题。