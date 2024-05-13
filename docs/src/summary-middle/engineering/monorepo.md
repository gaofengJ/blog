---
title：Monorepo
description：工程化
---

# Monorepo

转载参考[带你了解更全面的 Monorepo - 优劣、踩坑、选型](https://juejin.cn/post/7215886869199896637?searchId=202404182031373E5EA02201ECEA18BAC6)

## 一、Monorepo介绍

Monorepo 是一种项目代码管理方式，指单个仓库中管理多个项目，有助于简化代码共享、版本控制、构建和部署等方面的复杂性，并提供更好的可重用性和协作性。Monorepo 提倡了开放、透明、共享的组织文化，这种方法已经被很多大型公司广泛使用，如 Google、Facebook 和 Microsoft 等。

## 二、Monorepo演进

### 阶段一：单仓库巨石应用

一个 Git 仓库维护着项目代码，随着迭代业务复杂度的提升，项目代码会变得越来越多，越来越复杂，大量代码构建效率也会降低，最终导致了单体巨石应用，这种代码管理方式称之为 Monolith（单体架构）。

### 阶段二：多仓库多模块应用

于是将项目拆解成多个业务模块，并在多个 Git 仓库管理，模块解耦，降低了巨石应用的复杂度，每个模块都可以独立编码、测试、发版，代码管理变得简化，构建效率得以提升，这种管理方式称之为 MultiRepo。

### 阶段三：单仓库多模块应用

随着业务复杂度的提升，模块仓库越来越多， MultiRepo 这种方式虽然从业务上解耦了，但增加了项目工程管理的难度，随着模块仓库达到一定数量级，会有几个问题:

* 跨仓库代码难共享；
* 分散在单仓库的模块依赖挂你复杂（底层模块升级后，其他上层依赖需要及时更新，否则会有问题）；
* 增加了构建耗时；

于是将多个项目集成到一个仓库下，共享工程配置，同时又便捷地共享模块代码成为趋势，这种代码管理方式称之为 MonoRepo。

![仓库管理多模式对比](/imgs/summary-middle/engineering/package_monorepo_1.png)

## 三、Monorepo 优劣

![Multi与Mono对比](/imgs/summary-middle/engineering/package_monorepo_2.png)

| 场景 | MultiRepo | MonoRepo |
| --- | --- | --- |
| 代码可见性 | :white_check_mark：代码隔离，研发者只需关注自己负责的仓库<br/><br/>:x：包管理按照各自owner划分，当出现问题时，需要到依赖包中进行判断并解决 | :white_check_mark：一个仓库中多个项目，很容易看见整个代码库<br/><br/>:x：增加了非owner改动代码的风险 |
| 依赖管理 | :x：多个仓库都有自己的node_modules，存在依赖重复安装的情况，占用磁盘内存大 | :white_check_mark：多项目代码都在一个仓库中，相同版本依赖提升到顶层只安装一次，节省磁盘内存 |
| 代码权限 | :white_check_mark：个项目单独仓库，不会出现代码被误改的情况，单个项目出现问题不会影响其他项目 | :x：多个项目代码都在一个仓库中，没有项目粒度的权限管控，一个项目出问题，可能影响所有项目 |
| 开发迭代 | :white_check_mark：仓库体积小，模块划分清晰，可维护性强<br/><br/>:x：多仓库来回切换（编辑器及命令行），项目多的话效率很低。多仓库见存在依赖时，需要手动 `npm link`，操作繁琐。<br/><br/>:x：依赖管理不便，多个依赖可能在多个仓库中存在不同版本，重复安装，npm link 时不同项目的依赖会存在冲突。 | :white_check_mark：多个项目都在一个仓库中，可看到相关项目全貌，编码非常方便。<br/><br/>:white_check_mark：代码复用高，方便进行代码重构。<br/><br/>:x：多项目在一个仓库中，代码体积多大几个 G，git clone时间较长。<br/><br/>:white_check_mark：依赖调试方便，依赖包迭代场景下，借助工具自动 npm link，直接使用最新版本依赖，简化了操作流程。 |
| 工程配置 | :x：各项目构建、打包、代码校验都各自维护，不一致时会导致代码差异或构建差异。 | :white_check_mark：多项目在一个仓库，工程配置一致，代码质量标准及风格也很容易一致。 |
| 构建部署 | :x：多个项目间存在依赖，部署时需要手动到不同的仓库根据先后顺序去修改版本及进行部署，操作繁琐效率低。 | :white_check_mark：构建性 Monorepo 工具可以配置依赖项目的构建优先级，可以实现一次命令完成所有的部署。 |

## 四、Monorepo场景

综合 Monorepo VS MultiRepo，**中大型项目，多模块项目**，更适合用MonoRepo的方式管理代码，在开发、协作效率、代码一致性方面都有更好的效果。

## 五、Monorepo踩坑

### 1、幽灵依赖

**Q**：npm/yarn 安装依赖时，存在依赖提升，某个项目使用的依赖，并没有在其 package.json 中声明，也可以直接使用，这种现象称之为 “幽灵依赖”；随着项目迭代，这个依赖不再被其他项目使用，不再被安装，使用幽灵依赖的项目，会因为无法找到依赖而报错。

**A**：基于 npm/yarn 的 Monorepo 方案，依然存在 “幽灵依赖” 问题，我们可以通过 pnpm 彻底解决这个问题。

### 2、安装依赖耗时长

**Q**：MonoRepo 中每个项目都有自己的 package.json 依赖列表，随着 MonoRepo 中依赖总数的增长，每次 install 时，耗时会较长。

**A**：相同版本依赖提升到 Monorepo 根目录下，减少冗余依赖安装；使用 pnpm 按需安装及依赖缓存。

### 3、构建打包耗时长

**Q**：多个项目构建任务存在依赖时，往往是串行构建 或 全量构建，导致构建时间较长。

**A**：增量构建，而非全量构建；也可以将串行构建，优化成并行构建。

## 六、Monorepo选型

### 6.1、构建型 Monorepo 方案

此类工具，主要解决大仓库 Monorepo 构建效率低的问题。项目代码仓库越来越庞大，工作流（int、构建、单元测试、集成测试）也会越来越慢；这类工具，是专门针对这样的场景进行极致的性能优化。适用于包非常多、代码体积非常大的 Monorepo 项目。

#### 6.1.1、 Turborepo

[Turborepo](https://turbo.build/) 是 Vercel 团队开源的高性能构建代码仓库系统，允许开发者使用不同的构建系统。

**构建加速思路**:

* **Multiple Running Task**：构建任务并行进行，构建顺序交给开发者配置
* **Cache、Remote Cache**：通过缓存 及 远程缓存，减少构建时间

#### 6.1.2、 Rush

[Rush](https://rushstack.io/) 是微软开发的可扩展的 Monorepo 工具及解决方案。早期，只提供了 Rush 作为构建调取器，其余事项交给用户灵活的选择任意构建工具链，由于过于灵活带来了很大的选型及维护成本，后来成立了 Rush Stack 来提供了一套可复用的解决方案，涵盖多项目的构建、测试、打包和发布，实现了更强大的工作流。

#### 6.1.3、Nx

Nx 是 Nrwl 团队开发的，同时在维护 Lerna，目前 Nx 可以与 Learn 5.1及以上集成使用。

**Rush 功能列举**

* 解决了幽灵依赖：将项目所有依赖都安装到 Repo根目录的common/temp下，通过软链接到各项目，保证了 node_modules 下依赖与 package.json 一致

* 并行构建：Rush 支持并行构建多个项目，提高了构建效率

* 插件系统：Rush 提供了丰富的插件系统，可以扩展其功能，满足不同的需求，具体参考

* 项目发布，ChangeLog 支持友好：自动修改项目版本号，自动生成 ChangeLog

**构建加速思路（比 Turborepo 更丰富）**

* 缓存： 通过缓存 及 远程缓存，减少构建时间（远程缓存：Nx 公开了一个公共 API，它允许您提供自己的远程缓存实现，Turborepo 必须使用内置的远程缓存）
* 增量构建： 最小范围构建，非全量构建
* 并行构建： Nx 自动分析项目的关联关系，对这些任务进行排序以最大化并行性
* 分布式构建： 结合 Nx Cloud，您的任务将自动分布在 CI 代理中（多台远程构建机器），同时考虑构建顺序、最大化并行化和代理利用率

### 6.2、轻量级 Monorepo 方案

#### 6.2.1、Lerna

**Lerna是什么？**

* Lerna 是 Babel 为实现 Monorepo 开发的工具；最擅长管理依赖关系和发布
* Lerna 优化了多包工作流，解决了多包依赖、发版手动维护版本等问题
* Lerna 不提供构建、测试等任务，工程能力较弱，项目中往往需要基于它进行顶层能力的封装

**Lerna主要做三件事**

* 为单个包或多个包运行命令 (lerna run)
* 管理依赖项 (lerna bootstrap)
* 发布依赖包，处理版本管理，并生成变更日志 (lerna publish)

**Lerna解决了什么问题**

* 代码共享，调试便捷： 一个依赖包更新，其他依赖此包的包/项目无需安装最新版本，因为 Lerna 自动 Link
* 安装依赖，减少冗余：多个包都使用相同版本的依赖包时，Lerna 优先将依赖包安装在根目录
* 规范版本管理： Lerna 通过 Git 检测代码变动，自动发版、更新版本号；两种模式管理多个依赖包的版本号
* 自动生成发版日志：使用插件，根据 Git Commit 记录，自动生成 ChangeLog

**lerna自动检测发布的判断逻辑**

1. 校验本地是否有没有被 commit 内容？
2. 判断当前的分支是否正常？
3. 判断当前分支是否在 remote 存在？
4. 判断当前分支是否在 lerna.json 允许的 allowBranch 设置之中？
5. 判断当前分支提交是否落后于 remote

**Lerna工作模式**

Lerna 允许您使用两种模式来管理您的项目：固定模式(Fixed)、独立模式(Independent)。

**固定模式**

* Lerna 把多个软件包当做一个整体工程，每次发布所有软件包版本号统一升级（版本一致），无论是否修改
* 项目初始化时，lerna init 默认是 Locked mode

```json
{
  "version"："0.0.0"
}
```

**独立模式**

* Lerna 单独管理每个软件包的版本号，每次执行发布指令，Git 检查文件变动，只发版升级有调整的软件包
* 项目初始化时，lerna init --independent

```json
{
  "version"："independent"
}
```

**Lerna常用指令**

1、初始化：`lerna init`

执行成功后，目录下将会生成这样的目录结构。

```json
- packages(目录)
- lerna.json(配置文件)
- package.json(工程描述文件)
```

```json
{
  "version"："0.0.0",
  "useWorkspaces"：true,
  "packages"：[
    "packages/*",
  ],
}
```

需要在项目根目录下的 package.json中设置 "private"：true。

```json
{
  "name"："xxxx",
  "version"："0.0.1",
  "description"："",
  "main"："index.js",
  "private"：true,
  "scripts"：{
    "test"："echo "Error：no test specified" && exit 1"
  },
  "keywords"：[],
  "author"："",
  "license"："ISC",
  "devDependencies"：{
    "lerna"："^6.4.1"
  },
  "workspaces"：[
    "packages/*"
  ]
}
```

2、创建package：`lerna create`

```json
lerna create <name> [location]

lerna create package1
```

执行 `lerna init` 后，默认的 `lerna workspace` 是 `packages/*`，需要手动修改 `package.json` 中的 `workspaces`，再执行指令生成特定目录下的 package。

```json
# 在 packages/pwd1 目录下，生成 package2 依赖包
lerna create package2 packages/pwd1
```

3、给package添加依赖：`lerna add`

安装的依赖，如果是本地包，Lerna 会自动 npm link 到本地包。

```json
# 给所有包安装依赖，默认作为 dependencies
lerna add module-1
lerna add module-1 --dev # 作为 devDependencies
lerna add module-1 --peer # 作为 peerDependencies
lerna add module-1[@version] --exact  # 安装准确版本的依赖

lerna add module-1 --scope=module-2  # 给指定包安装依赖
lerna add module-1 packages/prefix-*  # 给前缀为 xxx 的包，安装依赖
```

4、给所有 package 安装依赖：`lerna bootstrap`

```json
# 项目根目录下执行，将安装所有依赖
lerna bootstrap
```

执行 `lerna bootstrap`，会自动为每个依赖包进行 `npm install` 和 `npm link` 操作。

**关于冗余依赖的安装**

* npm 场景下 lerna bootstrap 会安装冗余依赖（多个 package 共用依赖，每个目录都会安装）
* yarn 会自动 hosit 依赖包（相同版本的依赖，安装在根目录），无需关心

**npm场景下冗余依赖解决方案**

* 方案一： `lerna bootstrap --hoist`
* 方案二：配置 `lerna.json/command.bootsrap.hoist = true`

5、给 package 执行 shell 指令：`lerna exec`

```json
# 删除所有包内的 lib 目录
lerna exec -- rm -rf lib

# 给xxx软件包，删除依赖
lerna exec --scope=xxx -- yarn remove yyy
```

6、给 package 执行 scripts 指令：`lerna run`

```json
# 所有依赖执行 package.json 文件 scripts 中的指令 xxx
lerna run xxx

# 指定依赖执行 package.json 文件 scripts 中的指令 xxx
lerna run --scope=my-component xxx
```

7、清除所有 package 下的依赖：`lerna clean`

```json
# 清楚所有依赖包下的 node_modules，根目录下不会删除
lerna clean
```

8、发布软件包，自动检测：`lerna publish`

`lerna publish` 做那些事儿

* 运行lerna updated来决定哪一个包需要被publish
* 如果有必要，将会更新lerna.json中的version
* 将所有更新过的的包中的package.json的version字段更新
* 将所有更新过的包中的依赖更新
* 为新版本创建一个git commit或tag
* 将包publish到npm上

9、查看自上次发布的变更：`lerna diff`、`lerna changed`。

```json
# 查看自上次relase tag以来有修改的包的差异
lerna diff

# 查看自上次relase tag以来有修改的包名
lerna changed
```

10、导入已有包：`lerna import`

```json
lerna import [npm 包所在本地路径]
```

11、列出所有包：`lerna list`

```json
lerna list
```

#### 6.2.2、pnpm + workspace

**Workspace协议（workspace:）

默认情况下，如果可用的 packages 与已声明的可用范围相匹配，pnpm 将从工作区链接这些 packages。 例如, 如果bar引用"foo": "^1.0.0"并且foo@1.0.0存在工作区，那么pnpm会从工作区将foo@1.0.0链接到bar。 但是，如果 bar 的依赖项中有 "foo": "2.0.0"，而 foo@2.0.0 在工作空间中并不存在，则将从 npm registry 安装 foo@2.0.0 。 这种行为带来了一些不确定性。

幸运的是，pnpm 支持 workspace 协议 workspace: 。 当使用此协议时，pnpm 将拒绝解析除本地 workspace 包含的 package 之外的任何内容。 因此，如果您设置为 "foo": "workspace:2.0.0" 时，安装将会失败，因为 "foo@2.0.0" 不存在于此 workspace 中。

yarn及npm的新版本都新增 workspace 能力，不借助 Lerna也可以提供原生的 Monorepo 支持。建议使用 pnpm + workspace 的方案，下面是一个使用 pnpm + workspace 搭建脚手架的例子：

1、使用 `pnpm init` 初始化项目，然后创建 `pnpm-workspace.yaml` 工作空间配置文件:

```yml
packages:
  - 'packages/*'
  - 'apps/**'
```

配置后，声明了 packages 和 apps 目录中子工程是同属一个工作空间的，工作空间中的子工程编译打包的产物都可以被其它子工程引用。

2、在 /packages 目录下创建 `mufeng-cli`，并在 /packages/mufeng-cli 中执行 `pnpm init` 初始化项目，package.json内容如下：

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
  },
}

```

3、在 /packages 目录下创建 apps 目录，同样在 /packages/apps 中执行 `pnpm init` 初始化项目，package.json内容如下：

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
}

```

4、在 /packages 目录（根目录下所有子孙目录都可以）下执行 `pnpm i mufeng-cli --F apps`，就会将 /packages/mufeng-cli 的包添加到 /packages/apps 的依赖中：

```json
{
  "dependencies": {
    "mufeng-cli": "workspace:*"
  }
}
```

> [!TIP]
>
> * **--F**: **--filter**的缩写, 表示只安装在指定的路径下。这里指将 yargs 安装在 mufeng-cli 目录下
> * **mufeng-cli** 是取 packages/mufeng-cli 中 package.json 中 name 字段的值
> * **apps** 是取 子工程中 package.json 中 name 字段的值, 而不是 apps 子工程目录的名称

常用命令：

* `pnpm i -w`：在当前工作目录下的工作区中安装所有项目的依赖，而不需要进入每个项目的目录分别执行安装命令
* `pnpm add yargs --F mufeng-cli`：在package.json 的 name=mufeng-cli 的子目录下添加依赖 yargs

**pnpm workspace VS lerna**

* **pnpm + workspace** 更突出对依赖的管理：依赖提升到根目录的 node_modules 下，安装更快，体积更小

* **Lerna** 更突出工作流方面：使用 Lerna 命令来优化多个包的管理，如：依赖发包、版本管理，批量执行脚本
