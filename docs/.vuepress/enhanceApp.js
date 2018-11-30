import Vue from 'vue'
import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

// 代码高亮
import VueHighlightJS from 'vue-highlight.js'
// import 'highlight.js/styles/monokai-sublime.css'
import 'highlight.js/styles/dracula.css'

const helper = require('./../helper/')

// 指令形式
// import 'highlight.js/styles/agate.css'
// import 'highlight.js'
// Vue.directive('highlight', function (el) {
//   let blocks = el.querySelectorAll('pre code');
//   blocks.forEach((block) => {
//     hljs.highlightBlock(block)
//   })
// })

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  /* @tip: 可以在此，做一些其他的应用级别的优化 */

  Vue.use(Element)
  Vue.use(VueHighlightJS)
  // helper.utils.rearrangeTheSidebars(siteData)
}
