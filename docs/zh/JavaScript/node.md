---
sidebarDepth: 2
---

# node.js

## webpack

### @ 的含义

在webpack的配置中

```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
```

这样在需要导入组件的时候使用 `import A from '@/components/a.vue'` 就是给复杂了引用路径做个别名。

## Babel

一个转码器，将es6转es5，这个东西何用？node.js直接执行es6代码还存在问题，听说最新版本可以了。所以用es6来写js，这样可以利用它的新特性，然后转码，这样node.js就可以运行了。