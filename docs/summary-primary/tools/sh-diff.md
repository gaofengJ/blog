---
title: 用户环境文件对比
description: 研发工具
---

* ~/.bash_profile：

  * 这个文件是bash shell的配置文件，用于登录时加载用户环境设置。
  * 当用户登录时，bash会首先查找并执行该文件。
  * 通常用于设置环境变量、执行用户特定的命令等。
  * 只在bash登录时执行一次。

* ~/.bashrc：

  * 这也是bash shell的配置文件，但它在每次新打开一个交互式bash shell时都会被加载。
  * 如果你希望配置适用于所有bash shell的用户级别设置，通常会将其写入这个文件。
  * 通常用于定义别名、设置提示符、加载其他shell脚本等。

* ~/.profile：

  * 这是Unix/Linux系统中通用的shell配置文件，用于登录时加载用户环境设置。
  * 与~/.bash_profile类似，但更通用，因为它适用于所有shell，而不仅仅是bash。
  * 如果你需要在不同的shell中使用相同的配置，可以将配置写入这个文件。

* ~/.zshrc：

  * 这是zsh shell的配置文件，用于每次新打开一个交互式zsh shell时加载。
  * 如果你使用zsh作为默认的shell，你会将用户级别的zsh配置写入这个文件。
  * 通常用于定义别名、设置主题、加载插件等。
