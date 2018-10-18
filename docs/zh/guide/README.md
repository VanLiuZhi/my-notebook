---
sidebar: auto
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
---

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

Computer, Greenhouse, Programming, Science, Website, Notebook

[[toc]]

::: tip
tip test
:::
$withBase
```js
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
<script>
  console.log('hello world')
</script>

# VuePress使用笔记
>整体概述：{{ $page }} :tada: :100:
通过配置，高效快速的生成静态站点。在使用过程中，官方文档仍然觉得有些不明白，主要是没有例子参考，在此做下笔记。

## 起步
### nav(导航栏)
首先照着文档构建项目，按照文档做到首页的实现，接下来就是主要的配置文件怎写，默认主题配置怎么用，差不多实现大部分功能了。
在配置文件中（config.js）nav 配置导航栏，这个比较简单，不过多级嵌套是直接展开的，开始我以为可以在一个导航栏中写很多，比如javascript下分类3个，每个分类再分类，这样导致分类过多了，因为是直接展开的，推荐导航栏嵌套一级就行了。
>注意导航栏指向应该这么写 /css/ 然后你要有css的目录，并且目录下要有 README.md 文件，经过测试，这个文件名你不能修改，
一定要有这个文件，不然会报错。
```
nav: [
      { text: 'Home', link: '/' },
      {
        text: 'note', items: [
          {
            text: 'python模块', items: [
              { text: 'asyncio', link: '/python-asyncio/' },
              { text: 'threading', link: '/python-threading/' }
            ]
          },
          { text: 'python', link: '/python/' }
        ]
      },
      { text: '指南', link: '/guide/' },
    ]
```
# abc
## sidebar(侧边栏)
由于官方没有例子，这个我看了一些文章的讲解，然后结合自己实测，总结了一些使用方法

### 自动生成和声明
首先在配置文件中声明了sidebar后，然后配置的参数是路径，即这些路径会生产侧边栏。
举例：sidebar: ['/python/']，当我们通过导航栏打开link指向python的标签，这个页面就会再侧边生产侧边栏。
页面的sidebar: auto配置高于其它

# 注意
SSR 由于框架是服务端渲染的，所以vue的用法要符合[通用代码要求](https://ssr.vuejs.org/zh/guide/universal.html)

#最后小记

整个官方文档由指南，默认配置，主题配置构成
学会配置导航栏，侧边栏
一些特性：在Markdown中使用vue
        自定义主题，就是利用自定义的vue来渲染布局，布局有个主要容器，来渲染  .md  文件
        配置里面配置Markdown的一些特性，如何使用插件
        浏览器兼容性
        主题配置：css覆盖，class自定义，指定布局组件
                通过 .md 的 `YAML front matter` 配置来实现

- 配置
   - 默认主题
   - 自定义主题
   - customizing the default theme
       - (将默认主题的源代码导出来，这样就可以修改它，实现自定义主题，相比自己完全配置，上手会快很多) 