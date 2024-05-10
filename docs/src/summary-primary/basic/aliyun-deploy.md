---
title: 阿里云ECS服务器项目部署
description: 前端基础
---

# 阿里云ECS服务器项目部署

最近自己写了一个小项目，想把它部署在服务器上以便实时查看，在此记录一下自己的部署过程以及在部署过程中遇到的问题，方便日后查看。

参考：[http://www.kovli.com/2017/09/19/ecs-deploy/](http://www.kovli.com/2017/09/19/ecs-deploy/)  
作者：[Kovli](http://www.kovli.com/)

## 一、购买云服务器

目前国内占有率比较高的就是[腾讯云](https://cloud.tencent.com/)和[阿里云](https://www.aliyun.com/)，这里本人选择的是阿里云的ECS云服务器。(吐槽一下，普通价格真的比学生价贵太多了)
![购买配置](/imgs/summary-primary/basic/aliyun_deploy_1.png)
如果在购买时没有设置ssh密码，可以进入ECS控制台-示例列表-重置密码中设置密码。把IP地址中的公网IP记录下来，后续会用到。
![密码设置](/imgs/summary-primary/basic/aliyun_deploy_2.png)

## 二、登录服务器

选择一款SSH工具登录远程服务器。常见的SSH工具有putty、xshell、xftp、SecureCRT等。这里我选择了putty，因为它简单易用，且不需要安装。
下载好putty之后打开putty.exe，登录界面如下：

![Putty界面](/imgs/summary-primary/basic/aliyun_deploy_3.png)

在图中所示Host Name的位置输入之前记录的公网IP，在Saved Sessions方框内输入会话名，并点击Save即可保存当前设置，以方便下次登录。
点击Open，进入命令行界面。在这之前，可能会有以下提示：

![Putty提示](/imgs/summary-primary/basic/aliyun_deploy_4.png)

点击“是”生成一个Key即可。  
然后Putty即可连接到你的远程服务器（一般Linux）。  

![Putty命令行界面](/imgs/summary-primary/basic/aliyun_deploy_5.png)

输入用户名和密码，即可远程登录。忘记密码的可以到管理平台中重置密码。  
验证成功之后，即可进入以下界面：

![Putty登录成功](/imgs/summary-primary/basic/aliyun_deploy_6.png)

接下来的操作就和在服务器本身上操作一样了。

## 三、安装Nodejs

Ubuntu中的包管理工具就是apt。

当使用Ubuntu软件中心或者从终端命令输入apt（或者apt-get）安装软件包时，软件包被从一个或者多个软件源下载下来。一个apt软件源是一个网络服务器或者一个本地目录，它包含deb软件包和可以被apt工具读取的源文件。

### 1、首先更新Ubuntu软件源

```sh
sudo apt-get update
sudo apt-get install -y python-software-properties software-properties-common
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
```

### 2、安装Nodejs

```sh
sudo apt-get install nodejs
sudo apt install nodejs-legacy
sudo apt install npm
```

### 3、更新npm的包镜像源

```sh
sudo npm config set registry https://registry.npm.taobao.org
```

### 4、全局安装n管理器（用于管理nodejs版本）

```sh
sudo npm install n -g
```

### 5、安装最新版n管理器

```sh
sudo n latest
```

### 6、提示设置PATH

```sh
PATH="$PATH"
```

最后执行`node -v`，发现Node和npm已经是最新版本了。

## 四、安装Nginx

Nginx是一个高性能的HTTP服务器，占有内存少，并发能力强，常用来做静态页面的服务器、反向代理、负载均衡等。

### 1、安装Nginx

这里我用的是apt安装。

```sh
sudo apt-get install nginx
```

Ubuntn安装之后文件结构大致为：

* 所有配置文件都在/etc/nginx下，并且每个虚拟主机已经安排在了/etc/nginx/sites-available下

* 程序文件在/usr/sbin/nginx中（**这里是usr，Unix System Resource的缩写而不是user**）

* 日志在/var/log/nginx中

* 启动脚本在/etc/init.d中

* 默认的虚拟主机的目录设置在了/var/www/nginx-default (有的版本 默认的虚拟主机的目录设置在了/var/www, 请参考/etc/nginx/sites-available里的配置)

然后执行`sudo /etc/init.d/nginx start`启动Nginx。直接执行`nginx`也可以。

Nginx常用命令：

* nginx：启动Nginx

* nginx -s reload：修改配置后重新加载生效

* nginx -s stop：快速停止nginx

* nginx -s quit：完整有序的停止nginx

到这里会发现在浏览器中输入阿里云公网IP时没有出现我们想要的Welcome to nginx，这是因为阿里云关闭的端口映射，需要手动开启。

1. 找到云服务器ECS -> 网络与安全 -> 安全组，点击进入
![阿里云配置-安全组配置](/imgs/summary-primary/basic/aliyun_deploy_7.png)

2. 点击配置规则
![阿里云配置-安全组配置](/imgs/summary-primary/basic/aliyun_deploy_8.png)

3. 点击快速添加，然后在弹窗中勾选HTTP(80)（nginx默认监听80端口），点击确定
![阿里云配置-安全组配置](/imgs/summary-primary/basic/aliyun_deploy_9.png)

完成之后再次访问你的公网IP就成功了！
![阿里云配置-安全组配置](/imgs/summary-primary/basic/aliyun_deploy_10.png)

### 2、Nginx配置

摘录自[菜鸟教程](https://www.runoob.com/w3cnote/nginx-setup-intro.html)

```sh
########### 每个指令必须有分号结束。#################
#user administrator administrators;  #配置用户或者组，默认为nobody nobody。
#worker_processes 2;  #允许生成的进程数，默认为1
#pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址
error_log log/error.log debug;  #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
events {
    accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
    #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;    #最大连接数，默认为512
}
http {
    include       mime.types;   #文件扩展名与文件类型映射表
    default_type  application/octet-stream; #默认文件类型，默认为text/plain
    #access_log off; #取消服务日志    
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式
    access_log log/access.log myFormat;  #combined为日志格式的默认值
    sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。

    upstream mysvr {   
      server 127.0.0.1:7878;
      server 192.168.10.121:3333 backup;  #热备
    }
    error_page 404 https://www.baidu.com; #错误页
    server {
        keepalive_requests 120; #单连接请求上限次数。
        listen       4545;   #监听端口
        server_name  127.0.0.1;   #监听地址       
        location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
           #root path;  #根目录
           #index vv.txt;  #设置默认页
           proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
           deny 127.0.0.1;  #拒绝的ip
           allow 172.18.5.54; #允许的ip           
        } 
    }
}
```

Nginx的默认配置在`/etc/nginx/nginx.conf`中。初始配置如下：

```sh
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
        worker_connections 768;
        # multi_accept on;
}

http {

        ##
        # Basic Settings
        ##

        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;
        # server_tokens off;

        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        ##
        # Logging Settings
        ##

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ##
        # Gzip Settings
        ##

        gzip on;
        gzip_disable "msie6";

        # gzip_vary on;
        # gzip_proxied any;
        # gzip_comp_level 6;
        # gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        ##
        # Virtual Host Configs
        ##

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}


#mail {
#       # See sample authentication script at:
#       # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
#
#       # auth_http localhost/auth.php;
#       # pop3_capabilities "TOP" "USER";
#       # imap_capabilities "IMAP4rev1" "UIDPLUS";
#
#       server {
#               listen     localhost:110;
#               protocol   pop3;
#               proxy      on;
#       }
#
#       server {
#               listen     localhost:143;
#               protocol   imap;
#               proxy      on;
#       }
#}

```

配置文件中引入了下面两个文件夹的内容，都是Nginx的默认配置。

```sh
include /etc/nginx/conf.d/*.conf;
include /etc/nginx/sites-enabled/*;
```

因为我的项目比较简单，所以选择注释掉这两行，把所有配置写在一个文件里。

关于编辑文件的操作可以参考[vim](https://www.runoob.com/linux/linux-vim.html)（没有安装vim的需要自己安装，或者使用vi）的操作。

在覆盖默认配置的同学，我将root做了修改，指向了之后放置前端项目的目录/home/mufeng-front，并在前端项目的目录下新建了一个index.html用来测试。修改后配置如下：

```sh
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
        worker_connections 768;
        # multi_accept on;
}

http {

        ##
        # Basic Settings
        ##

        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;
        # server_tokens off;

        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        ##
        # Logging Settings
        ##

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ##
        # Gzip Settings
        ##

        gzip on;
        gzip_disable "msie6";

        # gzip_vary on;
        # gzip_proxied any;
        # gzip_comp_level 6;
        # gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        ##
        # Virtual Host Configs
        ##

        #include /etc/nginx/conf.d/*.conf;
        #include /etc/nginx/sites-enabled/*;
        server {
                listen 80 default_server;
                listen [::]:80 default_server;

                # SSL configuration
                #
                # listen 443 ssl default_server;
                # listen [::]:443 ssl default_server;
                #
                # Note: You should disable gzip for SSL traffic.
                # See: https://bugs.debian.org/773332
                #
                # Read up on ssl_ciphers to ensure a secure configuration.
                # See: https://bugs.debian.org/765782
                #
                # Self signed certs generated by the ssl-cert package
                # Don't use them in a production server!
                #
                # include snippets/snakeoil.conf;

                root /home/mufeng-front;

                # Add index.php to the list if you are using PHP
                index index.html index.htm index.nginx-debian.html;

                server_name _;

                location / {
                        # First attempt to serve request as file, then
                        # as directory, then fall back to displaying a 404.
                        try_files $uri $uri/ =404;
                }

                # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
                #
                #location ~ \.php$ {
                #       include snippets/fastcgi-php.conf;
                #
                #       # With php7.0-cgi alone:
                #       fastcgi_pass 127.0.0.1:9000;
                #       # With php7.0-fpm:
                #       fastcgi_pass unix:/run/php/php7.0-fpm.sock;
                #}

                # deny access to .htaccess files, if Apache's document root
                # concurs with nginx's one
                #
                #location ~ /\.ht {
                #       deny all;
                #}
        }
}


#mail {
#       # See sample authentication script at:
#       # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
#
#       # auth_http localhost/auth.php;
#       # pop3_capabilities "TOP" "USER";
#       # imap_capabilities "IMAP4rev1" "UIDPLUS";
#
#       server {
#               listen     localhost:110;
#               protocol   pop3;
#               proxy      on;
#       }
#
#       server {
#               listen     localhost:143;
#               protocol   imap;
#               proxy      on;
#       }
#}

```

重启Nginx，刷新浏览器，设置成功！
![nginx启动成功](/imgs/summary-primary/basic/aliyun_deploy_11.png)

## 五、部署前端项目

在服务器上部署前端项目，无非是首先获取项目代码，然后进行构建，然后将最后生成的dist目录放到服务器的指定目录中去。看了不少文章，综合需求与实现成本，最后决定采用Github的Actions来实现前端项目的自动化部署。

此部分内容参考阮一峰老师的[GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)以及谭光志同学的[前端项目自动化部署](https://www.mdeditor.tw/pl/pXrV)，对Github Actions不熟悉的也可以学习一下阮一峰老师的这篇文章。

### 1、创建一个静态服务器

连接到远程服务器之后，选择合适的文件夹，我选择的是/home目录

```sh
mkdir Mufeng-Deploy // 创建文件夹
cd Mufeng-Deploy // 进入文件夹
npm init -y // 初始化项目
npm i express // 安装express
touch front-deploy-server.js // 创建js文件
vim front-deploy-server.js // 编辑文件
```

front-deploy-server.js内容为

```js
const express = require('express')
const app = express()
const port = 300X // 填入自己的阿里云映射端口，在网络安全组配置。

app.use(express.static('dist')) // 使dist目录下的静态文件对外开放访问

// 0.0.0.0表示所有的IP地址。比如一个tomcat配置文件中，如果监听的IP地址设置了0.0.0.0就表示你的这个tomcat服务器监听在本机的所有IP地址上，通过任何一个IP地址都可以访问到。
app.listen(port, '0.0.0.0', () => {
    console.log(`front deploy`)
})
```

**阿里云映射端口配置可以参照之前安装Nginx时添加80端口的步骤进行配置。**

### 2、创建阿里云秘钥对

请参考[创建SSH密钥对](https://www.alibabacloud.com/help/zh/doc-detail/51793.htm)和[绑定SSH密钥对](https://www.alibabacloud.com/help/zh/doc-detail/51796.htm?spm=a2c63.p38356.879954.9.cf992580IYf2O7#concept-zzt-nl1-ydb) ，将你的 ECS 服务器实例和密钥绑定，然后将私钥保存到你的电脑（例如保存在 ecs.pem 文件）。

**注意：一定要按照阿里云的文档进行操作，妥善保管私钥文件！！！**

绑定完秘钥之后，可以重新设置一下登录密码，重启实例后生效。

### 3、阿里云秘钥绑定要部署的项目

打开要部署的Github项目，点击setting->secrets。

![secrets](/imgs/summary-primary/basic/aliyun_deploy_12.png)

点击New repository secret按钮，在Name中填入`SERVER_SSH_KEY`，用别的也可以，但是要与后面的`SSH_PRIVATE_KEY: ${{ ``secrets.SERVER_SSH_KEY`` }}`字段名保持统一。在Value中填入本地的阿里云私钥。

![secrets](/imgs/summary-primary/basic/aliyun_deploy_13.png)

点击Add secret完成。

### 4、在项目下创建`.github/workflows/ci.yml`文件

内容如下：

```yaml
name: Build mufeng-front and deploy to aliyun
on:
  #监听push操作
  push:
    branches:
      # master分支，你也可以改成其他分支
      - master
jobs:
  build:

    runs-on: ubuntu-16.04

    steps:
    - uses: actions/checkout@master
    - name: Install npm dependencies
      run: npm install
    - name: Run build task
      run: npm run build
    - name: Deploy to Server
      uses: easingthemes/ssh-deploy@master
      env:
          SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}
          ARGS: '-rltgoDzvO --delete' # easingthemes/ssh-deploy使用的参数
          SOURCE: dist # 这是要复制到阿里云静态服务器的文件夹名称，此例中指的是npm run build之后生成的dist目录
          REMOTE_HOST: '47.99.111.167' # 你的阿里云公网地址
          REMOTE_USER: root # 阿里云登录后默认为 root 用户
          TARGET: /home/mufeng-front # 打包后的 dist 文件夹将放在 /home/mufeng-front
```

有些地方需要根据自己的实际情况进行修改，可以参考[官方文档](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions)

完成之后推送到github上。

上面这个workflow文件的要点如下：

1. 整个流程在master分支发生push事件时触发。

2. 只有一个job，运行在虚拟机环境ubuntu-16.04。

3. 第一步是获取源码，使用的action是actions/checkout。

4. 第二步是构建和部署，使用的action是easingthemes/ssh-deploy。

5. 这一步需要几个环境变量，根据你使用的action的不同也会发生改变，可以到具体的文档中查看。

回到远程服务器中执行`node front-deploy-server.js`，开始监听，之后只要项目执行git push（将项目推送到master分支），就会自动执行ci.yml，将打包文件放到你的阿里云静态服务器上。

提交后，可以在项目的Actions中查看CI的历史记录。

![CI记录](/imgs/summary-primary/basic/aliyun_deploy_14.png)

之前Nginx中的这一行需要改一下：

```sh
root /home/mufeng-front;
改为：
root /home/mufeng-front/dist;
```

改完之后重启Nginx，大功告成！

![部署成功](/imgs/summary-primary/basic/aliyun_deploy_15.png)

## 六、安装MySQL

要做一个完整的后端项目，数据库肯定是必不可少的，我选择的是MySQL。

### 1、安装MySQL

```sh
sudo apt-get install mysql-server
sudo apt-get install mysql-client
sudo apt-get install libmysqlclient-dev // 找了好久也没搞清楚这个包是做什么的，干脆就直接装上了。
```

安装过程中可能会提示设置root密码，按提示来就好了。

安装好之后，使用以下命令测试是否安装成功：`sudo netstat -tap | grep mysql`

如果出现下图所示就是安装成功了。
![mysql成功提示](/imgs/summary-primary/basic/aliyun_deploy_16.png)

### 2、登录

```sh
mysql -uroot -proot对应的密码
或者mysql -uroot -p 回车后再输入密码
```

### 3、设置MySQL允许远程访问

* 编辑mysql.conf文件
打开mysqld.cnf文件，我的路径为`/etc/mysql/mysql.conf.d/mysqld.cnf`
找到`bind-address = 127.0.0.1`这一行并把它注释掉。保存退出。

* 进入mysql服务，执行授权命令

```sh
grant all on *.* to root@'%' identified by '你的密码' with grant option;
flush privileges;
```

* 然后执行quit退出mysql服务，重启mysql

```sh
sudo service mysql restart
```

现在在windows下可以使用Navicat远程连接ubuntu下的mysql服务。
![Navicat连接](/imgs/summary-primary/basic/aliyun_deploy_17.png)
**连接之前记得到阿里云打开端口映射！**

### 4、复制本地数据库到远程服务器

之前我本地已经新建了一个数据库，所以我借助Navicat的功能直接拷贝到远程服务器。

* 先连接本地数据库、远程数据库

* 在服务器创建一个和你要复制的本地数据库名称一样的数据库

* 使用Navicat的数据转移工具

点击Tools -> Data Transfer，然后在弹窗中填入源数据库和目标数据库信息，点击Next。
![mysql-transfer](/imgs/summary-primary/basic/aliyun_deploy_18.png)

结束之后，刷新远程数据库，就可以看到本地的数据库已经被拷贝到了远程服务器！

## 七、部署后端项目

本着能用js解决就用js解决的原则，我后端项目选择了Nodejs+Express，和之前部署前端Vue项目的步骤就很相似了。

### 1、远程服务器添加监听server

在之前部署前端项目时新建的项目中添加back-deploy-server.js文件。

```sh
cd Mufeng-Deploy // 进入文件夹
touch back-deploy-server.js // 创建js文件
vim back-deploy-server.js // 编辑文件
```

back-deploy-server.js内容为

```sh
const express = require('express')
const app = express()
const port = 300X // 填入自己的阿里云映射端口，在网络安全组配置。这里我使用了和前端项目不同的端口

// 0.0.0.0表示所有的IP地址。比如一个tomcat配置文件中，如果监听的IP地址设置了0.0.0.0就表示你的这个tomcat服务器监听在本机的所有IP地址上，通过任何一个IP地址都可以访问到。
app.listen(port, '0.0.0.0', () => {
    console.log(`back deploy`)
})
```

**没有配置阿里云映射端口配置的记得先配置。**

### 2、创建阿里云秘钥对(同上)

使用之前的就可以。

### 3、阿里云秘钥绑定要部署的项目(同上)

与前端项目相同。

### 4、创建在项目下创建`.github/workflows/ci.yml`文件

内容如下：

```yml
name: Build mufeng-back and deploy to aliyun
on:
  #监听push操作
  push:
    branches:
      # master分支，你也可以改成其他分支
      - master
jobs:
  build:

    runs-on: ubuntu-16.04

    steps:
    - uses: actions/checkout@master
    - name: Install npm dependencies
      run: npm install
    - name: Deploy to Server
      uses: easingthemes/ssh-deploy@master
      env:
          SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}
          ARGS: '-rltgoDzvO --delete' # easingthemes/ssh-deploy使用的参数
          # SOURCE: dist # 这是要复制到阿里云静态服务器的文件夹名称，后端不需要构建，直接把整个文件拷过去
          REMOTE_HOST: '47.99.111.167' # 你的阿里云公网地址
          REMOTE_USER: root # 阿里云登录后默认为 root 用户，并且所在文件夹为 root
          TARGET: /home/mufeng-back # 打包后的 dist 文件夹将放在 /home/mufeng-back
```

有些地方需要根据自己的实际情况进行修改，可以参考[官方文档](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions)

完成之后推送到github上。

上面这个workflow文件的要点如下：

1. 整个流程在master分支发生push事件时触发。
2. 只有一个job，运行在虚拟机环境ubuntu-16.04。
3. 第一步是获取源码，使用的action是actions/checkout。
4. 这一步需要几个环境变量，根据你使用的action的不同也会发生改变，可以到具体的文档中查看。

回到远程服务器中执行```node back-deploy-server.js```，开始监听，之后只要项目执行git push（将项目推送到master分支），就会自动执行ci.yml，将打包文件放到你的阿里云静态服务器上。

提交后，可以在项目的Actions中查看CI的历史记录。

目前后端项目我还是到远程服务器启动的，后面看使用Webhooks能否实现后端项目的自启动。

部署完后端项目之后先用Postman做了测试，之后根据项目需要修改了package的一些配置，这里就没有列举了。

## 八、配置域名

如果以后想要公开这个项目的话，一直用IP地址访问肯定是不方便的，可以配置一个域名方便访问。

### 1、购买域名

可以到腾讯云或者阿里云上购买自己喜欢的域名

### 2、配置（以阿里云为例）

登录阿里云，打开云解析DNS -> 域名解析，这个模块不太好找，可以直接搜索。

![域名解析](/imgs/summary-primary/basic/aliyun_deploy_19.png)

![域名解析](/imgs/summary-primary/basic/aliyun_deploy_20.png)

点击自己的域名或者解析设置，进入解析设置页。

这里有两种配置方式：

* 点击添加记录，自己进行配置

* 点击新手引导，只需要输入IP地址即可完成配置，其他配置项默认。

我才用的是新手引导的方式：

![域名配置-新手引导](/imgs/summary-primary/basic/aliyun_deploy_21.png)

配置完之后可能需要5-10分钟才能生效。

**.com/.net/.cn/.xin/.top/.xyz/.vip/.club/.shop/.wang/.ren等域名注册成功后必须进行域名实名认证，否则会造成解析不生效，实名认证审核通过后的1-2个工作日解析可恢复使用。**

What's the fuck！！！再次访问突然显示这个！！！
![审核备案](/imgs/summary-primary/basic/aliyun_deploy_22.png)

根据阿里云的提示做了备案，吐槽一下，审核的整个流程很麻烦，而且需要的信息真的是把你扒的干干净净，心里一万个***，目前我的域名还在审核中...

谨以自己的一点小经验，希望能给需要的同学一点借鉴。文章中有问题也希望大家能够指出。
