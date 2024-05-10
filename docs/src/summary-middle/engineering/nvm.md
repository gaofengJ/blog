---
title: nvm
description: 工程化
---

# nvm

nvm 是 Node.js 的版本管理工具，可以创建不同版本 Node 的隔离环境，从而避免不同版本包之间的干扰。

## 安装过程

### 一、卸载全局安装的Node

安装 nvm 之前最好是将现有的全局 Node 进行卸载，否则会发生冲突。

#### 1、终端下查看 Node 的全局安装目录

```sh
which node
/usr/local/bin/node
```

#### 2、Mac 环境下全局的 Node 会被安装在 `/usr/local/bin/` 目录下，接下来打开这个目录

#### 3、打开访达，然后按下快捷键 `⇧ + ⌘ + G`，输入上面的目录，即可打开对应的目录

#### 4、接下来依次检查并且删除这些目录下的 node 和 node_modules 相关文件和文件夹

* `/usr/local/lib`
* `/usr/local/include`

#### 5、打开 `/usr/local/bin` 并删除 node 可执行文件

#### 6、如果你是使用的 `brew install node` 安装的 Node，那么你还需要在终端中执行 `brew uninstall node` 命令来卸载

至此，全局安装的 Node 才算卸载干净。

### 二、安装nvm

#### 1、直接安装

```sh
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

重启命令行会话后生效。

#### 2、手动安装，比如使用 Homebrew 来安装 nvm

(1). 安装 Homebrew：

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

(2). 安装 nvm：

```sh
brew update 
brew install nvm
```

(3). 将以下两行代码加到你的启动脚本中 (~/.bash_profile, ~/.zshrc, ~/.profile, 或者 ~/.bashrc)：

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

~/.bash_profile, ~/.zshrc, ~/.profile, ~/.bashrc的区别请查看[~/.bash_profile, ~/.zshrc, ~/.profile, ~/.bashrc的区别](../../summary-primary/tools/sh-diff.md)

### 三、测试

输入以下命令来测试 nvm 是否安装成功。

```sh
npm --version
0.33.6
```

## nvm 常用命令

| 命令                      | 作用                                                                                   |
|---------------------------|--------------------------------------------------------------------------------------|
| nvm ls-remote             | 查看 Node 远程版本库                                                                   |
| nvm install node          | 将安装最新版本的 Node                                                                  |
| nvm install v12.7.0       | 将安装 12.7.0 版本的 Node                                                              |
| nvm uninstall v12.7.0     | 卸载 12.7.0 版本的 Node                                                                |
| nvm ls                    | 查看已经安装的 Node 版本                                                               |
| nvm use v12.7.0           | 切换 12.7.0 为当前使用的版本                                                           |
| nvm alias default v12.7.0 | 将 12.7.0 设置为 Node 的默认版本                                                       |
| nvm which v12.7.0         | 查看 12.7.0 版本的 Node 的安装目录，<br/>比如：/Users/ccp/.nvm/versions/node/v12.7.0/bin/node |
| nvm --help                | 查看更多命令用法                                                                       |
