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


## 4、安装Nginx
Nginx是一个高性能的HTTP服务器，占有内存少，并发能力强，常用来做静态页面的服务器、反向代理、负载均衡等。

## 安装Nginx
这里我用的是apt安装。

```shell
sudo apt-get install nginx
```

Ubuntn安装之后文件结构大致为：
* 所有配置文件都在/etc/nginx下，并且每个虚拟主机已经安排在了/etc/nginx/sites-available下
* 程序文件在/usr/sbin/nginx中（**这里是usr，Unix System Resource的缩写而不是user**）
* 日志在/var/log/nginx中
* 启动脚本在/etc/init.d中
* 默认的虚拟主机的目录设置在了/var/www/nginx-default (有的版本 默认的虚拟主机的目录设置在了/var/www, 请参考/etc/nginx/sites-available里的配置)

然后启动Nginx。
```sudo /etc/init.d/nginx start```
我发现直接执行```nginx```也可以。

Nginx常用命令：

* nginx：启动Nginx

* nginx -s reload：修改配置后重新加载生效

* nginx -s stop：快速停止nginx

* nginx -s quit：完整有序的停止nginx

到这里会发现在浏览器中输入阿里云公网IP时没有出现我们想要的Welcome to nginx，这是因为阿里云关闭的端口映射，需要手动开启。

1. 找到云服务器ECS -> 网络与安全 -> 安全组，点击进入
![](https://cdn.nlark.com/yuque/0/2020/png/2505764/1608122040120-e214ce24-a8ae-42e5-a470-2a77dd167584.png)

2. 点击配置规则
![](https://cdn.nlark.com/yuque/0/2020/png/2505764/1608122356560-fc5e2fbe-dbf1-45c5-a673-0aba0eb1eec0.png)

3. 点击快速添加，然后在弹窗中勾选HTTP(80)（nginx默认监听80端口），点击确定
![](https://cdn.nlark.com/yuque/0/2020/png/2505764/1608122623067-4b081be7-965e-4a58-8bba-57ecbeb0dc2f.png)

完成之后再次访问你的公网IP就成功了！
![](https://cdn.nlark.com/yuque/0/2020/png/2505764/1608122813329-9c53a6de-17ca-4a76-8071-d7a9fca10da9.png)
