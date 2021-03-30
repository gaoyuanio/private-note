// .vuepress/config.js
module.exports = {
    themeConfig: {
        logo:'/assets/img/logo.js',
        search: false,
        searchMaxSuggestions: 10,
        sidebar: 'auto',
        nav: [
            {
            text: 'Languages',
            ariaLabel: 'Language Menu',
            items: [
                { text: 'Chinese', link: '/language/chinese/' },
                { text: 'Japanese', link: '/language/japanese/' }
            ]
            }
        ],
        sidebar: [
            {
              title: 'Group 1',   // 必要的
              path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
              collapsable: false, // 可选的, 默认值是 true,
              sidebarDepth: 1,    // 可选的, 默认值是 1
              children: [
                '/'
              ]
            },
            {
              title: 'Group 2',
              children: [ /* ... */ ],
              initialOpenGroupIndex: -1 // 可选的, 默认值是 0
            }
          ]
    }
  }