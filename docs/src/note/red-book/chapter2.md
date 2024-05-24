---
title: HTML中的JavaScript
description: javaScript
---

# HTML中的JavaScript

## script元素

`<script>`元素有下列8个属性。

* async：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其它脚本加载。只对外部脚本文件有效。

* charset：可选。使用src属性指定的代码字符集。这个属性很少使用，因为大多浏览器不在乎它的值。

* crossorigin：可选。配置相关请求的CORS（跨域资源共享）设置。默认不使用CORS。corssorigin="anonymous"配置文件请求不必设置凭据标志。corssorigin="use-credentials"设置凭据标志，意味着出战请求会包含凭据。


* defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本有效。

* integrity：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI，Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提
供恶意内容。

* language：废弃。最初用于表示代码块中的脚本语言（如"JavaScript"、"JavaScript 1.2"或"VBScript"）。大多数浏览器都会忽略这个属性，不应该再使用它。

* src：可选。表示包含要执行的代码的外部文件。

* type：可选。代替language，表示代码块中脚本语言的内容类型（也称MIME 类型）。按照惯例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript"都已经废弃了。JavaScript 文件的MIME 类型通常是"application/x-javascript"，不过给type 属性这个值有可能导致脚本被忽略。如果这个值是module，则代码会被当成ES6 模块，而且只有这时候代码中才能出现import 和export 关键字。

`<script></script>`行内的代码会被从上到下解释。在元素中的代码被计算完成之前，页面的其余内容不会被加载，也不会被显示。

与解释行内JavaScript 一样，在解释外部JavaScript 文件时，页面也会阻塞。（阻塞时间也包含下载文件的时间。）

使用了src 属性的`<script>`元素不应该再在`<script>`和`</script>`标签中再包含其他JavaScript 代码。如果两者都提供的话，则浏览器只会下载并执行脚本文件，从而忽略行内代码。

不管包含的是什么代码，浏览器都会按照`<script>`在页面中出现的顺序依次解释它们，前提是它们没有使用defer 和async 属性。

### defer和async

defer：推迟执行脚本。立即下载，延迟执行。脚本会被延迟到整个页面都解析完毕后再运行。
async：异步执行脚本。立即下载，下载结束后立即执行。异步脚本不应该在加载期间修改DOM。
