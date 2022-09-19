# 安装 docker

## 安装方式 1

Docker 安装文档：[https://docs.docker.com/install/linux/docker-ce/centos](https://docs.docker.com/install/linux/docker-ce/centos)

1. 卸载系统之前的`docker`

    ```bash
    sudo yum remove docker \
     docker-client \
     docker-client-latest \
     docker-common \
     docker-latest \
     docker-latest-logrotate \
     docker-logrotate \
     docker-engine
    ```

2. 下载必须依赖的一些包

```bash
sudo yum install -y yum-utils \
device-mapper-persistent-data \
lvm2
```

3. 设置下载地址

```bash
sudo yum-config-manager \
--add-repo \
https://download.docker.com/linux/centos/docker-ce.repo
```

4. 安装 docker

```bash
sudo yum install docker-ce docker-ce-cli containerd.io
```

5. 启动 docker 服务：`sudo systemctl start docker`

6. 查看 docker 版本：`docker -v`

7. 查看 docker 镜像：`docker images`会出现权限不足的问题，因为你现在`vagrant ssh`登录的是`vagrant`默认用户，需要加上`sudo`

8. 设置 docker 开启自启：`sudo systemctl enable docker`

## 配置阿里云镜像加速

-   首先进入阿里云网站
-   进入控制台，找到产品与服务，里面有容器与镜像服务，找到镜像加速器，找到 centos
-   按照操作文档说的配置镜像加速器即可

```bash
sudo mkdir -p /etc/docker

sudo tee /etc/docker/daemon.json <<-'EOF'
{
     "registry-mirrors": ["https://82m9ar63.mirror.aliyuncs.com"]
}
EOF

sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 安装方式 2

### 配置宿主机网卡转发

```bash
$ cat <<EOF > /etc/sysctl.d/docker.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

$ sysctl -p /etc/sysctl.d/docker.conf
```

### Yum 安装配置 docker

```bash
# 下载阿里源repo文件
curl -o /etc/yum.repos.d/Centos-7.repo http://mirrors.aliyun.com/repo/Centos-7.repo

curl -o /etc/yum.repos.d/docker-ce.repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

```bash
yum clean all && yum makecache

## yum安装
yum install docker-ce-20.10.6 -y
## 查看源中可用版本
yum list docker-ce --showduplicates | sort -r

## 安装旧版本
yum install -y docker-ce-18.09.9
```

> 配置源加速

获取加速地址：[https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

```bash
mkdir -p /etc/docker
vi /etc/docker/daemon.json

{
	"registry-mirrors": ["https://8xpk5wnt.mirror.aliyuncs.com"]
}
```

这里或者换成第一种里的地址，上面的好像就是我从阿里云里复制来的。

> 设置开机自启

```bash
systemctl enable docker
systemctl daemon-reload
```

> 启动 docker

```bash
systemctl start docker
```

> 查看 docker 信息

```bash
docker info

# docker-client
which docker

# docker daemon
ps aux | grep docker

# containerd
ps aux | grep containerd

systemctl status containerd
```

> 查看 docker 进程

```bash
ps aux | grep dockerd
```
