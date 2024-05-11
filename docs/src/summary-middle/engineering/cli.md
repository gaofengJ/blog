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

## 前提: 全局安装 pnpm

```js
npm install pnpm -g
```

### 1、新建项目

创建 cli 目录, 使用 `pnpm init` 初始化项目。

### 2、在根目录下创建 pnpm-workspace.yaml 工作空间配置文件

```yml
packages:
  - 'packages/*'
  - 'apps/*'
```

配置后, 声明了 packages 和 apps 目录中子工程是同属一个工作空间的, 工作空间中的子工程编译打包的产物都可以被其它子工程引用。

### 3、在 packages下初始化项目

在根目录下创建 packages 目录, 并在 packages 目录中新建 cli 目录。

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

在 `packages/cli` 中创建 bin 目录, 并新建 index.js, 并在文件中添加如下代码:

```js
#!/usr/bin/env node

console.log('Welcome to experience Mufeng-cli');
```

> [!TIP]
>
> * **#!/usr/bin/env node** 出现在脚本文件的第一行, 用于指定脚本的解释器。
> * **/usr/bin/env** 是一个 Unix/Linux 系统中用来查找环境中的可执行文件的标准路径, **node** 是 Node.js 的可执行文件名。
> * 具体来说, 就是告诉操作系统在执行这个脚本时使用 node解释器。

在根目录下创建 apps 目录, 并在 apps 目录中新建 app 目录。

通过 `pnpm init` 命令来初始化一个工程。

我们在 apps/app/pakeage.json 中添加 dependencies 字段, 来添加 mufeng-cli 依赖。再给 scripts 增加一条自定义脚本命令。完成后代码如下:

```json
{
  "name": "app",
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

安装成功后, 在 app 目录下运行 pnpm mufeng-cli, 会发现命令行窗口打印出 Welcome to experience Mufeng-cli, 脚手架工程的搭建就成功了。

![mufeng-cli log](/imgs/summary-middle/engineering/cli_1.png)

此时整个工程的目录结构如下所示:

```md
|-- cli
  |-- node_modules
  |-- apps
    |-- app
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

在 /apps/app 目录下运行 pnpm mufeng-cli --name=hello, 结果如图所示:

![mufeng-cli yargs](/imgs/summary-middle/engineering/cli_2.png)

### 3、设置自命令

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

在 /apps/app 目录下分别运行 pnpm mufeng-cli create --name=hello 和 pnpm mufeng-cli c --name=hello 命令, 执行结果如下图所示:

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

在/apps/app目录下执行 `pnpm mufeng-cli c --n=hello`, 结果如图所示：

![mufeng-cli inquirer](/imgs/summary-middle/engineering/cli_4.png)

回答完成后，可以在下图中清楚地看到答案格式。

## 四、文件拷贝模块

要生成一个模板文件，最简单的做法就是执行脚手架提供的命令后，把脚手架中的模板文件，拷贝到对应的地方。模板文件可以是单个文件，也可以是一个文件夹。本小节先介绍一下模板文件是文件夹时候如何拷贝。

在 Node.js 中拷贝文件夹并不简单，需要用到递归，这里推荐使用开源库 **copy-dir** 来实现拷贝文件。

安装 **copy-dir**。

```sh
pnpm add copy-dir --F mufeng-cli
```
