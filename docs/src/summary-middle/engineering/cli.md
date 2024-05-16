---
title: 前端脚手架
description: 工程化
---

# 前端脚手架

参考[前端脚手架教程](https://juejin.cn/post/7260144602471776311?searchId=202405111051354D778506EEC2348FF07C)。

## 一、搭建项目

本文采用 pnpm + monorepo 搭建脚手架。

操作系统: Mac。

Node版本: v18.20.2（pnpm需要）

关于 monorepo 可以参考 <a href="/blog/summary-middle/engineering/monorepo" target="_blank">Monorepo</a>。

### 前提: 全局安装 pnpm

```js
npm install pnpm -g
```

### 1、新建项目

创建 cli 目录, 使用 `pnpm init` 初始化项目。

### 2、在根目录下创建 pnpm-workspace.yaml 工作空间配置文件

```yml
packages:
  - 'packages/*'
  - 'apps/**'
```

> [!TIP]
>
> * **packaegs/\*** 表示 packages 所有直接子目录
> * **apps/\*\*** 表示 apps 下所有目录

配置后, 声明了 packages 和 apps 目录中子工程是同属一个工作空间的, 工作空间中的子工程编译打包的产物都可以被其它子工程引用。

### 3、在 packages下初始化项目

在根目录下创建 packages 目录, 并在 packages 目录中新建 mufeng-cli 目录。

通过 `pnpm init` 命令来初始化一个工程。

在此 packages/mufeng-cli/pakeage.json 中添加 bin 字段, 来声明 mufeng-cli 命令, 添加后的代码如下所示:

```json
{
  "name": "mufeng-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bin": {
    "mufeng-cli": "./bin/index.js"
  }
}
```

> [!TIP]
>
> * **package.json** 中 bin 字段用于定义一个或多个项目的可执行文件的路径。当在全局安装一个 npm 包时, npm 会查找 bin 字段, 并将其指定的可执行文件创建一个符号链接到全局的 **node_modules/.bin** 目录下, 这样就可以在命令行中直接运行这些可执行文件了。

在 `packages/mufeng-cli` 中创建 bin 目录, 并新建 index.js, 并在文件中添加如下代码:

```js
#!/usr/bin/env node

console.log('Welcome to use Mufeng-cli');
```

> [!TIP]
>
> * **#!/usr/bin/env node** 出现在脚本文件的第一行, 用于指定脚本的解释器。
> * **/usr/bin/env** 是一个 Unix/Linux 系统中用来查找环境中的可执行文件的标准路径, **node** 是 Node.js 的可执行文件名。
> * 具体来说, 就是告诉操作系统在执行这个脚本时使用 node解释器。

在根目录下创建 apps 目录。

通过 `pnpm init` 命令来初始化一个工程。

我们在 apps/pakeage.json 中添加 dependencies 字段, 来添加 mufeng-cli 依赖。再给 scripts 增加一条自定义脚本命令。完成后代码如下:

```json
{
  "name": "apps",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "mufeng-cli": "mufeng-cli"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "mufeng-cli": "workspace:*"
  }
}
```

然后在最外层根目录下运行 pnpm i 命令, 安装依赖。

安装成功后, 在 apps 目录下运行 pnpm mufeng-cli, 会发现命令行窗口打印出 Welcome to experience Mufeng-cli, 脚手架工程的搭建就成功了。

![mufeng-cli log](/imgs/summary-middle/engineering/cli_1.png)

此时整个工程的目录结构如下所示:

```md
|-- cli
  |-- node_modules
  |-- apps
    |-- node_modules
    |-- package.json
  |-- packages
    |-- mufeng-cli
      |-- bin
        |-- index.js
      |-- package.json
  |-- package.json
  |-- pnpm-lock.yaml
  |-- pnpm-workspace.yaml

```

项目创建完成后, 下一步就是将以下模块一一实现:

* 命令参数模块
* 用户交互模块
* 文件拷贝模块
* 动态文件生成模块
* 自动安装依赖模块

## 二、命令参数模块

### 1、Nodejs中的 process 模块提供了当前 Nodejs 进程相关的全局环境信息, 比如命令参数、环境变量、命令运行路径等

```js
const process = require('process');
// 获取命令参数
console.log(process.argv);
```

脚手架提供的 `mufeng-cli` 命令后面还可以设置参数, 标准的脚手架命令参数需要支持两种格式:

```sh
mufeng-cli --name=hello
mufeng-cli --name hello
```

如果通过 `process.argv` 来获取, 要额外处理两种不同的命令参数格式, 很不方便, 这里推荐 **yargs** 开源库来解析命令参数。

### 2、yargs

在 /packages/mufeng-cli 目录下安装 **yargs**:

```sh
pnpm add yargs --F mufeng-cli
```

> [!TIP]
>
> * **--F**: **--filter**的缩写, 表示只安装在指定的路径下。这里指将 yargs 安装在 mufeng-cli 目录下
> * mufeng-cli 是取 cli 子工程中 package.json 中 name 字段的值, 而不是 mufeng-cli 子工程目录的名称。

**yargs** 的使用非常简单, 其提供的 `argv` 属性是对两种格式的命令参数的处理结果。

修改 /packages/mufeng-cli/bin/index.js 代码:

```js
#!/usr/bin/env node
const yargs = require('yargs');

console.log('name', yargs.argv.name);
```

在 /apps 目录下运行 pnpm mufeng-cli --name=hello, 结果如图所示:

![mufeng-cli yargs](/imgs/summary-middle/engineering/cli_2.png)

### 3、设置子命令

加入脚手架要对外提供多个功能, 不能将所有功能都集中在 `mufeng-cli` 命令中实现。

可以通过 **yargs** 提供的 `command` 方法来设置一些子命令, 让每个子命令对应不同功能。

`yargs.command`的语法为: **yargs.command(cmd, desc, builder, handler)**

* `cmd`: 字符串, 子命令名称, 也可以传递数组, 如 `['create', 'c']`, 表示子命令是 `create`, 其别名是 `c`;
* `desc`: 字符串, 子命令描述信息;
* `builder`: 一个返回数组的函数, 子命令参数信息配置, 比如可以设置参数:
  * `alias`: 别名
  * `demand`: 是否必填
  * `default`: 默认值
  * `describe`: 描述信息
  * `type`: 参数类型, `string | boolean | number`
* `handler`: 函数, 可以在这个函数中专门处理该子命令参数

下面来设置一个用来生成模块的子命令, 我们把这个子命令命名为 `creat`。

修改 /packages/mufeng-cli/bin/index.js 中的代码:

```js
#!/usr/bin/env node

const yargs = require('yargs');
yargs.command(
  ['create', 'c'],
  '新建一个模板',
  function (yargs) {
    return yargs.option('name', {
      alias: 'n',
      demand: true,
      describe: '模板名称',
      type: 'string'
    })
  },
  function (argv) {
    console.log('argv', argv);
  }
).argv;

```

> [!TIP]
>
> * .argv 的作用是告诉 yargs 库解析命令行参数, 并将解析后的结果存储在 argv 变量中, 以便在后续代码中使用。

在 /apps 目录下分别运行 pnpm mufeng-cli create --name=hello 和 pnpm mufeng-cli c --name=hello 命令, 执行结果如下图所示:

![mufeng-cli create](/imgs/summary-middle/engineering/cli_3.png)

到这里，就实现了脚手架和用户之间最简单的交互能力，但是如果自定义参数过多，命令行参数的交互方式对用户来说是很不友好的，所以还需要实现一个用户交互模块。

## 三、用户交互模块

这里推荐使用 **inquirer** 开源库来实现询问式的交互。

安装 **inquirer**:

```sh
pnpm add inquirer@8.2.5 --F mufeng-cli
```

> [!TIP]
>
> * 为了使用 require 引入 inquirer ，要使用 8.2.5 版本的 inquirer。

这里我们主要使用了 **inquirer** 的三方面的能力:

* 询问用户问题
* 获取并解析用户的输入
* 检测用户的答案是否合法

具体来说通过 `inquirer.prompt()` 实现。`prompt` 函数接收一个数组，数组的每一项都是一个询问项，询问项有很多配置参数，下面是常用的配置项。

* `type`: 提问的类型，常用的有
  * 输入框: `input`;
  * 确认: `confirm`;
  * 单选组: `list`;
  * 多选组: `checkbox`;
* name: 存储当前问题答案的变量;
* message: 问题的描述;
* default: 默认值;
* choices: 列表选项，在某些 `type` 下可用;
* validate: 对用户的答案进行校验;
* filter: 对用户的答案进行过滤处理，返回处理后的值。

比如创建一个模板文件，大概会询问用户: 模板文件名称、模板类型、使用什么框架开发、使用框架对应的哪个组件库开发等等。下面来实现这个功能。

在 packages/mufeng-cli/bin 目录中新建 inquirer.js，在里面添加如下代码：

```js
const inquirer = require('inquirer');

const inquirerPrompt = async (argv) => {
  const { name } = argv;
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '模板名称',
        default: name,
        validate(val) {
          if (!/^[a-zA-Z]+$/.test(val)) {
            return '模板名称只能含有英文';
          }
          if (!/^[A-Z]/.test(val)) {
            return '模板名称首字母必须大写';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'type',
        message: '模板类型',
        choices: ['表单', '动态表单', '嵌套表单'],
        filter(value) {
          return {
            表单: 'form',
            动态表单: 'dynamicForm',
            嵌套表单: 'nestedForm',
          }[value];
        },
      },
      {
        type: 'list',
        message: '使用什么框架开发',
        choices: ['react', 'vue'],
        name: 'frame',
      },
    ]);
    const { frame } = answers;
    if (frame === 'react') {
      const answers1 = await inquirer.prompt([
        {
          type: 'list',
          message: '使用什么UI组件库开发',
          choices: [
            'Ant Design',
          ],
          name: 'library',
        },
      ]);
      return {
        answers,
        answers1,
      };
    }
    if (frame === 'vue') {
      const answers2 = inquirer.prompt([
        {
          type: 'list',
          message: '使用什么UI组件库开发',
          choices: ['Element'],
          name: 'library',
        },
      ]);
      return {
        answers,
        answers2,
      };
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  inquirerPrompt,
};
```

在 packages/mufeng-cli/bin/index.js 中引入 `inquirerPrompt`。

```js
#!/usr/bin/env node

const yargs = require('yargs');
const { inquirerPrompt } = require('./inquirer');

const cliInit = () => {
  // eslint-disable-next-line no-unused-expressions
  yargs.command(
    ['create', 'c'],
    '新建一个模板',
    (yargsObj) => yargsObj.option('name', {
      alias: 'n',
      demand: true,
      describe: '模板名称',
      type: 'string',
    }),
    (argv) => {
      inquirerPrompt(argv).then((answers) => {
        console.log(answers);
      });
    },
  ).argv;
};

cliInit();
```

在 /apps 目录下执行 `pnpm mufeng-cli c --n=hello`, 结果如图所示：

![mufeng-cli inquirer](/imgs/summary-middle/engineering/cli_4.png)

回答完成后，可以在下图中清楚地看到答案格式。

## 四、目录拷贝模块

要生成一个模板文件，最简单的做法就是执行脚手架提供的命令后，把脚手架中的模板文件，拷贝到对应的地方。模板文件可以是单个文件，也可以是一个文件夹。本小节先介绍一下模板文件是文件夹时候如何拷贝。

在 Node.js 中拷贝文件夹并不简单，需要用到递归，这里推荐使用开源库 **copy-dir** 来实现拷贝文件。

安装 **copy-dir**。

```sh
pnpm add copy-dir --F mufeng-cli
```

在 /packages/mufeng-cli/bin 目录下新建 copy.js 文件, 代码如下：

```js
const fs = require('fs');
const copydir = require('copy-dir');

/**
 * 复制文件
 */
const copyDir = (from, to, options) => {
  copydir.sync(from, to, options);
};

/**
 * 判断目录是否存在
 */
const checkMkdirExists = (path) => fs.existsSync(path);

exports.copyDir = copyDir;
exports.checkMkdirExists = checkMkdirExists;
```

在 packages/mufeng-cli 目录下新建 template 目录用来存放模版文件。

比如在 template 目录中创建一个 vue 目录来存放 vue 项目模版，文件目录如下：

```md
|-- cli
  |-- node_modules
  |-- apps
    |-- node_modules
    |-- package.json
  |-- packages
    |-- mufeng-cli
      |-- bin
        |-- index.js
      |-- template
        |-- vue
          |-- app.vue
      |-- package.json
  |-- package.json
  |-- pnpm-lock.yaml
  |-- pnpm-workspace.yaml

```

下面实现把 packages/mufeng-cli/template/vue 这个目录下的所有文件拷贝到 /apps 目录中。

在 /packages/mufeng-cli/bin/index.js 代码：

```js
#!/usr/bin/env node
const path = require('path');
const yargs = require('yargs');
const { inquirerPrompt } = require('./inquirer');
const { copyDir, checkMkdirExists } = require('./copy');

const cliInit = () => {
  // eslint-disable-next-line no-unused-expressions
  yargs.command(
    ['create', 'c'],
    '新建一个模板',
    (yargsObj) => yargsObj.option('name', {
      alias: 'n',
      demand: true,
      describe: '模板名称',
      type: 'string',
    }),
    async (argv) => {
      try {
        const answers = await inquirerPrompt(argv);
        const { name, frame } = answers;
        const isMkdirExists = checkMkdirExists(
          path.resolve(process.cwd(), `./${name}`),
        );
        if (isMkdirExists) {
          console.log(`${name}文件夹已经存在`);
        } else {
          copyDir(
            path.resolve(__dirname, `../template/${frame}`),
            path.resolve(process.cwd(), `./${name}`),
          );
        }
      } catch (e) {
        console.error('e', e);
      }
    },
  ).argv;
};

cliInit();
```

> [!TIP]
> copyDir(from, to, options)
>
> * **from**: 要拷贝目录的路径
> * **to**: 文件拷贝的目标路径
> * **options**: 指定额外的选项和配置，以控制复制过程的行为

> [!TIP]
> 脚手架中处理路径时经常使用 **Nodejs** 中 **path** 模块提供的 `path.resolve([...path])`, 将传入的多个 path参数拼接成一个绝对路径。
>
> * **__dirname** 是用来动态获取当前文件模块所属目录的绝对路径。比如在 bin/index.js 文件中使用 __dirname ，__dirname 表示就是 bin/index.js 文件所属目录的绝对路径: `/packages/mufeng-cli/bin`。
> * **process.cwd()** 当前 Nodejs 进程执行时的文件所属目录的绝对路径。比如在 bin 文件夹目录下运行 node index.js 时，process.cwd() 得到的是 `/packages/mufeng-cli/bin`。

在 /apps 目录下执行 `pnpm mufeng-cli c --name=vue`, 发现 `/packages/mufeng-cli/template/vue` 被成功复制到 `/apps` 目录下。

![mufeng-cli copy](/imgs/summary-middle/engineering/cli_5.png)

再次执行，会提示错误：

![mufeng-cli copy](/imgs/summary-middle/engineering/cli_6.png)

## 五、文件拷贝模块

文件拷贝要比目录拷贝简单，分三步实现：

* 1. 使用 `fs.readFileSync` 读取被拷贝的文件内容
* 2. 创建一个文件
* 3. 使用 `fs.writeFileSync` 写入文件内容

代码如下：

```js
const copyFile = (from, to) => {
  const buffer = fs.readFileSync(from);
  const parentPath = path.dirname(to);

  mkdirGuard(parentPath); // 创建目录

  fs.writeFileSync(to, buffer);
}

exports.copyFile = copyFile;
```

> [!TIP]
>
> * **path.dirname**: 获取指定路径的目录部分

## 六、动态文件生成模块

假设脚手架中提供的模版文件中某些信息需要根据用户输入的命令参数来动态生成对用的模版文件，可以通过 **mustache** 来实现。

安装 **mustache**。

```sh
pnpm add mustache --F mufeng-cli
```

例如在 `/packages/mufeng-cli/template/app` 目录下创建 `home.tpl`:

```vue
<template>
  {{name}}
</template>
```

然后在 `/packages/mufeng-cli/bin/copy.js` 中新增方法：

```js
/**
 * 读取模版中内容并返回
 */
const readTemplate = (dir, data = {}) => {
  const str = fs.readFileSync(dir, { encoding: 'utf8' });
  return Mustache.render(str, data);
};
```

调用时：

```js
copyTemplate(
  path.resolve(__dirname, `../template/${frame}/home.tpl`),
  path.resolve(process.cwd(), `.${name}/home.vue`),
  {
    name,
  }
)
```

重新在 /apps 目录下执行 `pnpm mufeng-cli c --name=vue`，就会将 `packages/mufeng-cli/template/vue/home.tpl` 复制到 /apps/vue 目录下, 并将模板中的 name 替换为 copyTemplate 传入的 name。

## 七、发布与安装

* 1. 登录到 npm

```js
npm login --registry=https://registry.npmjs.org/
```

* 2. 发布到 npm

```js
pnpm publish --F mufeng-cli  --registry=https://registry.npmjs.org/
```

## 八、使用

将 mufeng-cli 发布至 npm 后在本地使用：

* 1、全局安装 mufeng-cli：

```sh
pnpm install mufeng-cli -g
```

* 2、初始化项目：

```sh
mufeng-cli c --name=demo
```
