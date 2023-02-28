---
title: Markdown推荐语法
description: Markdown推荐语法
---

本文摘自官方文档，记录Markdown推荐的书写语法，仅供查阅。

参考：

[Markdown官方教程](https://markdown.com.cn/intro.html)

[Markdown 书写风格指南](https://einverne.github.io/markdown-style-guide/zh.html)

## Markdown基础

### Markdown是什么

Markdown 是一种轻量级的标记语言，可用于在纯文本文档中添加格式化元素。Markdown 由 John Gruber 于 2004 年创建，如今已成为世界上最受欢迎的标记语言之一。

> Markdown 语法的首要设计目标是尽可能易读。基于这个目标，Markdown 格式的文档能够以纯文本形式原样发布，而不会看起来像被填满了标签或格式化指令。

### 为什么使用Markdown

* **Markdown 无处不在**  
StackOverflow、CSDN、掘金、简书、GitBook、有道云笔记、V2EX、光谷社区等。
主流的代码托管平台，如 GitHub、GitLab、BitBucket、Coding、Gitee 等等，
都支持 Markdown 语法，很多开源项目的 README、开发文档、帮助文档、Wiki 等都用 Markdown 写作。

* **Markdown 是纯文本可移植的**  
几乎可以使用任何应用程序打开包含 Markdown 格式的文本文件。
如果你不喜欢当前使用的 Markdown 应用程序了，则可以将 Markdown 文件导入另一个 Markdown 应用程序中。
这与 Microsoft Word 等文字处理应用程序形成了鲜明的对比，Microsoft Word 将你的内容锁定在专有文件格式中。

* **Markdown 是独立于平台的**  
你可以在运行任何操作系统的任何设备上创建 Markdown 格式的文本。

* **Markdown 能适应未来的变化**  
即使你正在使用的应用程序将来会在某个时候不能使用了，你仍然可以使用文本编辑器读取 Markdown 格式的文本。当涉及需要无限期保存的书籍、大学论文和其他里程碑式的文件时，这是一个重要的考虑因素。

### Markdown有什么用

Markdown 是做笔记、为网站创建内容以及生成可打印文档的快速、简便的方法。

学习 Markdown 语法并不需要很长时间，一旦你知道如何使用它，你就可以在几乎所有地方使用 Markdown 进行书写了。
大多数人使用 Markdown 来为网站创建内容，但是 Markdown 也可以很好地格式化从电子邮件到购物清单的所有内容。

下面是一些你可以使用 Markdown 的场景。

* 网站
* 文件资料
* 笔记
* 书籍
* 演示文稿
* 邮件
* 文档

### Markdown方言

使用 Markdown 的过程中，最令人困惑的地方是：实际上每个 Markdown 应用程序都实现了稍有不同的 Markdown 语法。
Markdown 的这些变体通常被称为 flavors（方言）。掌握你的应用程序所实现的 Markdown 语法是你需要主义的。

### Markdown在线编辑

[Markdown在线编辑](https://markdown.com.cn/editor/)

## Markdown速查表

### 基本语法

这些是 John Gruber 的原始设计文档中列出的元素。所有 Markdown 应用程序都支持这些元素。

| 元素                     | Markdown语法                                           |
|------------------------|--------------------------------------------------------|
| 标题（Heading）            | `# H1`<br>`## H2`<br>`### H3`                          |
| 粗体（Bold）               | `**bold text**`                                        |
| 斜体（Italic）             | `*italicized text*`                                    |
| 引用块（Blockquote）       | `> blockquote`                                         |
| 有序列表（Ordered List）   | `1. First item`<br>`2. Second item`<br>`3. Third item` |
| 无序列表（Unordered List） | `* First item`<br>`* Second item`<br>`* Third item`    |
| 代码（Code）               | `` `code` ``                                           |
| 分隔线（Horizontal Rule）  | `---`                                                  |
| 链接（Link）               | `[title](https://www.example.com)`                     |
| 图片（Image）              | `![alt text](image.jpg)`                               |

### 扩展语法

这些元素通过添加额外的功能扩展了基本语法。但是，并非所有 Markdown 应用程序都支持这些元素。

| 元素                      | Markdown 语法                                                                                                                                   |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| 表格（Table）               | `\| Syntax \| Description \|`<br>`\| ----------- \| ----------- \|`<br>`\| Header      \| Title       \|`<br>`\| Paragraph   \| Text        \|` |
| 代码块（Fenced Code Block） | ` ``` `<br>`{`<br>`"firstName": "John",`<br>`"lastName": "Smith",`<br>`"age": 25`<br>`}`<br>` ``` `                                             |
| 脚注（Footnote）            | Here's a sentence with a footnote.<br>`[^1]`<br>`[^1]`: This is the footnote.                                                                   |
| 标题编号（Heading ID）      | `### My Great Heading {#custom-id}`                                                                                                             |
| 定义列表（Definition List） | `term`<br>`: definition`                                                                                                                        |
| 删除线（Strikethrough）     | `~~The world is flat.~~`                                                                                                                        |
| 任务列表（Task List）       | `- [x] Write the press release`<br>`* [ ] Update the website`<br>`* [ ] Contact the media`                                                      |

## 基本语法

### 标题

要创建标题，请在单词或短语前面添加井号 (#) 。# 的数量代表了标题的级别。

| Markdown               | HTML                       | 预览                     |
|------------------------|----------------------------|--------------------------|
| # Heading level 1      | `<h1>Heading level 1</h1>` | <h1>Heading level 1</h1> |
| ## Heading level 2     | `<h2>Heading level 2</h2>` | <h2>Heading level 2</h2> |
| ### Heading level 3    | `<h3>Heading level 3</h3>` | <h3>Heading level 3</h3> |
| #### Heading level 4   | `<h4>Heading level 4</h4>` | <h4>Heading level 4</h4> |
| ##### Heading level 5  | `<h5>Heading level 5</h5>` | <h5>Heading level 5</h5> |
| ###### Heading level 6 | `<h6>Heading level 6</h6>` | <h6>Heading level 6</h6> |
