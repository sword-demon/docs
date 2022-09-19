# Docker 核心要素和常用操作

三大核心要素：镜像(Image)、容器(Container)、仓库(Registry)

**镜像**

> 打包了业务代码以及运行环境的包，是静态的文件，不能直接对外提供服务。

本地确定唯一的镜像

1.  `REPOSITORY` + `TAG`
2.  `IMAGE ID`

**容器**

> 镜像运行时，可以对外提供服务。

**仓库**

> 存放镜像的地方

-   公有仓库：Docker Hub、阿里、网易。。。
-   私有仓库，企业内部搭建
    -   Docker Registry，Docker 官方提供的镜像仓库存储服务
    -   Harbor，是 Docker Registry 的更高级封装，它除了提供友好的`Web UI`界面，角色和用户权限，用户操作审计等功能
-   镜像访问形式地址`registry.devops.com/demo/hello:latest`，若没有前面的`url`地址，则默认从`Docker Hub`中的镜像，若没有`tag`标签，则使用`latest`作为标签。比如：`docker pull nginx`，会被解析成：`docker.io/library/nginx:latest`
-   公有仓库中，一般存有这么几类镜像
    -   操作系统基础镜像(centos、ubuntu、suse、alpine)
    -   中间件(nginx、redis、mysql、tomcat)
    -   语言编译环境(python、java、go)
    -   业务镜像(django-demo。。。)

:::tip 注意

容器和仓库不会直接交互，都是以镜像为载体来操作

:::

## 命令

1.  查看镜像列表

    ```bash
    docker images
    ```

2.  如果获取镜像

    1.  从远程仓库拉取

        ```bash
        docker pull nginx:alpine
        docker images
        ```

    2.  使用`tag`命令

        基于你本地的镜像建立一个，后面的是一个别名`172.21.51.143:5000/nginx:alpine`

        ```bash
        docker tag ningx:alpine 172.21.51.143:5000/nginx:alpine
        docker images
        ```

        你会发现生成的 2 个镜像的`IMAGE ID`都是一样的

        使用`docker info`查看`Docker Root Dir`目录路径，然后可以去查看对应的所有文件:

        ```bash
        ll /var/lib/docker
        ```

    3.  本地构建

        ```bash
        docker build . -t my-nginx:ubuntu -f Dockerfile
        ```

3.  通过镜像启动容器

    `-d`以守护进程运行

    `--name`给容器起一个名称

    最后加上指定哪个镜像

    ```bash
    docker run --name my-nginx-alpine -d nginx:alpine
    ```

    可以使用`docker ps`来查看运行的容器

4.  删除容器

    ```bash
    docker rm 容器ID(可以写ID的前3位)
    ```

    :::warning

    我们不能删运行中的容器，我们得先将它停止

    ```bash
    docker stop 容器id
    ```

    :::

    **强制删除**

    ```bash
    docker rm -f 容器id
    ```

5.  删除镜像

    `rm` + `i(image)`删除镜像

    ```bash
    docker rmi IMAGEID/别名
    ```

6.  如何知道容器内部运行了什么程序

    `-ti`进入容器开启一个`tty`的终端

    ```bash
    # 进入容器内部，分配一个 tty 终端
    docker exec -ti my-nginx-alpine /bin/sh

    # ps aux 查看启动了什么进程

    # 查看本地监听的端口
    netstat -nltp

    # 访问本地地址
    curl localhost:80

    # 可以得到一个nginx的初始页面

    # 进入容器里可以查看对应的发行版
    cat /etc/*-release
    ```

7.  `docker`怎么知道容器启动后该执行什么命令

    通过`docker build`来模拟构建一个`nginx`的镜像

    -   创建`Dockerfile`

        ```
        # 告诉docker使用哪个基础镜像作为模板
        FROM ubuntu

        # RUN 命令会在上面指定的镜像里执行命令
        RUN apt-get update && apt install -y nginx

        # 告诉docker，启动容器时执行如下命令
        CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
        ```

    -   构建本地镜像

        ```bash
        docker build . -t my-nginx:ubuntu -f Dockerfile
        ```

    -   使用新镜像启动容器

        ```bash
        docker run --name my-new-nginx -d my-nginx:ubuntu
        ```

    -   进入容器查看进程

        ```bash
        docker exec -ti my-new-nginx /bin/sh

        # ps aux
        ```
