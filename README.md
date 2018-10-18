# my-notebook
Based on the vuepress, an app for taking personal notes

## 概述

本项目基于[https://github.com/nicejade/vuepress-web-app.git](https://github.com/nicejade/vuepress-web-app.git)，感谢原作者。

vuepress还是一个不错的项目，不过官方的例子太少了，对于一个后端程序员来说还是不太友好，我只想安安静静的写写笔记，直接使用现有的模板了。

## 高亮扩展

文档：[代码高亮扩展 vue-highlight.js](https://www.npmjs.com/package/vue-highlight.js)

虽然vuepress说明了代码的高亮是用了highlight，不过要修改配置似乎不是这么简单，这里使用vue-highlight，然后去封装组件，这样就可以自定义很多了，比如修改渲染样式。