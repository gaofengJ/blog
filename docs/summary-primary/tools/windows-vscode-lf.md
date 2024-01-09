---
title: 解决Windows下VS Code中Expected linebreaks to be 'LF' but found 'CRLF'报错问题
description: 研发工具
---

如果在 Visual Studio Code 中遇到 "Expected linebreaks to be 'LF' but found 'CRLF'" 的错误，这通常是因为编辑器中的文件使用了不同的行尾符（line endings）。

打开git，执行`git config --global core.autocrlf input`，然后重新clone远程代码，即可解决问题。
