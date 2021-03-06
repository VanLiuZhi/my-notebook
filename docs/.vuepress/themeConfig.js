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
        // {
        //   text: '笔记', items: [
        //     { text: 'Python', link: '/zh/python/' },
        //     { text: 'Linux', link: '/zh/Linux/' },
        //     { text: 'JavaScript', link: '/zh/JavaScript/' },
        //     { text: 'Docker', link: '/zh/Docker/' },
        //     { text: 'Locust', link: '/zh/Locust/' },
        //   ]
        // },
        {
          text: '笔记',
          link: '/zh/Python/'
        },
        {
          text: '收藏',
          link: '/zh/Collect/'
        },
        {
          text: '关于我',
          link: '/zh/AboutMe/'
        }
      ],
      // sidebar: {
      //   '/zh/python/': ['collections', 'one', 'two'],
      //   '/zh/Linux/': ['linux-command', 'linux-shell']
      // }
      sidebar: [
        {
          title: 'Linux',
          collapsable: true,
          children: [
            '/zh/Linux/linux-command', '/zh/Linux/linux-shell', 
            '/zh/Git/git-command', '/zh/Linux/linux-base'
          ]
        },
        {
          title: 'Python',
          collapsable: true,
          children: [
            '/zh/Python/collections', '/zh/Python-asyncio/',
            '/zh/Python/Django', '/zh/Python/Flask', '/zh/Python/',
            '/zh/Python/virtualenv', '/zh/Python/pytest',
            '/zh/Python-socket/', '/zh/Python-threading/', '/zh/Python-multiprocessing/', '/zh/Python/gunicorn'
          ]
        },
        {
          title: 'JavaScript',
          collapsable: true,
          children: [
            '/zh/JavaScript/npm', '/zh/JavaScript/nvm', '/zh/JavaScript/',
            '/zh/JavaScript/jQuery', '/zh/JavaScript/node', '/zh/JavaScript/ECMAScript',
            '/zh/JavaScript/Vue', '/zh/JavaScript/element-UI'
          ]
        },
        // {
        //   title: 'HTML',
        //   collapsable: true,
        //   children: [
        //     '/zh/HTML/css'
        //   ]
        // },
        {
          title: 'Docker',
          collapsable: true,
          children: [
            '/zh/Docker/'
          ]
        },
        {
          title: 'MongoDB',
          collapsable: true,
          children: [
            '/zh/MongoDB/', '/zh/MongoDB/MongoEngine'
          ]
        },
        {
          title: 'MySql',
          collapsable: true,
          children: [
            '/zh/MySql/install-problem', '/zh/MySql/sqlAlchemy-query', '/zh/MySql/base'
          ]
        },
        {
          title: 'Web',
          collapsable: true,
          children: [
            '/zh/HTML/css',
            '/zh/Web/http-protocol', '/zh/Web/RabbitMQ', 
            '/zh/Web/Nginx', '/zh/Web/RESTFulAPI', '/zh/Web/Redis',
            '/zh/Web/Celery'
          ]
        },
        {
          title: 'Algorithm',
          collapsable: true,
          children: [
            '/zh/Algorithm/'
          ]
        },
        {
          title: 'ReadBook',
          collapsable: true,
          children: [
            '/zh/ReadBook/Core-python-programming', '/zh/ReadBook/javascript-definitive-guide'
          ]
        },
        {
          title: 'Mac工具',
          collapsable: true,
          children: [
            '/zh/Mac/HomeBrew', '/zh/Mac/Iterm2'
          ]
        },
        {
          title: 'Python工具',
          collapsable: true,
          children: [
            '/zh/PythonUtil/', '/zh/PythonUtil/common_tool'
          ]
        },
        {
          title: 'JavaScript工具',
          collapsable: true,
          children: [
            '/zh/JavaScriptUtil/'
          ]
        },
        {
          title: 'Other ',
          collapsable: true,
          children: [
            '/zh/Other/yaml', '/zh/Other/'
          ]
        },
      ]
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
