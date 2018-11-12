// const helper = require('./../helper/')

module.exports = {
  repo: 'VanLiuZhi/my-notebook',
  editLinks: false,
  docsDir: './dist',
  // Algolia 搜索服务
  // algolia: {
  //   apiKey: '6290673b2059b2332d64c13d248877ad',
  //   indexName: 'lovejade',
  //   inputSelector: '',
  //   debug: false
  // },
  // comment: {
  //   clientID: '047582532241759ff101',
  //   clientSecret: 'fd8193330fb5748ccaec4d97b7495d7d7e175021',
  //   repo: 'vuepress-web-app',
  //   owner: 'nicejade',
  //   admin: ['nicejade'],
  //   perPage: 5,
  //   distractionFreeMode: false  // Facebook-like distraction free mode
  // },
  locales: {
    '/': {
      label: '简体中文',
      selectText: '选择语言',
      editLinkText: '在 GitHub 上编辑此页',
      lastUpdated: '上次更新',
      nav: [
        {
          text: '文章',
          link: '/zh/blog/',
        },
        {
          text: '笔记', items: [
            { text: 'Python', link: '/zh/python/' },
            { text: 'Linux', link: '/zh/Linux/' },
            { text: 'JavaScript', link: '/zh/JavaScript/' },
            { text: 'Docker', link: '/zh/Docker/' },
            { text: 'Locust', link: '/zh/Locust/' },
          ]
        },
        {
          text: '收藏',
          link: '/zh/Collect/'
        }
      ],
      sidebar: {
        '/zh/python/': ['collections', 'one', 'two']
      }
    },
    // '/en/': {
    //   label: 'English',
    //   selectText: 'Languages',
    //   editLinkText: 'Edit this page on GitHub',
    //   lastUpdated: 'Last Updated',
    //   nav: [
    //     {
    //       text: 'Application',
    //       link: '/en/application/'
    //     }
    //   ]
    // }
  }
}
