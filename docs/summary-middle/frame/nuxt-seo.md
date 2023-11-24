---
title: nuxt对Vue项目首页进行SEO优化
description: nuxt对Vue项目首页进行SEO优化
---

参考：[关于SPA的SEO解决方案](https://medium.com/@keshidong.dev/%E5%85%B3%E4%BA%8Espa%E7%9A%84seo%E4%BC%98%E5%8C%96%E6%96%B9%E6%A1%88-2639a63361ad)
作者：[shidong ke](https://medium.com/@keshidong.dev/about)

最近部门的项目有个需求，对首页进行SEO优化。

需求背景：我们组的项目主要是前端Vue+Element，后端PHP+Yii。该项目并不是前后端完全分离的项目，index.html由后端提供，然后在index.html中引用前端项目生成的静态资源。鉴于时间成本和实际需要，先对首页及几个宣传页进行了改造。

本文分三部分：

* 为什么SPA需要SEO

* 流行的SEO方案

* Nuxt对Vue项目首页进行SEO优化

## 为什么SPA需要SEO

SPA，全称**Single Page Application**，指的是单页面应用。SEO全称**Search Engine Optimization**，指的是搜索引擎优化。

通常我们用前端框架（这里以Vue为例）产出的代码一般是这样的：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>title</title>
</head>
<body>
  <div id="app"></div>
  <script src="index.js"></script>
</body>
</html>
```

页面实际展示的内容（用户实际看到的内容）都是通过js渲染出来的，所以搜索引擎爬虫在对我们的页面进行爬取的时候，拿到的也是上面的html代码。虽然我们可以通过在`<head></head>`中添加`<meta/>`标签来添加一些描述信息，但是远远不够，我们实际展示的内容搜索引擎爬虫还是拿不到，所以就需要对项目进行SEO优化。

## 流行的SEO方案

### SEO方案之SSR

SSR，全称**Server-side Render**，指的是服务器端渲染。与之相对应的是CSR（**Client-side Render** — 客户端渲染）。
SSR是一个比较原始的前后端开发方式。基本原理是用户去服务端请求页面时，后端会先到数据库中获取数据，然后将数据填充到前端提供的template中，最后返回一个完整的html。
而现在流行的SSR的概念和以前其实是有所差别的。现在的SSR主要是为了加速（减少白屏时间）和SEO（搜索引擎优化）。基本原理和之前类似，但是现代SSR使用的模板和之前简单的html模板不同，一般是由前端使用Nodejs进行开发维护，与浏览器渲染的过程更加接近。相当于在后端执行了渲染页面的过程，然后在返回给浏览器。

#### SSR优势

1. 利于SEO和SMO（**Social Media Optimization**，即社会化媒体优化，是通过社会化媒体、在线组织及社区网站获得公共传播的一整套方法。）

2. 提升首屏渲染速度。

#### SSR劣势

1. **额外的开发和维护成本**  
例如在SSR代码中有没有使用client端存在而server端没有的API（window、document、生命周期调用错误（如Vue的mounted等））

2. **服务端开发成本**  
目前SSR一般是前端的工作，但是大多数前端没有丰富的服务端开发经验，性能、缓存策略掌握不是太好

3. **服务器端负载**  
相当于服务器端承接了浏览器的一部分功能，对服务器端的负载有一些影响。

### SEO方案之静态化

静态化不像SSR那样实时输出HTML，它是在用户访问之前就已经提前渲染好了html。

#### 静态化优势

1. 无需丰富的后端开发经验，也能渲染出html文件

2. Static，静态文件具有利于SEO、首屏渲染速度快等优点

#### 静态化劣势

1. SSR内容是动态的，Prerender在部署时就确定了内容

2. 和第一点相关，SSR内容可以和用户相关，静态化时所有用户的内容相同

### SEO方案之Prerender

Prerender，这里指代服务端预渲染，代表实现是[prerender.io](https://prerender.io/)。其原理是在服务器端判断请求来源，如果是用户请求就直接返回，如果是来自搜索引擎的爬虫，则交给Prerender去处理。Prerender利用一个无头（headless，无界面）的浏览器，模拟打开一个SPA应用，然后将JS渲染出的DOM抓下来，提供给搜索引擎，从而实现一种伪SSR的效果。

Prerender兼具两者的优势，通用型比较强，在不入侵代码的同时适合绝大多数网页的SEO。但是出于开发成本和需求，我们最后还是选择了Nuxt的静态化方案。

## Nuxt对Vue项目首页进行SEO优化

### 关于Nuxt.js

Nuxt.js，一个**基于 Vue.js**的**服务端渲染**应用框架。可以支持SSR和Prerender。

Nuxt.js 集成了以下组件/框架，用于开发完整而强大的 Web 应用：

* Vue 2

* Vue-Router

* Vuex (当配置了 Vuex 状态树配置项 时才会引入)

* Vue 服务器端渲染 (排除使用 mode: 'spa')

* Vue-Meta

另外，Nuxt.js 使用 Webpack 和 vue-loader 、 babel-loader 来处理代码的自动化构建工作（如打包、代码分层、压缩等等）。

此次使用Nuxt.js的目的是对首页及宣传页进行SEO优化，考虑到开发成本及时间成本，最后采用Nuxt的静态化功能（预渲染）对项目进行改造。

### 具体步骤

#### 1、新建项目

因为是对项目的一部分进行改造，所以新建了一个项目。
在git bash中创建项目时，方向键可能失效，使用winpty npx.cmd可以解决此问题。
执行下列代码然后选择配置项进行安装。

```shell
npx create-nuxt-app nuxt-demo或
winpty npx.cmd create-nuxt-app nuxt-demo
```

下图是我选择的配置项：

![nuxt配置](/images/summary_middle_frame_nuxt_config_1.png)

项目创建完毕之后，可以按照提示来运行一下试试。

![nuxt配置](/images/summary_middle_frame_nuxt_config_2.png)

新创建的项目目录大致如下：

* **assets**  
  静态资源

* **components**  
  组件，该文件夹下的组件使用时无需引入，类似于已经全局注册了，这些组件无法使用asyncData。

* **layouts**  
  用于组织应用的布局组件，我理解类似于Vue项目中的App.vue

* **middlwware**  
  应用的中间件，这个没有用到

* **node_modules**  
  依赖包
  
* **pages**  
  页面，Nuxt.js 框架读取该目录下所有的 .vue 文件并自动生成对应的路由配置。
  **在这个目录里使用其他类型的文件在npm run generate时可能会报错**

* **plugins**  
  插件目录。用于组织需要再根Vue.js应用实例化之前需要运行的JavaScript插件。
  **在任何 Vue 组件的生命周期内， 只有 beforeCreate 和 created 这两个方法会在 客户端和服务端被调用。其他生命周期函数仅在客户端被调用。**

* **static**  
  静态文件目录。
  静态文件目录 static 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。
  **服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下**。

* **store**  
  Vuex状态树。
  Nuxt.js 框架集成了 Vuex 状态树 的相关功能配置，在 store 目录下创建一个 index.js 文件可激活这些配置。

* **nuxt.config.js**  
  nuxt.config.js 文件用于组织 Nuxt.js 应用的个性化配置，以便覆盖默认配置。

* **其他**  
.babelrc、.editorconfig、package.json、package-lock.json等，和其他项目中同名文件功能相同。

* **别名**
~或@ => srcDir
~~或@@ => rootDir

**在vue模板中, 如果需要引入assets或者static目录, 使用`~/assets/your_image.png`和`~/static/your_image.png`方式。**

#### 2、迁移文件

把老项目首页及宣传页的代码以及依赖的静态文件，还有一些eslint的配置，webpack配置等，能用的都拿过来，然后修改引用路径，删除不需要的代码。

下面是目录的对应关系：

* **assets**  
  css、icon、font等静态资源

* **components**  
  首页及宣传页用到的组件

* **layouts**  
  App.vue

* **middlwware**  
  这个没有用到

* **node_modules**  
  依赖包
  
* **pages**  
  首页及宣传页涉及到的页面。

* **plugins**  
  用到的各种插件。
  * axios封装（没有用Nuxt.js默认的@nuxtjs/axios）
  * elementUI
  * 其他一些用到的插件（video、zepto等）
  * 工具函数（这里有疑问，是不是应该放在assets下面）

* **static**  
  .ico文件

* **store**  
  vuex相关文件

* **nuxt.config.js**  
  nuxt.config.js 文件用于组织 Nuxt.js 应用的个性化配置，以便覆盖默认配置。

* **其他**  
.babelrc、.editorconfig、package.json、package-lock.json等，和其他功能相同。

#### 3、修改配置

这部分是重点，因为Nuxt很多东西其实在一开始就都配置好了，比如像它的目录结构，官方都建议一般不要修改。如果想修改配置的话，必须在nuxt.config.js中进行修改。Nuxt关于配置的文档很多，这里直说我用到的部分。

```javascript
inport webpack from 'webpack'
export default {
  ssr: false, // 是否启用服务端渲染。默认为false，创建时可选择
  target: 'static', // server：用于服务器端渲染，static：用于静态网站
  root: {
    base: '/page/' // 应用程序的基本URL，如果在此路径下提供了整个应用程序，则应该使用root.base。使用之后，访问***.com/home路由应该使用***.com/page/home
  },
  head: { // 一些静态资源的引入，填写头信息
    title: 'nuxt-demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: '', name: 'description', content: '' }
    ],
    script: [
      {
        src: 'https://cdn.bootcdn.net/ajax/libs/zepto/1.2.0/zepto.js'
      }
    ]
  },
  css: [ // 全局使用的css
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/common.css',
    '~/assets/css/element-variables.scss',
  ],
  plugins: [ //  使用插件
    {src: '~plugins/element-ui'},
    {
      src: '~plugins/log.js',
      mode: 'client' // client或server：文件仅包含在客户端或服务器端，如果代码中使用了window或document等浏览器端才有的API，只能使用client
    },
    {
      src: '~plugins/route.js',
      mode: 'client'
    }
  ],
  components: true, // 自动引入组件
  buildModules: [ // 某些模块仅在开发和构建期间需要。使用buildModules有助于加快生产启动速度，并大大减少node_modules生产部署的规模。
    '@nuxtjs/eslint-module'
  ],
  build: { // Nuxt.js 允许你根据服务端需求，自定义 webpack 的构建配置。
    transpile: [/^element-ui/], // 使用Babel与特定的依赖关系进行转换。应该是element-ui使用了ES6语法，所以需要进行转化
    publicPath: '', // 静态资源引用路径（通常使用CND地址）
    plugins: [ // 配置webpack插件  nuxt使用的webpack版本比较旧，有一些新功能无法使用
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify(process.env.ENV || 'dev')
      })
    ]
  }
}
```

#### 4、项目部署

由于该项目与其他项目共用一个域名：www.###.com，需要保证另一个项目也可用。所有在部署的时候把Nuxt的项目放在了www.###.com/page目录下，用Nginx进行配置。调整内容：

* 在server中添加location /page的配置项

* 让根路径重定向到www.###.com/page/home

* 对旧项目已有的一些访问路径进行兼容

* 首页项目和旧项目（主站）的相互跳转（登录登出跳转等）

#### 5、常见问题

##### 一、`document is not defined` or `window is not defined`

解决方法：
此问题产生是由于在服务端渲染时使用了window或document等DOM相关的API，常见的原因有两个：

* 页面中生命周期使用错误，比如在created中使用了window  
  nuxt在服务端执行时会执行Vue生命周期中的beforeCreate和created，如果在这两个生命周期里使用了DOM相关的API是获取不到的，构建时会报错。

* 第三方插件使用了window或document等DOM相关的API  
  Nuxt.js 允许在运行Vue.js应用程序之前执行js插件。这在您需要使用自己的库或第三方模块时特别有用。但是要注意插件是否在客户端和服务端都需要，还有就是插件中是否用到了DOM相关的API（会导致构建时报错）

解决方法：

* 正确使用生命周期  
在任何 Vue 组件的生命周期内，只有 beforeCreate 和 created 这两个方法会在 客户端和服务端被调用。其他生命周期函数仅在客户端被调用。
  这里获取不到window或document等API，可以放在mounted中执行。

* 使用第三方插件时：

  ```javascript
  plugins: [
    {
      src: '~plugins/log.js',
      mode: 'client'
    }
  ]
  ```

  添加`mode: 'client'`使第三方插件仅在客户端渲染时使用。

##### 二、NuxtLink无法打开新页面

Nuxtjs中在进行路由导航时提供了```<nuxt-link to="/"></nuxt-link>```，但是此标签有一个问题：无法在新窗口打开链接，建议改为a标签，既能满足需求，也利于搜索引擎爬取相关链接。

##### 三、注册全局方法

有时想在整个项目中使用函数或值，在Vue项目中我们有可能把方法挂在在Vue实例上，但是官方文档中明确提出：
**请勿全局使用Vue.use()，Vue.component()，也不要在此功能内专门用于Nuxt注入的Vue中插入任何内容。这将导致服务器端内存泄漏。**

另外也为我们提供了一种方法（inject(key, value)）来注册全局方法（变量）：

```javascript
// plugins/hello.js
export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('hello', msg => console.log(`Hello ${msg}!`))
}
```

```javascript
// nuxt.config.js
export default {
  plugins: ['~/plugins/hello.js']
}
```

然后就可以在页面、组件、插件中使用了。

```javascirpt
// a.vue
export default {
  mounted() {
    this.$hello('mounted')
    // will console.log 'Hello mounted!'
  },
  asyncData({ app, $hello }) {
    $hello('asyncData')
    // If using Nuxt <= 2.12, use 👇
    app.$hello('asyncData')
  }
}
```

##### 四、Nuxt支持在页面中加入head信息

```javascript
export default {
  data () {
    return {}
  },
  created () {},
  ...,
  head () {
    return {
      title: '',
      meta: [
        { hid: '', name: '', content: ''}
      ]
    }
  }
}
```

##### 五、路由相关

Nuxt.js 依据 pages 目录结构自动生成 vue-router 模块的路由配置。

* 基础路由

```javascirpt
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

那么，Nuxt.js 自动生成的路由配置如下：

```javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

* 嵌套路由

你可以通过 vue-router 的子路由创建 Nuxt.js 应用的嵌套路由。

创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件。

文件路径：

```javascript
pages/
--| users/
-----| _id.vue // 以下划线作为前缀的Vue文件：动态路由，做SSR的时候可能会用到
-----| index.vue
--| users.vue
```

Nuxt.js 自动生成的路由配置如下：

```javascript
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

##### 六、常用命令

* nuxt  
启用一个热加载的Web服务器（开发模式）localhost:3000

* nuxt build  
利用webpack编译应用，压缩JS和CSS资源（发布用）。
**个人理解SSR用的这个**

* nuxt start  
以生产模式启动一个Web服务器 (基于dist目录，需要先执行nuxt build)。

* nuxt generate  
编译应用，并依据路由配置生成对应的HTML文件 (用于静态站点的部署)。
**静态化用的这个！！！**

文章中有些地方为个人理解，欢迎大家指正！
