---
title: 10. 图形系统如何表示颜色
description: 可视化
---

## RGB 和 RGBA

形式如 #RRGGBB 的颜色代码，就是 RGB 颜色的十六进制表示法，其中 RR、GG、BB 分别是两位十六进制数字，表示红、绿、蓝三色通道的**色阶**。因此，RGB 颜色是将人眼可见的颜色表示为**红**、**绿**、**蓝**三原色不同色阶的混合。

![RGB三维立方体](http://www.mufengtongxue.com/assets/images/blog_note_visualization_chapter10_1.png)

在浏览器中，CSS 一般有两种表示 RGB 颜色值的方式：一种是我们前面说的 #RRGGBB 表示方式，另一种是直接用 rgb(red, green, blue) 表示颜色，这里的“red、green、blue”是十进制数值。

RGBA 其实就是在 RGB 的基础上增加了一个 Alpha 通道，也就是透明度。一些新版本的浏览器，可以用 #RRGGBBAA 的形式来表示 RGBA 色值，但是较早期的浏览器，只支持 rgba(red, green, blue, alpha) 这种形式来表示色值（注意：这里的 alpha 是一个从 0 到 1 的数）。

但是**当要选择一组颜色给图表使用时，我们并不知道要以什么样的规则来配置颜色，才能让不同数据对应的图形之间的对比尽可能鲜明。**因此，RGB 颜色对用户其实并不友好。

## HSL 和 HSV

与 RGB 颜色以色阶表示颜色不同，HSL 和 HSV 用色相（Hue）、饱和度（Saturation）和亮度（Lightness）或明度（Value）来表示颜色。其中，Hue 是角度，取值范围是 0 到 360 度，饱和度和亮度 / 明度的值都是从 0 到 100%。

### 一、HSL 和 HSV 的颜色表示方法

可以把 HSL 和 HSV 颜色理解为，是将 RGB 颜色的立方体从直角坐标系投影到极坐标的圆柱上，所以它的色值和 RGB 色值是一一对应的。

![HSL和HSV颜色转换](http://www.mufengtongxue.com/assets/images/blog_note_visualization_chapter10_2.png)

RGB 和 HSV 的转换代码：

```javascript
vec3 rgb2hsv(vec3 c){
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c){
  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  return c.z * mix(vec3(1.0), rgb, c.y);
}
```

## CIE Lab 和 CIE Lch 颜色

CIE Lab 颜色空间简称 Lab，它其实就是一种符合人类感觉的色彩空间，它用 L 表示亮度，a 和 b 表示颜色对立度。
