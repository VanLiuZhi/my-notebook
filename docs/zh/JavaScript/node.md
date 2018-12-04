---
sidebarDepth: 2
---

# node.js

## webpack

webpack把多种静态资源转换成一个静态文件

### @ 的含义

在webpack的配置中

<highlight-code lang='js'>

    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
      }
    }

</highlight-code>

这样在需要导入组件的时候使用 `import A from '@/components/a.vue'` 就是给复杂了引用路径做个别名。

### 修改编译路径

编译路径修改（由于存在编译出来的文件相互依赖的，而你只导入其中几个，依赖就出问题了，为了不修改后端代码，修改通用编译路径是不错的解决方案）

<highlight-code lang='js'>

    assetsRoot: path.resolve(__dirname, '../static/dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '/static/dist/',
    productionSourceMap: false,

</highlight-code>

## Babel

一个转码器，将es6转es5，这个东西何用？node.js直接执行es6代码还存在问题，听说最新版本可以了。所以用es6来写js，这样可以利用它的新特性，然后转码，这样node.js就可以运行了。