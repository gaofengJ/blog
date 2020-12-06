**最近自己写了一个小项目，想把它部署在服务器上以便实时查看，在此记录一下自己的部署过程以及在部署过程中遇到的问题，方便日后查看。**

参考：[http://www.kovli.com/2017/09/19/ecs-deploy/](http://www.kovli.com/2017/09/19/ecs-deploy/)  
作者：[Kovli](http://www.kovli.com/)

## 1、购买云服务器
目前国内占有率比较高的就是[腾讯云](https://cloud.tencent.com/)和[阿里云](https://www.aliyun.com/)，这里本人选择的是阿里云中的ECS云服务器。（吐槽一下，普通价格真的比学生价贵太多了）
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49008b1a3766413f8ea5ba9593054b46~tplv-k3u1fbpfcp-zoom-1.image)
如果在购买时没有设置ssh密码，可以进入ECS控制台-示例列表-重置密码中设置密码。把IP地址中的公网IP记录下来，后续会用到。
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31d543ddda584b5c883796f171b2a923~tplv-k3u1fbpfcp-zoom-1.image)

## 2、登录服务器
选择一款SSH工具登录远程服务器。常见的SSH工具有putty、xshell、xftp、SecureCRT等。这里我选择了putty，因为它简单易用，且不需要安装。
下载好putty之后打开putty.exe，登录界面如下：
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bad52fc8765d4db68d77e9d040a8bc43~tplv-k3u1fbpfcp-watermark.webp)
在图中所示Host Name的位置输入之前记录的公网IP，在Saved Sessions方框内输入会话名，并点击Save即可保存当前设置，以方便下次登录。
点击Open，进入命令行界面。在这之前，可能会有以下提示：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51d2a5ccb0874d1b9a5caf8939ca54e3~tplv-k3u1fbpfcp-watermark.webp)
点击“是”生成一个Key即可。  
然后Putty即可连接到你的远程服务器（一般Linux）。  
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/952e763cde2a4851bdb641e5957e3b7c~tplv-k3u1fbpfcp-watermark.webp)
输入用户名和密码，即可远程登录。忘记密码的可以到管理平台中重置密码。  
验证成功之后，即可进入以下界面：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8311b48345c04c9384ef7488d40689eb~tplv-k3u1fbpfcp-watermark.webp)
接下来的操作就和在服务器本身上操作一样了。

## 3.安装Nodejs

Ubuntu中的包管理工具就是apt。

当使用Ubuntu软件中心或者从终端命令输入apt（或者apt-get）安装软件包时，软件包被从一个或者多个软件源下载下来。一个APT软件源是一个网络服务器或者一个本地目录，它包含deb软件包和可以被APT工具读取的源文件。

**首先更新Ubuntu软件源**
```shell
sudo apt-get update
sudo apt-get install -y python-software-properties software-properties-common
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
```

**安装Nodejs**
```shell
sudo apt-get install nodejs
sudo apt install nodejs-legacy
sudo apt install npm
```

**更新npm的包镜像源**
```shell
sudo npm config set registry https://registry.npm.taobao.org
```

**全局安装n管理器（用于管理nodejs版本）**
```shell
sudo npm install n -g
```

**安装最新版n管理器**
```shell
sudo n latest
```

**提示设置PATH**
```shell
PATH="$PATH"
```

最后执行```node -v```，发现Node和npm已经是最新版本了。
