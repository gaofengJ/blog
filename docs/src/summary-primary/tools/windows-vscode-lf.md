---
title: Windows下换行符问题解决
description: 研发工具
---

# Windows 下换行符问题解决

如果在 Visual Studio Code 中遇到 "Expected linebreaks to be 'LF' but found 'CRLF'" 的错误，这通常是因为编辑器中的文件使用了不同的行尾符（line endings）。

换行符在不同的操作系统中有不同的表示方式。在 Windows 中，换行符通常是 CRLF（\r\n），而在 Unix/Linux 和 macOS 中通常是 LF（\n）。由于这种差异可能导致跨平台协作时的问题，因此 Git 提供了 core.autocrlf 选项来自动处理换行符。

打开git，执行`git config --global core.autocrlf input`，然后重新clone远程代码，即可解决问题。

`git config --global core.autocrlf input` 是 Git 的一个配置选项，用于指定在检出和提交时如何处理换行符。这个配置选项的含义如下：

* `core.autocrlf` 这是一个 Git 的配置选项，用于指定是否自动转换换行符

* `input` 这是 core.autocrlf 的一个设置值，表示在提交时不进行换行符自动转换，但在检出时将换行符转换为 LF
