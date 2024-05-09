---
title: Shell脚本入门
description: Shell脚本入门
---

本文转载自[https://github.com/qinjx/30min_guides/blob/master/shell.md](https://github.com/qinjx/30min_guides/blob/master/shell.md)。

## 什么是 Shell 脚本

### 示例

```sh
#!/bin/sh
cd ~
mkdir shell_tut
cd shell_tut
for ((i=0; i<10; i++)); do
  touch test_$i.txt
done
```

### 示例解释

* `#!/bin/sh`：指定脚本解释器，这里是用 /bin/sh 做解释的
* `cd ~`：切换到当前用户的 home 目录
* `mkdir shell_tut`：创建一个目录 shell_tut
* `cd shell_tut`：切换到shell_tut目录
* `for ((i=0; i<10; i++)); do`：循环条件，一共循环10次
* `touch test_$i.txt`：创建一个test_0…9.txt文件
* `done`：循环体结束

mkdir、touch都是系统自带的程序，一般在 /bin 或者 /usr/bin 目录下。for，do，done是 shell 脚本语言的关键字。

### shell 和 shell 脚本的概念

shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。Ken Thompson 是一种 Unix Shell，Windows Explorer是一个典型的图形界面 Shell。

shell 脚本（shell script），是一种为 shell 编写的脚本程序。业界所说的 shell 通常都是指 shell 脚本，但实际上 shell 和 shell script是两个不同的概念。

### 环境

shell 编程跟 java、php 编程一样，只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了。

* OS

当前主流的操作系统都支持shell编程，本文档所述的shell编程是指Linux下的shell，讲的基本都是POSIX标准下的功能，所以，也适用于Unix及BSD（如Mac OS）。

* Linux

Linux默认安装就带了shell解释器。

* Mac OS

Mac OS不仅带了sh、bash这两个最基础的解释器，还内置了ksh、csh、zsh等不常用的解释器。

* Windows上的模拟器

windows出厂时没有内置shell解释器，需要自行安装，为了同时能用grep, awk, curl等工具，最好装一个cygwin或者mingw来模拟linux环境。

### 脚本解释器

* sh

即Bourne shell，POSIX（Portable Operating System Interface）标准的shell解释器，它的二进制文件路径通常是/bin/sh，由Bell Labs开发。

本文讲的是sh，如果你使用其它语言用作shell编程，请自行参考相应语言的文档。

* bash

Bash是Bourne shell的替代品，属GNU Project，二进制文件路径通常是/bin/bash。业界通常混用bash、sh、和shell。

在CentOS里，/bin/sh是一个指向/bin/bash的符号链接。但在Mac OS上不是，/bin/sh和/bin/bash是两个不同的文件。

### 高级编程语言

理论上讲，只要一门语言提供了解释器（而不仅是编译器），这门语言就可以胜任脚本编程，常见的解释型语言都是可以用作脚本编程的，如：Perl、Tcl、Python、PHP、Ruby。Perl是最老牌的脚本编程语言了，Python这些年也成了一些linux发行版的预置解释器。

编译型语言，只要有解释器，也可以用作脚本编程，如C shell是内置的（/bin/csh），Java有第三方解释器Jshell，Ada有收费的解释器AdaScript。

## 如何选择 shell 编程语言

### 熟悉 vs 陌生

如果你已经掌握了一门编程语言（如PHP、Python、Java、JavaScript），建议你就直接使用这门语言编写脚本程序，虽然某些地方会有点啰嗦，但你能利用在这门语言领域里的经验（单元测试、单步调试、IDE、第三方类库）。新增的学习成本很小，只要学会怎么使用shell解释器（Jshell、AdaScript）就可以了。

### 简单 vs 高级

如果你觉得自己熟悉的语言（如Java、C）写shell脚本实在太啰嗦，你只是想做一些备份文件、安装软件、下载数据之类的事情，学着使用sh，bash会是一个好主意。

shell只定义了一个非常简单的编程语言，所以，如果你的脚本程序复杂度较高，或者要操作的数据结构比较复杂，那么还是应该使用Python、Perl这样的脚本语言，或者是你本来就已经很擅长的高级语言。因为sh和bash在这方面很弱，比如说：

它的函数只能返回字串，无法返回数组
它不支持面向对象，你无法实现一些优雅的设计模式
它是解释型的，一边解释一边执行，连PHP那种预编译都不是，如果你的脚本包含错误(例如调用了不存在的函数)，只要没执行到这一行，就不会报错。

### 环境兼容性

如果你的脚本是提供给别的用户使用，使用sh或者bash，你的脚本将具有最好的环境兼容性，perl很早就是linux标配了，python这些年也成了一些linux发行版的标配，至于mac os，它默认安装了perl、python、ruby、php、java等主流编程语言。

## 第一个 shell 脚本

### 编写

打开文本编辑器，新建一个文件，扩展名为sh（sh代表shell），扩展名并不影响脚本执行，见名知意就好，如果你用php写shell 脚本，扩展名就用php好了。

输入一些代码，第一行一般是这样：

```sh
#!/bin/bash
#!/usr/bin/php
```

“#!”是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行。

### 运行

运行 shell 脚本有两种方法：

#### 作为可执行程序

```sh
chmod +x test.sh
./test.sh
```

注意，一定要写成./test.sh，而不是test.sh，运行其它二进制的程序也一样，直接写test.sh，linux系统会去PATH里寻找有没有叫test.sh的，而只有/bin, /sbin, /usr/bin，/usr/sbin等在PATH里，你的当前目录通常不在PATH里，所以写成test.sh是会找不到命令的，要用./test.sh告诉系统说，就在当前目录找。

通过这种方式运行bash脚本，第一行一定要写对，好让系统查找到正确的解释器。

这里的"系统"，其实就是shell这个应用程序（想象一下Windows Explorer），但我故意写成系统，是方便理解，既然这个系统就是指shell，那么一个使用/bin/sh作为解释器的脚本是不是可以省去第一行呢？是的。

#### 作为解释器参数

这种运行方式是，直接运行解释器，其参数就是shell脚本的文件名。

```sh
/bin/sh test.sh
/bin/php test.php
```

这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。

## 变量

### 定义变量

定义变量时，变量名不加美元符号（$），如：

```sh
your_name='aaa'
```

注意，变量名和等号之间不能有空格，这可能和你熟悉的所有编程语言都不一样。

除了显式地直接赋值，还可以用语句给变量赋值，如：

```sh
for file in `ls /etc`
```

### 使用变量

使用一个定义过的变量，只要在变量名前面加美元符号即可，如：

```sh
your_name='aaa'
echo $your_name
echo ${your_name}
```

变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界。

### 重定义变量

已定义的变量，可以被重新定义，如：

```sh
your_name="aaa"
echo $your_name

your_name="bbb"
echo $your_name
```

## 参数传递

在执行 Shell 脚本的时候都需要将一些初始化的参数传递到 Shell 脚本中。

示例：

```sh
#!/bin/bash
# test.sh

echo "第一个参数为$0";
echo "第二个参数为$1";
echo "第三个参数为$2";
```

执行结果：

```sh
chmod +x test.sh 
./test.sh hello word

#执行结果
第一个参数为./test.sh
第二个参数为hello
第三个参数为word
```

`$0` 默认为执行的文件名并且它是包含文件路径的。

## 运算符

在进行 Shell 脚本的编写过程中，发现常用的运算符有关系运算符、布尔运算符、字符串运算符、算数运算符，除此之外还有文件测试运算符。

示例：

```sh
#!/bin/bash
value=`expr 1 + 1`
echo "两数之和为：${value}"
# 这里需要注意的地方在于表达式和运算符之间要有空格，并且完整的表达式要被 ` ` 包含在其中。
```

```sh
#error
[${a} == ${b}]

#success
[ ${a} == ${b} ]

# 这里需要注意的是在进行条件表达式判断时，务必要将表达式放在方括号之间，并且要有空格，否则会报错。
```

## 注释

以“#”开头的行就是注释，会被解释器忽略。

sh里没有多行注释，只能每一行加一个#号。

## 字符串

字符串是shell编程中最常用最有用的数据类型（除了数字和字符串，也没啥其它类型好用了，哈哈），字符串可以用单引号，也可以用双引号，也可以不用引号。单双引号的区别跟PHP类似。

### 单引号

```sh
str='this is a string'
```

单引号字符串的限制：

* 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的
* 单引号字串中不能出现单引号（对单引号使用转义符后也不行）

### 双引号

```sh
str="Hello, I know you"
```

* 双引号里可以有变量
* 双引号里可以出现转义字符

### 字符串操作

```sh
your_name="mufeng"
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"

echo $greeting $greeting_1
```

### 获取字符串长度

```sh
string='abcd'
echo ${string} #输出：4
```

### 提取子字符串

```sh
string="alibaba is a great company"
echo ${string:1:4} #输出：liba
```

### 查找子字符串

```sh
string="alibaba is a great company"
echo `expr index "$string" is`#输出：3，这个语句的意思是：找出字母i在这名话中的位置，要在linux下运行，mac下会报错
```

### 流程控制

和Java、PHP等语言不一样，sh的流程控制不可为空，如：

```sh
<?php
if (isset($_GET["q"])) {
 search(q);
}
else {
 //do nothing
}
```

在sh/bash里可不能这么写，如果else分支没有语句执行，就不要写这个else。

还要注意，sh里的if [ $foo -eq 0 ]，这个方括号跟Java/PHP里if后面的圆括号大不相同，它是一个可执行程序（和ls, grep一样）

### if else

* if

```sh
if condition
then
 command1 
 command2
 ...
 commandN 
fi
```

写出一行（适用于终端命令提示符）：
``if `ps -ef | grep ssh\`;  then echo hello; fi``

* if else

```sh
if condition
then
 command1 
 command2
 ...
 commandN
else
 command
fi
```

* if else-if else

```sh
if condition1
then
 command1
elif condition2
 command2
else
 commandN
fi
```

### for while

* for

```sh
for var in item1 item2 ... itemN
do
 command1
 command2
 ...
 commandN
done
```

写成一行：

`for var in item1 item2 ... itemN; do command1; command2… done;`

* C风格的for

```sh
for (( EXP1; EXP2; EXP3 ))
do
 command1
 command2
 command3
done
```

* while

```sh
while condition
do
 command
done
```

## 函数

## 文件包含

可以使用source和.关键字，如：

```sh
source ./function.sh
. ./function.sh
```

在bash里，source和.是等效的，他们都是读入function.sh的内容并执行其内容（类似PHP里的include），为了更好的可移植性，推荐使用第二种写法。

## 常用的命令

sh脚本结合系统命令便有了强大的威力，在字符处理领域，有grep、awk、sed三剑客，grep负责找出特定的行，awk能将行拆分成多个字段，sed则可以实现更新插入删除等写操作。

### exit [code]

以退出码为 code 退出当前进程

### rm [options] name

```sh
#!/bin/bash

# rm参数有如下几个
# -i 删除文件时进行交互式询问
# -f 强制删除
# -r 递归删除列出的所有目录及其子目录
# -v 显示处理过程
# 一般我们常用的就是 -rf
rm -rf /* # 顾名思义就是删除根目录下的所有目录文件，俗称删库跑路
```

### cp [options] source dest

```sh
#!/bin/bash

# cp参数有如下几个
# -a 此选项通常在复制目录时使用，它保留链接、文件属性，并复制目录下的所有内容。其作用等于 dpR 参数组合
# -d 复制时保留链接。这里所说的链接相当于 Windows 系统中的快捷方式。
# -f 覆盖已经存在的目标文件而不给出提示。
# -r 若给出的源文件是一个目录文件，此时将复制该目录下所有的子目录和文件。
# 一般我们常用的就是 -r
cp -r /opt/ /newopt/
```

### cd

```sh
#!/bin/bash

# 跳到 /home/aaa/
cd /home/aaa

# 跳到自己的 home 目录
cd ~

# 跳到当前目录的上上两层目录
cd ../..
```

### ls

```sh
#!/bin/bash

# 列出当前目录的所有目录
ls /

# 列出当前目录下所有名称是以 test 开头的文件
ls -ltr test*

# 将 /home 目录下面的所有目录包含文件详细信息列出
ls -lR /home
```

### ps

查看进程列表

```sh
# 所有的进程均显示出来，与 -e 具有同样的效用
ps -A
# 显示现行终端机下的所有进程，包括其他用户的进程
ps -a
# 以用户为主的进程状态
ps -u
# 通常与 a 这个参数一起使用，可列出较完整信息
x
```

### grep
  
* 排除 grep 自身

* 查找与 target 相邻的结果

### awk

### sed

### xargs

### curl
