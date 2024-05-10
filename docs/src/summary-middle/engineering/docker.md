---
title: Docker
description: 工程化
---

# Docker

## Docker是什么

**Docker是一款针对程序开发人员和系统管理员来开发、部署、运行应用的一款虚拟化平台。Docker 可以让你像使用集装箱一样快速的组合成应用，并且可以像运输标准集装箱一样，尽可能的屏蔽代码层面的差异。Docker 会尽可能的缩短从代码测试到产品部署的时间。**

Docker的一些概念：

**image**：镜像，是一个只读模版，用来创建容器。
**container**: 容器，是一个可运行的镜像实例。
**Dockerfile**: 镜像构建的模版，描述镜像构建的步骤。

所以它们之间的关系是，**通过Dockerfile构建出镜像，然后通过镜像来创建容器，程序就跑在容器中**。并且一个镜像可以随意创建N个容器，各个容器间相互隔离。

## 安装 Docker

### Mac 安装 Docker

#### 一、使用Homebrew安装

Homebrew 是一款 macOS 平台下的软件包管理工具，拥有安装、卸载、更新、查看、搜索等很多实用的功能。包管理工具可以让你安装和更新程序变得更方便，目前在 OS X 系统中最受欢迎的包管理工具就是 Homebrew。[Homebrew官网](https://brew.sh/index_zh-cn)

Homebrew Cask 是 Homebrew 的扩展，借助它可以方便地在 macOS 上安装图形界面程序，即我们常用的各类应用。Homebrew 中文含义为自制、自酿酒，Cask 中文含义为桶、木桶，桶装酒是一种成品，也就是说每一个 homebrew cask 都可以直接使用的。

* 查看 Homebrew版本：

```sh
brew -v
```

* 更新 Homebrew：

```sh
sudo brew update
```

* 安装 homebrew cask：

```sh
brew tap homebrew/cask && brew install brew-cask
brew install brew-cask-completion
```

使用 Homebrew 来安装 Docker：

```sh
brew install --cask docker
```

#### 二、Docker Desktop for Mac 安装

地址：`https://docs.docker.com/desktop/install/mac-install`

## 测试安装是否成功

安装成功后，终端会提示`docker was successfully installed!`，在应用中找到新安装的 Docker 图标并点击运行。

此时，你可以在终端通过命令检查安装后的 Docker 版本：

```sh
docker --version
Docker version 20.10.24, build 297e128
```

如果 docker version、docker info 都正常的话，可以尝试运行一个 Nginx 服务器：

```sh
docker run -d -p 80:80 --name webserver nginx
```

服务运行后，可以访问 [`http://localhost`](http://localhost)，如果看到了 "Welcome to nginx!"，就说明 Docker Desktop for Mac 安装成功了。

尝试在 Docker 中启动 Nginx 时，终端可能报错：`Unable to find image 'nginx:latest' locally`，这是因为国内从 Docker Hub 拉取镜像有时会遇到困难，此时可以配置镜像加速器。

可以在 `/etc/docker/daemon.json` 中写入如下内容（如果文件不存在请新建该文件，在 /etc 中创建文件夹时记得要用 sudo 权限）：

```json
{
  "registry-mirrors": [
    "https://alzgoonw.mirror.aliyuncs.com"
  ]
}
```

然后重新执行 `docker run -d -p 80:80 --name webserver nginx`，就可以看到 Nginx 成功启动的页面了！

要停止 Nginx 服务器并删除执行下面的命令：

```sh
docker stop webserver
docker rm webserver
```

## Docker使用 Demo

摘自[https://juejin.cn/post/6844903946234904583#heading-3](https://juejin.cn/post/6844903946234904583#heading-3)

### 一、创建文件

创建一个目录 `docker-test`，在目录中创建一个 `index.html`：,内容为：

```html
<h1>docker-test</h1>
```

在 `docker-test` 中创建一个 `Dockerfile` 文件，内容为：

```dockerfile
# 基于哪个镜像
FROM nginx 

# 将宿主机中的./index.html文件复制进容器里的/usr/share/nginx/html/index.html
COPY ./index.html /usr/share/nginx/html/index.html 

# 容器对外暴露80端口
EXPOSE 80
```

`docker-test` 的目录结构：

```markdown
docker-test
  |___index.html
  |___Dockerfile
```

### 二、打包镜像

创建好文件后，可以根据 `Dockerfile` 创建镜像了：

```sh
cd docker-test
docker image build ./ -t docker-test:1.0.0 # 打包镜像
```

`docker image build ./ -t hello-docker:1.0.0` 的意思是：基于路径 ./（当前路径）打包一个镜像，镜像的名字是 docker-test，版本号是 1.0.0。该命令会自动寻找 `Dockerfile` 来打包出一个镜像

> Tips: 可以使用 `docker images` 来查看本机已有的镜像

### 三、运行容器

根据镜像创建容器：

```sh
docker container create -p 2233:80 docker-test:1.0.0 # 基于docker-test:1.0.0镜像创建一个容器，-p：指定端口绑定-将容器中的80端口绑定在宿主机的2333端口，该命令会返回一个容器ID
docker container start xxx # xxx 为上一条命令运行得到的结果
```

然后在浏览器中打开127.0.0.0:2233，就能看到 `index.html`的内容。

> Tips: 可以使用 `docker container ls`来查看当前运行的容器

当容器运行后，可以通过如下命令进入容器内部：

```sh
docker container exec -it xxx /bin/bash # xxx 为容器ID
```

原理实际上是启动了容器内的/bin/bash，此时你就可以通过bash shell与容器内交互了。就像远程连接了SSH一样。

## Docker常用命令

### 查看命令

| 命令                | 作用                     |
|---------------------|------------------------|
| docker ps           | 查看正在运行的容器       |
| docker ps -a        | 查看所有已经创建的容器   |
| docker images       | 列出镜像列表             |
| docker container ls | 效果同ps命令(加-a效果同) |

#### docker ps 详细参数

```markdown
-a :显示所有的容器，包括未运行的。

-f :根据条件过滤显示的内容。

--format :指定返回值的模板文件。

-l :显示最近创建的容器。

-n :列出最近创建的n个容器。

--no-trunc :不截断输出。

-q :静默模式，只显示容器编号。

-s :显示总的文件大小。
```

#### docker images 详细参数

```markdown
-a :列出本地所有的镜像（含中间映像层，默认情况下，过滤掉中间映像层）；

--digests :显示镜像的摘要信息；

-f :显示满足条件的镜像；

--format :指定返回值的模板文件；

--no-trunc :显示完整的镜像信息；

-q :只显示镜像ID。
```

### 删除命令

| 命令       | 作用     |
|------------|--------|
| docker rm  | 删除容器 |
| docker rmi | 删除镜像 |

#### docker rm 详细参数

```markdown
-f :强制删除一个运行中的容器

-l :移除容器间的网络连接，而非容器本身

-v :-v 删除与容器关联的卷
```

#### docker rmi 详细参数

```markdown
-f :强制删除；

--no-prune :不移除该镜像的过程镜像，默认移除；
```

### 宿主操作

| 命令      | 作用                     |
|-----------|------------------------|
| docker cp | 容器与主机之间的数据拷贝 |

#### docker cp 实例

```markdown
docker cp  nginx:/www /tmp/    #将nginx容器的/www 拷贝到本地/tmp下
```

### 生命周期

| 命令           | 作用                           |
|----------------|------------------------------|
| docker start   | 启动容器                       |
| docker stop    | 停止容器                       |
| docker restart | 重启容器                       |
| docker exec    | 在运行的容器中执行命令         |
| docker run     | 创建一个新的容器并运行一个命令 |

#### docker exec 详细参数

```markdown
-d :分离模式: 在后台运行

-i :即使没有附加也保持STDIN 打开

-t :分配一个伪终端

#实例
docker exec -it nginx /bin/bash
```

#### docker run 详细参数

```markdown
-i, --interactive=false   打开STDIN，用于控制台交互
-t, --tty=false            分配tty设备，该可以支持终端登录，默认为false
-d, --detach=false         指定容器运行于前台还是后台，默认为false
-u, --user=""              指定容器的用户
-a, --attach=[]            登录容器（必须是以docker run -d启动的容器）
-w, --workdir=""           指定容器的工作目录
-c, --cpu-shares=0        设置容器CPU权重，在CPU共享场景使用
-e, --env=[]               指定环境变量，容器中可以使用该环境变量
-m, --memory=""            指定容器的内存上限
-P, --publish-all=false    指定容器暴露的端口
-p, --publish=[]           指定容器暴露的端口
-h, --hostname=""          指定容器的主机名
-v, --volume=[]            给容器挂载存储卷，挂载到容器的某个目录    顺序：主机：容器
--volumes-from=[]          给容器挂载其他容器上的卷，挂载到容器的某个目录
--cap-add=[]               添加权限，权限清单详见：http://linux.die.net/man/7/capabilities
--cap-drop=[]              删除权限，权限清单详见：http://linux.die.net/man/7/capabilities
--cidfile=""               运行容器后，在指定文件中写入容器PID值，一种典型的监控系统用法
--cpuset=""                设置容器可以使用哪些CPU，此参数可以用来容器独占CPU
--device=[]                添加主机设备给容器，相当于设备直通
--dns=[]                   指定容器的dns服务器
--dns-search=[]            指定容器的dns搜索域名，写入到容器的/etc/resolv.conf文件
--entrypoint=""            覆盖image的入口点
--env-file=[]              指定环境变量文件，文件格式为每行一个环境变量
--expose=[]                指定容器暴露的端口，即修改镜像的暴露端口
--link=[]                  指定容器间的关联，使用其他容器的IP、env等信息
--lxc-conf=[]              指定容器的配置文件，只有在指定--exec-driver=lxc时使用
--name=""                  指定容器名字，后续可以通过名字进行容器管理，links特性需要使用名字
--net="bridge"             容器网络设置:
                            bridge 使用docker daemon指定的网桥
                            host    //容器使用主机的网络
                            container:NAME_or_ID  >//使用其他容器的网路，共享IP和PORT等网络资源
                            none 容器使用自己的网络（类似--net=bridge），但是不进行配置
--privileged=false         指定容器是否为特权容器，特权容器拥有所有的capabilities
--restart="no"             指定容器停止后的重启策略:
                            no：容器退出时不重启
                            on-failure：容器故障退出（返回值非零）时重启
                            always：容器退出时总是重启
--rm=false                 指定容器停止后自动删除容器(不支持以docker run -d启动的容器)
--sig-proxy=true           设置由代理接受并处理信号，但是SIGCHLD、SIGSTOP和SIGKILL不能被代理
```

### 镜像仓库

| 命令          | 作用                 |
|---------------|--------------------|
| docker pull   | 拉取镜像             |
| docker search | 从Docker Hub查找镜像 |

### docker环境信息

| 命令           | 作用                 |
|----------------|--------------------|
| docker info    | 查看docker系统信息   |
| docker version | 显示 Docker 版本信息 |
