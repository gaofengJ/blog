---
title: Git
description: 工程化
---

# Git

## Git 概览图

![Git 概览图](/imgs/summary-middle/engineering/git_overview.png)

## 基本概念

* 版本库

  .git 文件夹是 Git 版本库的核心，存储了所有与版本控制相关的数据和配置。

  * .git 文件夹的位置

    * 每个 Git 项目的根目录下都有一个隐藏的 .git 文件夹，它是在你运行 `git init` 或克隆远程仓库时自动生成的

    * 如果删除 .git 文件夹，整个项目就不再是一个 Git 版本库了，因为所有版本控制数据都存储在这里

  * .git 文件夹的作用

    * 它是 Git 版本库的本地实现，包含了所有版本控制信息，比如提交历史、分支信息、远程仓库配置等

  * .git 文件夹的主要内容

    * HEAD 文件： 指向当前正在操作的分支。
    * `objects/` 文件夹： 存储所有的提交、文件快照和其他对象，通常是以哈希值命名的二进制文件。
    * `refs/` 文件夹： 存储分支和标签的引用信息。
    * config 文件： 存储项目级的 Git 配置（如远程仓库地址、用户设置等）。
    * index 文件： 保存暂存区的快照信息。
    * `logs/` 文件夹： 记录了分支、提交等操作的历史。

  * 版本库和 .git 文件夹的关系

    * 版本库可以理解为一个逻辑上的概念，它指的是你的代码和 Git 的版本控制数据的结合。
    * .git 文件夹是版本库在磁盘上的具体实现，是 Git 管理和存储项目版本信息的地方

* 工作区(Working Directory)

  * 是你平时操作文件的地方，就是项目的文件夹。
  * 在这里，你可以创建、修改、删除代码或文件。
  * 比如你打开项目文件夹写代码，这就发生在工作区

* 暂存区(Staging)

  * 是一个临时存储区域，用来记录即将提交的更改。
  * 使用 `git add` 把工作区的修改放到暂存区，表示这些更改准备好提交了。
  * 类似一个“待办清单”，提交前需要先把工作整理到这里

* 本地仓库(Repository)

  * 存储了所有的提交记录，是 Git 在你电脑上的版本库。
  * 使用 `git commit` 把暂存区的内容保存到本地仓库。
  * 就像你自己保存的历史记录，别人无法看到。

* 远程仓库

  * 是托管在服务器上的版本库，用来与团队成员共享代码。
  * 使用 `git push` 把本地仓库的提交上传到远程仓库；使用 `git pull` 或 `git fetch` 拉取远程仓库的更新到本地。
  * 比如 GitHub、GitLab 就是常见的远程仓库服务。

## Git 常见命令

### 配置

| 命令 | 作用 |
| --- | --- |
| `git config --list` | 列出当前配置 |
| `git config --local --list` | 列出 Repository 配置 |
| `git config --global --list` | 列出全局配置 |
| `git config --system --list` | 列出系统配置 |
| `git config --global user.name "your name"` | 配置用户名 |
| `git config -- global user.email "youremail@github.com"` | 配置用户邮箱 |

### 分支管理

| 命令 | 作用 |
| --- | --- |
| `git branch` | 查看本地分支 |
| `git branch -r` | 查看远程分支 |
| `git branch -a` | 查看本地和远程分支 |
| `git checkout <branch name>` | 从当前分支切换至其他分支 |
| `git checkout -b <branch name>` | 创建并切换至新分支 |
| `git branch -d <branch name>` | 删除分支 |
| `git merge <branch name>` | 当前分支与指定分支合并 |
| `git pull` | 从远程仓库获取最新的更改并将其与当前分支合并 |
| `git branch --merged` | 查看哪些分支已经合并到当前分支 |
| `git branch --no-merged` | 查看哪些分支没有合并到当前分支 |
| `git branch -v` | 查看各个分支最后一个提交对象的信息 |
| `git push origin --d <branch name>` | 删除远程分支 |
| `git branch -m <oldbranch name> <newbranch name>` | 重命名分支 |

### fetch 指令

| 命令 | 作用 |
| --- | --- |
| `git fetch <远程主机名>` | 将某个远程主机的更新，全部取回本地 |
| `git fetch <远程主机名> <分支名>` | 取回特定分支 |
| `git fetch origin <branch name>:<local name>` | 取回特定分支，并拉取至本地分支 |

### 其他高频命令

* `git stash`

  示例：

  1. 保存修改到栈中

  ```bash
  git stash
  ```

  * 保存当前的工作区和暂存区的修改到栈中。
  * 工作区会恢复到最后一次提交的干净状态。

  2. 查看保存的内容

  ```bash
  git stash list
  ```

  * 显示所有保存的 stash。
  * 输出类似：stash@{0}: WIP on main: ...。

  3. 恢复保存的修改

  ```bash
  git stash pop
  ```

  * 取回最近一次保存的修改，并删除保存记录

* `git reset`

  用于调整当前分支的提交记录和工作区的状态。它有三种主要模式：`--soft`、`--mixed`（默认）和 `--hard`。

  * `git reset --soft`

    将 HEAD 指向指定的提交，但不会修改暂存区或工作区的内容。适用于希望保留更改，并重新组织提交的情况。

    ```bash
    git reset --soft HEAD~1
    git commit -m "重新组织后的提交"
    ```

  * `git reset --mixed`(默认)

    将 HEAD 和暂存区重置到指定提交，同时保留工作区的更改。这适用于想要撤销提交并将更改重新编辑的情况。

    ```bash
    git reset HEAD~1
    git add .
    git commit -m "修正后的提交"
    ```

  * `git reset --hard`

    将 HEAD、暂存区和工作区全部重置为指定提交的状态，所有未提交的更改都会被丢弃。此操作不可逆，因此使用前需谨慎。

    ```bash
    git reset --hard HEAD~1
    ```

* `git revert`

  通过创建一个新的提交，反转一个或多个已完成的提交内容，而不会修改 Git 历史。这是一个“安全”的方法，用于撤销更改，因为它不会破坏项目的提交历史。

  ```bash
  git revert <commit_hash>
  ```

* `cherry pick`

  将某个提交（commit）的改动从一个分支复制到另一个分支，而无需合并整个分支。这对于选择性地引入特定更改非常有用，例如修复生产环境的紧急问题时，可以直接将开发分支中的修复提交到主分支

* `git reflog`

  记录所有分支和 HEAD 的历史变动，包括那些通常不会出现在 git log 中的操作，例如分支切换、重置（reset）、合并（merge）等。它可以帮助开发者查看最近对仓库引用（如 HEAD）所做的更改，是一种强大的回溯工具，用于找回丢失的提交或者误操作的状态。

* `git config --global alias.ps push`

  设置 git 短命令

## `git reset` 和 `git revert` 区别

`git reset` 和 `git revert` 都可以用来撤销 Git 提交，但它们的行为和适用场景不同：

* `git reset` 主要用于修改当前分支的历史，它可以重置到某个特定的提交点并改变 HEAD 指向的提交。可以选择不同的选项：

  * `--soft`：保留文件改动，仅重置 HEAD。
  * `--mixed`（默认）：保留文件改动并重置暂存区。
  * `--hard`：彻底删除提交的文件改动，包括暂存区和工作区的内容。 `git reset` 适用于撤销提交、移除不想要的提交记录，但可能会修改历史，因此需要小心，尤其在多人协作的情况下。

* `git revert` 会创建一个新的提交，这个提交是对目标提交的逆操作。也就是说，它不会改变历史，只是“反向”执行某次提交的内容，并将其作为新的提交添加到当前分支。`git revert` 适用于需要撤销某个提交的内容，但又不希望改变项目的历史（特别是在共享仓库中）。

总结来说：

* `git reset` 更适合局部修改或重置提交历史，但会修改 Git 历史。
* `git revert` 用于不改变历史的撤销操作，适合公开仓库中。

## `git pull` 和 `git fetch` 区别

`git pull` 和 `git fetch` 都是用于从远程仓库获取更新的 Git 命令，但它们的行为有所不同。

* `git fetch` 仅从远程仓库获取更新数据，更新本地仓库中的远程追踪分支，但不会自动合并这些更新到你的当前分支。你需要手动执行 git merge 来将远程分支的更改合并到你的工作分支。
* `git pull` 是 `git fetch` 和 `git merge` 的组合。它会先从远程仓库获取更新数据（就像 `git fetch` 一样），然后自动将这些更新合并到你当前的工作分支。

> [!TIP]
>
> 合并远程分支到本地：`git merge origin/feature-branch`

## `git merge` 和 `git rebase` 的区别

在 git 中，`git merge` 和 `git rebase` 是两种用于整合分支历史的工具，但它们的工作方式和结果有所不同：

* **git merge**

  * 作用：将两个分支合并，同时保留分支的独立历史。
  * 结果：创建一个合并提交（merge commit），其包含了两个父提交的历史。如果使用 `--no-ff`（非快速合并），git 会始终创建一个新的合并提交。
  * 适用场景：适合在团队合作中用来直观展示分支的开发历程和合并点。

* **git rebase**

  * 作用：重新排列或平滑历史，目的是让分支历史线性化。
  * 结果：复制并重新应用分支上的每个提交到目标分支上，产生新的提交 id。
  * 适用场景：适合在个人开发中使用，保持项目历史简洁，但会重写提交历史。

* **主要区别**

  * 历史清晰度：merge 保留了分支历史和合并点，适合复杂团队协作；而 rebase 会“隐藏”分支历史，只留下线性记录。
  * 冲突解决：在 merge 中，冲突解决只需一次，但 rebase 需要逐步解决每次提交的冲突。
  * 使用时机：merge 更适合共享仓库的公开分支；rebase 适合个人分支，尤其是未与其他人共享时。

| 特性| `git merge --no-ff` | `git rebase` |
| --- | --- | --- |
| 历史结构 | 分支历史完整保留，包含合并点 | 重写历史，提交线性化 |
| 合并提交 | 创建一个新的合并提交 | 没有合并提交，所有提交被重新应用 |
| 冲突解决 | 只需一次解决所有冲突 | 每个提交可能需要单独解决冲突 |
| 适用场景 | 适合团队协作，强调分支开发历史 | 适合个人分支清理历史，保持简单清晰 |
