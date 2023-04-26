---
title: Docker
description: 工程化
---

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

```shell
brew -v
```

* 更新 Homebrew：

```shell
sudo brew update
```

* 安装 homebrew cask：

```shell
brew tap homebrew/cask && brew install brew-cask
brew install brew-cask-completion
```

使用 Homebrew 来安装 Docker：

```shell
brew install --cask docker
```

#### 二、Docker Desktop for Mac 安装

地址：`https://docs.docker.com/desktop/install/mac-install`

## 测试安装是否成功

安装成功后，终端会提示`docker was successfully installed!`，在应用中找到新安装的 Docker 图标并点击运行。

此时，你可以在终端通过命令检查安装后的 Docker 版本：

```shell
docker --version
Docker version 20.10.24, build 297e128
```

如果 docker version、docker info 都正常的话，可以尝试运行一个 Nginx 服务器：

```shell
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

```shell
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

```shell
cd docker-test
docker image build ./ -t docker-test:1.0.0 # 打包镜像
```

`docker image build ./ -t hello-docker:1.0.0` 的意思是：基于路径 ./（当前路径）打包一个镜像，镜像的名字是 docker-test，版本号是 1.0.0。该命令会自动寻找 `Dockerfile` 来打包出一个镜像

> Tips: 可以使用 `docker images` 来查看本机已有的镜像

### 三、运行容器

根据镜像创建容器：

```shell
docker container create -p 2233:80 docker-test:1.0.0 # 基于docker-test:1.0.0镜像创建一个容器，-p：指定端口绑定-将容器中的80端口绑定在宿主机的2333端口，该命令会返回一个容器ID
docker container start xxx # xxx 为上一条命令运行得到的结果
```

然后在浏览器中打开127.0.0.0:2233，就能看到 `index.html`的内容。

> Tips: 可以使用 `docker container ls`来查看当前运行的容器

当容器运行后，可以通过如下命令进入容器内部：

```shell
docker container exec -it xxx /bin/bash # xxx 为容器ID
```

原理实际上是启动了容器内的/bin/bash，此时你就可以通过bash shell与容器内交互了。就像远程连接了SSH一样。

## Docker常用命令
