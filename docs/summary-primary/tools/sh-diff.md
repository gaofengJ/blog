---
title: ~/.bash_profile, ~/.zshrc, ~/.profile, ~/.bashrc的区别
description: 研发工具
---

## .bashrc

* 系统启动后自动运行
* 进行设置后，可运行`source bashrc`命令更新 `.bashrc`

## .profile

* 进行设置后，可运行`source profile`命令更新 .profile
* **通常我们修改 `.bashrc`，有些 Linux 的发行版本不一定有 profile 这个文件**

## /etc、/profile

`/etc`、`/profile` 中设定的变量(全局)的可以作用于任何用户，而 `~/.bashrc`、`~/.profile` 等中设定的变量(局部)只能继承 `/etc`、`/profile` 中的变量，他们是"父子"关系。

## .bash_profile

* 每个用户都可使用该文件输入专用于自己使用的 shell 信息，当用户登录时，该文件仅仅执行一次！默认情况下,它设置一些环境变量，执行用户的 `.bashrc` 文件
* 当每次退出系统(退出bash shell)时，执行 `~/.bash_logout`
* `~/.bash_profile`是交互式、login 方式进入bash运行的
* `~/.bashrc`是交互式 non-login 方式进入bash运行的，通常二者设置大致相同，所以通常前者会调用后者

## .zshrc

* zsh终端命令工具的全局变量设置，和 bashrc 区别是 默认很多 linux 系统是 base，就配置在 bashrc 里
* 如里是使用 zsh 就配置在 zshrc 里
