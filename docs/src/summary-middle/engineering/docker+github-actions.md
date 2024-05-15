---
title: docker + github actions 多项目部署
description: 工程化
---

# docker + GitHub Actions 多项目部署

## 前言

之前的项目通过 **GitHub Actions** 直接部署到 **Ubuntu** 服务器上，然后通过 **nginx** 做映射，把多个项目部署在不同的 **base URL** 下。

最近把一些项目做了重构，顺便把之前 **CI/CD** 的模式做个更改，采用 **docker + GitHub Actions** 的方式把多个项目部署在服务器上，并用 **nginx** 映射到不同的**二级域名**上。

**GitHub Actions** 是一种持续集成和持续交付 (CI/CD) 平台，可用于自动执行生成、测试和部署管道。可以参考阮一峰老师的文章[GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

下面 CI/CD 流程说明以 blog 项目为例。

## 一、添加 CI 流程

**CI** 全称是 **Continuous Integration**，直译为可持续集成，而普遍对其的解释是频繁地（一天多次）将代码集成到主干。其中：

* **主干**：指包含多个已上线和即将上线的特性的分支
* **集成**：指把包含新特性的分支合并（`merge`）到 **主干** 上的行为

其目的是：

> **持续集成的目的，就是让产品可以快速迭代，同时还能保持高质量。它的核心措施是，代码集成到主干之前，必须通过自动化测试。只要有一个测试用例失败，就不能集成。**

**github flow** 模型中保证高质量的核心措施是：在集成前通过 `pull request`，从而触发审核（审核可以是一系列的自动化校验测试以及代码审核**Code Review**），在审核通过后再合并到主干，从而保证主干的稳定性。

由于这里是发布个人项目，基本不存在 CI 的场景，所以这一步直接略过。

## 二、添加 CD 流程

`CD` 指的是 持续交付（**Continuous delivery**）或者持续部署（**continuous deployment**）或者是两者的并集。

在项目中实现 `CD`：

### 1、在项目根目录下新建 Nginx 配置

项目根目录下新建 nginx 配置文件 blog.nginx.conf（名称与后面 **Dockerfile** 中引用保持一致即可）。

```sh
server {
  # 指定 Nginx 监听在 80 端口上，即 HTTP 请求的默认端口
  listen 80;
  # 指定该服务器的域名为 localhost，即接收来自 localhost 域名的请求
  server_name localhost;
  # 定义了针对根路径 / 的请求的处理方式
  location / {
    # 指定了该路径下的文件为根目录，即请求根路径时会在此目录下寻找文件
    root  /usr/share/nginx/html;
    # 指定了默认的索引文件，当请求的 URL 不包含文件名时，默认会寻找 index.html 或 index.htm 文件
    index index.html index.htm;
    # 设置代理服务器的请求头，将请求的主机名传递给代理服务器
    proxy_set_header Host $host;
    # 如果请求的文件不存在，则执行以下操作
    if (!-f $request_filename) {
      # 将请求重定向到 /index.html，即将所有不存在的文件请求都重定向到 index.html 文件
      rewrite ^.*$ /index.html break;
    }
  }
  # 定义了错误页面的处理方式，当发生 500、502、503 或 504 错误时，会将请求重定向到 /50x.html 页面
  error_page 500 502 503 504 /50x.html;
  # 定义了 /50x.html 页面的处理方式
  location = /50x.html {
    # 指定了 /usr/share/nginx.html 目录为错误页面的根目录
    root /usr/share/nginx.html;
  }
}
```

### 2、在项目根目录下新建 Dockerfile 配置

项目根目录新建 **Dockerfile** ，用来构建镜像包。

```dockerfile
# 使用官方提供的 Nginx 镜像作为基础镜像，当前的镜像将基于 Nginx 镜像构建
FROM nginx
# 将本地文件复制到镜像中
COPY ./docs/.vitepress/dist /usr/share/nginx/html/
# 用于将本地的 ./blog.nginx.conf 文件复制到 Nginx 容器中的 /etc/nginx/conf.d/blog.nginx.conf 文件
COPY ./blog.nginx.conf /etc/nginx/conf.d/blog.nginx.conf
# 指定容器监听在 80 端口上，即对外提供 HTTP 服务
EXPOSE 80
```

### 3、配置容器镜像服务

这里选择[阿里云的容器镜像服务](https://www.aliyun.com/product/acr)，对比 dockhub 速度快一点，而且有免费的个人版足够使用。

3.1、首次打开需要开通服务，配置登录密码（后续要用）。

3.2、创建命名空间，再创建镜像仓库。

* 创建镜像时可以选择私有避免别人下载
* 配置代码源时可以选择“本地仓库”，一方面可以在 **Github actions** 看到所有日志，另一方面可以直接通过命令行推送镜像到镜像仓库，比较方便。

![docker_github_actions_1](/imgs/summary-middle/engineering/docker_github_actions_1.png)

### 4、创建 Actions

在项目根目录下创建 **/.github/workflows/cd.yml**，内容如下：

```yml

```

### 5、创建 **cd.yml** 文件中需要的 **secrets**

打开 **<https://github.com/gaofengJ/blog/settings/secrets/actions>**(替换成自己的github地址)，创建 **cd.yml** 中用到的 **secrets**。

![docker_github_actions_2](/imgs/summary-middle/engineering/docker_github_actions_2.png)

完成后先不要提交，因为我们还没有在服务器中创建 **appleboy/ssh-action** 所需要的脚本。

## 三、创建子域名

在阿里云 -> 云解析 DNS -> 域名解析 -> 解析设置中新增子域名：

![docker_github_actions_3](/imgs/summary-middle/engineering/docker_github_actions_3.png)

同时，在安全组中开放 8080～8090端口，供服务器 Nginx 做映射：

![docker_github_actions_4](/imgs/summary-middle/engineering/docker_github_actions_4.png)

## 四、服务器 Nginx 映射到子域名

整个服务器的结构大概是这样的：

* **使用 Nginx （这里指原生的 Nginx）对二级域名（每一个二级域名对应一个端口号）进行映射**
* **服务器的每一个端口号对应一个 Docker 容器**

登录远程服务器，修改 nginx 配置：

```sh
server {
        listen  80; # 监听的端口
        server_name  blog.mufengtongxue.com; # 监听的URL
        location  /  {
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass http://47.99.111.167:8080;
        }
}
```

在 /home 目录下新增 blog-deploy.sh 文件：

```sh
echo -e "---------docker login--------"
docker login --username=$1 registry.cn-hangzhou.aliyuncs.com --password=$2
echo -e "---------docker stop--------"
docker stop blog
echo -e "---------docker rm--------"
docker rm blog
docker rmi registry.cn-hangzhou.aliyuncs.com/mufengtongxue/blog:latest
echo -e "---------docker pull--------"
docker pull registry.cn-hangzhou.aliyuncs.com/mufengtongxue/blog:latest
echo -e "---------docker create and start--------"
docker run --rm -d -p 8080:80 --name blog registry.cn-hangzhou.aliyuncs.com/mufengtongxue/blog:latest
echo -e "---------deploy success--------"
```
