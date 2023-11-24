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
| [标题（Heading）](#link-heading)           | `# H1`<br>`## H2`<br>`### H3`                          |
| [粗体（Bold）](#link-bold)               | `**bold text**`                                        |
| [斜体（Italic）](#link-italic)             | `*italicized text*`                                    |
| [引用块（Blockquote）](#link-block-quote)       | `> blockquote`                                         |
| [有序列表（Ordered List）](#link-ordered)   | `1. First item`<br>`2. Second item`<br>`3. Third item` |
| [无序列表（Unordered List）](#link-unordered) | `* First item`<br>`* Second item`<br>`* Third item`    |
| [代码（Code）](#link-code)               | `` `code` ``                                           |
| [分隔线（Horizontal Rule）](#link-Horizontal)  | `---`                                                  |
| [链接（Link）](#link-link)               | `[title](https://www.example.com)`                     |
| [图片（Image）](#link-image)              | `![alt text](image.jpg)`                               |

### 扩展语法

这些元素通过添加额外的功能扩展了基本语法。但是，并非所有 Markdown 应用程序都支持这些元素。

| 元素                      | Markdown 语法                                                                                                                                   |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| [表格（Table）](#link-table)               | `\| Syntax \| Description \|`<br>`\| ----------- \| ----------- \|`<br>`\| Header      \| Title       \|`<br>`\| Paragraph   \| Text        \|` |
| [代码块（Fenced Code Block）](#link-code-block) | ` ``` `<br>`{`<br>`"firstName": "John",`<br>`"lastName": "Smith",`<br>`"age": 25`<br>`}`<br>` ``` `                                             |
| 脚注（Footnote）            | Here's a sentence with a footnote.<br>`[^1]`<br>`[^1]`: This is the footnote.                                                                   |
| 标题编号（Heading ID）      | `### My Great Heading {#custom-id}`                                                                                                             |
| 定义列表（Definition List） | `term`<br>`: definition`                                                                                                                        |
| [删除线（Strikethrough）](#link-strikethrough)     | `~~The world is flat.~~`                                                                                                                        |
| [任务列表（Task List）](#link-task)       | `- [x] Write the press release`<br>`* [ ] Update the website`<br>`* [ ] Contact the media`                                                      |

## 基本语法

### <span id="link-heading">标题语法</span>

要创建标题，请在单词或短语前面添加井号 (#) 。# 的数量代表了标题的级别。

| Markdown               | HTML                       | 预览                     |
|------------------------|----------------------------|--------------------------|
| # Heading level 1      | `<h1>Heading level 1</h1>` | <h1>Heading level 1</h1> |
| ## Heading level 2     | `<h2>Heading level 2</h2>` | <h2>Heading level 2</h2> |
| ### Heading level 3    | `<h3>Heading level 3</h3>` | <h3>Heading level 3</h3> |
| #### Heading level 4   | `<h4>Heading level 4</h4>` | <h4>Heading level 4</h4> |
| ##### Heading level 5  | `<h5>Heading level 5</h5>` | <h5>Heading level 5</h5> |
| ###### Heading level 6 | `<h6>Heading level 6</h6>` | <h6>Heading level 6</h6> |

#### 最佳实践

* 不同的 Markdown 应用程序处理 # 和标题之间的空格方式并不一致。为了兼容考虑，请用一个空格在 # 和标题之间进行分隔。

* 一级标题（# Heading level 1）在一篇文章中最多出现一次

### 段落语法

要创建段落，请使用空白行将一行或多行文本进行分隔。

| Markdown                                         | HTML                                                           | 预览                                         |
|--------------------------------------------------|----------------------------------------------------------------|----------------------------------------------|
| `I really like using Markdown.`<br><br>`Me too.` | `<p>I really like using Markdown.</p>`<br><br>`<p>Me too.</p>` | I really like using Markdown.<br><br>Me too. |

#### 最佳实践

不要用空格（spaces）或制表符（ tabs）缩进段落。

### 换行语法

在一行的末尾添加两个或多个空格，然后按回车键,即可创建一个换行(<br>)。

| Markdown               | HTML                       | 预览                     |
|------------------------|----------------------------|--------------------------|
| `first line.`<br>`second line.` | `<p>first line.<br>`<br>`second line.</p>` | first line.<br>second line. |

#### 最佳实践

为了兼容性，请在行尾添加“结尾空格”或 HTML 的 <br> 标签来实现换行。

### 强调语法

#### <span id="link-bold">粗体（Bold）</span>

要加粗文本，请在单词或短语的前后各添加两个星号（asterisks）。

| Markdown                     | HTML                                      | 预览                       |
|------------------------------|-------------------------------------------|----------------------------|
| `I just love **bold text**.` | `I just love <strong>bold text</strong>.` | I just love **bold text**. |

#### <span id="link-italic">斜体（Italic）</span>

要用斜体显示文本，请在单词或短语前后添加一个星号（asterisk）。

| Markdown                               | HTML                                          | 预览                                 |
|----------------------------------------|-----------------------------------------------|--------------------------------------|
| `Italicized text is the *cat's meow*.` | `Italicized text is the <em>cat's meow</em>.` | Italicized text is the *cat's meow*. |

#### 粗体（Bold）和斜体（Italic）

要同时用粗体和斜体突出显示文本，请在单词或短语的前后各添加三个星号。

| Markdown                        | HTML                                                | 预览                          |
|---------------------------------|-----------------------------------------------------|-------------------------------|
| `This text is ***important***.` | `This text is <strong><em>important</em></strong>.` | This text is ***important***. |

#### 最佳实践

* Markdown 应用程序在处理单词或短语中间添加的下划线上并不一致。为了实现兼容性，请使用星号

* 星号与文本中间不要加空格

### <span id="link-block-quote">引用语法</span>

要创建块引用，请在段落前添加一个 > 符号。

```md
> Dorothy followed her through many of the beautiful rooms in her castle.
```

渲染效果如下所示：
> Dorothy followed her through many of the beautiful rooms in her castle.

### 列表语法

可以将多个条目组织成有序或无序列表。

#### <span id="link-ordered">有序列表</span>

| Markdown               | HTML                       | 预览                     |
|------------------------|----------------------------|--------------------------|
| `1. First item`<br>`2. Second item`<br>`3. Third item` | `<ol>`<br>`<li>First item</li>`<br>`<li>Second item</li>`<br>`<li>Third item</li>`<br>`</ol>` | 1. First item<br>2. Second item<br>3. Third item |

#### <span id="link-unordered">无序列表</span>

| Markdown               | HTML                       | 预览                     |
|------------------------|----------------------------|--------------------------|
| `* First item`<br>`* Second item`<br>`* Third item` | `<ul>`<br>`<li>First item</li>`<br>`<li>Second item</li>`<br>`<li>Third item</li>`<br>`</ul>` | <ul><li>First item</li><li>Second item</li><li>Third item</li></ul> |

#### 在列表中嵌套其他元素

要在保留列表连续性的同时在列表中添加另一种元素，请将该元素缩进四个空格或一个制表符，如下例所示：

```md
* This is the first list item.
* Here's the second list item.

    I need to add another paragraph below the second list item.

* And here's the third list item.
```

渲染效果如下：

* This is the first list item.
* Here's the second list item.

    I need to add another paragraph below the second list item.

* And here's the third list item.

#### 最佳实践

* 有序列表数字不必按数学顺序排列，但是列表应当以数字 1 起始

### <span id="link-code">代码语法</span>

要将单词或短语表示为代码，请将其包裹在反引号 (`) 中。

| Markdown                                | HTML                                             | 预览                                |
|-----------------------------------------|--------------------------------------------------|-------------------------------------|
| ``At the command prompt, type `nano`.`` | `At the command prompt, type <code>nano</code>.` | At the command prompt, type `nano`. |

#### 最佳实践

* 如果你要表示为代码的单词或短语中包含一个或多个反引号，则可以通过将单词或短语包裹在双反引号

* 要创建代码块，请将代码块的每一行缩进至少四个空格或一个制表符。

### <span id="link-Horizontal">分隔符语法</span>

要创建分隔线，请在单独一行上使用三个或多个星号 (***)，并且不能包含其他内容。

```md
***
```

渲染效果如下：

***

#### 最佳实践

为了兼容性，请在分隔线的前后均添加空白行。

### <span id="link-link">链接语法</span>

链接文本放在中括号内，链接地址放在后面的括号中，链接title可选。

超链接Markdown语法代码: `[超链接显示名](超链接地址 "超链接title")`

对应的HTML代码：`<a href="超链接地址" title="超链接title">超链接显示名</a>`

```md
这是一个链接 [Markdown语法](https://markdown.com.cn)。
```

渲染效果如下：  
这是一个链接 [Markdown语法](https://markdown.com.cn)。

#### 最佳实践

不同的 Markdown 应用程序处理URL中间的空格方式不一样。为了兼容性，请尽量使用%20代替空格。

### <span id="link-image">图片语法</span>

要添加图像，请使用感叹号 (!), 然后在方括号增加替代文本，图片链接放在圆括号里，括号里的链接后可以增加一个可选的图片标题文本。

插入图片Markdown语法代码：`![图片alt](图片链接 "图片title")`。

对应的HTML代码：`<img src="图片链接" alt="图片alt" title="图片title">`

```md
![这是图片](/images/summary_middle_entire_markdown_img_demo.png "Magic Gardens")
```

渲染效果如下：  
![这是图片](/images/summary_middle_entire_markdown_img_demo.png "Magic Gardens")

#### 链接图片

给图片增加链接，请将图像的Markdown 括在方括号中，然后将链接添加在圆括号中。

```md
[![沙漠中的岩石图片](/images/summary_middle_entire_markdown_img_demo.png "Shiprock")](https://markdown.com.cn)
```

### 转义语法

要显示原本用于格式化 Markdown 文档的字符，请在字符前面添加反斜杠字符 \ 。

```md
\* Without the backslash, this would be a bullet in an unordered list.
```

渲染效果如下：

\* Without the backslash, this would be a bullet in an unordered list.

#### 可做转义的字符

| Character | Name      |
|-----------|-----------|
| \         | backslash |
| ` | backtick (see also escaping backticks in code)|
| * | asterisk|
| _ | underscore|
| { } | curly braces|
| [ ] | brackets|
| ( ) | parentheses|
| # | pound sign|
| + | plus sign|
| - | minus sign (hyphen)|
| . | dot|
| ! | exclamation mark|
| \| | pipe (see also escaping pipe in tables)|

### 内嵌HTML标签

对于 Markdown 涵盖范围之外的标签，都可以直接在文件里面用 HTML 本身。如需使用 HTML，不需要额外标注这是 HTML 或是 Markdown，只需 HTML 标签添加到 Markdown 文本中即可。

#### 行级内联标签

HTML 的行级內联标签如 `<span>`、`<cite>`、`<del>` 不受限制，可以在 Markdown 的段落、列表或是标题里任意使用。依照个人习惯，甚至可以不用 Markdown 格式，而采用 HTML 标签来格式化。

#### 区块标签

区块元素──比如 `<div>`、`<table>`、`<pre>`、`<p>` 等标签，必须在前后加上空行，以便于内容区分。而且这些元素的开始与结尾标签，不可以用 tab 或是空白来缩进。Markdown 会自动识别这区块元素，避免在区块标签前后加上没有必要的 `<p>` 标签。

## 扩展语法

John Gruber的原始设计文档中概述的基本语法主要是为了应付大多数情况下的日常所需元素，但对于某些人来说还不够，这就是扩展语法的用武之地。

### <span id="link-table">表格</span>

要添加表，请使用三个或多个连字符（---）创建每列的标题，并使用管道（|）分隔每列。您可以选择在表的任一端添加管道。

```md
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
```

呈现的输出如下所示：
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

#### 对齐

您可以通过在标题行中的连字符的左侧，右侧或两侧添加冒号（:），将列中的文本对齐到左侧，右侧或中心。

```md
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
```

呈现的输出如下所示：
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

#### 格式化表格中的文字

您可以在表格中设置文本格式。例如，您可以添加链接，代码（仅反引号（`）中的单词或短语，而不是代码块）和强调。

您不能添加标题，块引用，列表，水平规则，图像或HTML标签。

### <span id="link-code-block">代码块</span>

在代码块之前和之后的行上使用三个反引号(```）。

````md
```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
````

呈现的输出如下所示：

```md
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

#### 最佳实践

* 在代码块中输入` ``` `，可以通过代码块围栏用` ```` `的方式

`````md
````md
```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
````
`````

### <span id="link-strikethrough">markdown删除线</span>

此功能使您可以指示某些单词是一个错误，要从文档中删除。若要删除单词，请在单词前后使用两个波浪号~~。

```md
~~世界是平坦的。~~ 我们现在知道世界是圆的。
```

呈现的输出如下所示：
~~世界是平坦的。~~ 我们现在知道世界是圆的。

### <span id="link-task">任务列表</span>

任务列表使您可以创建带有复选框的项目列表。在支持任务列表的Markdown应用程序中，复选框将显示在内容旁边。要创建任务列表，请在任务列表项之前添加破折号-和方括号[ ]，并在[ ]前面加上空格。要选择一个复选框，请在方括号[x]之间添加 x 。

```md
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```

呈现的输出如下所示：

* [x] Write the press release
* [ ] Update the website
* [ ] Contact the media

**我这里不支持此种写法**。

### Emoji表情

有两种方法可以将表情符号添加到Markdown文件中：将表情符号复制并粘贴到Markdown格式的文本中，或者键入emoji shortcodes。

```md
去露营了！ :tent: 很快回来。

真好笑！ :joy:
```

呈现的输出如下所示：

去露营了！ :tent: 很快回来。

真好笑！ :joy:

没有更多了～～～
