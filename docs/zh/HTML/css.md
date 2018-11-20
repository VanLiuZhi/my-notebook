# css 总结

## 自动换行

style='word-wrap:break-word; word-break:break-all;display:block;width:100%;'

## 不换行  

white-space:nowrap

## input

style="-webkit-appearance:checkbox"   复选相关样式

## width

width  100%   auto

1. 某div不显示设置宽度，那么width为auto

2. 某div的width在默认情况设置的是盒子模型中content的值

3. 某div的width为100%表示的是此div盒子内容部分的宽度为其父元素的宽度

4. 某个div的width不设置，或者设置为auto，那么表示的这个div的所有部分（内容、边框、内边距等的距离加起来）为父元素宽度

## overflow

关于滚动条：overflow 决定了溢出的操作，设置溢出用滚动条，那么这个容器必须有固定高度，才有溢出的概念。

## scoped

scoped 属性是一个布尔属性。
如果使用该属性，则样式仅仅应用到 style 元素的父元素及其子元素。（在style type="text/css" scoped  这里使用）

## css3 选择器

- :nth-child(n)    ---->选中某个元素，该元素必须是某个父元素下的第n个子元素
- p:nth-child(n)   ---->选中p元素，且该p元素必须是某个父元素下的第n个子元素

如果n是数字，比如2，那么第2个作用样式，如果是n+2 那么从第2个开始，后面的都作用样式

## 默认行为

body 默认会有 margin 8px 这是浏览器决定的，不同浏览器不一样，所以初始创建一个项目，我们可以修改body 的css就可以0px 了

## 其它

给元素添加背景，做一个图标按钮，需要设置padding 扩充元素大小，不然图片没法显示
