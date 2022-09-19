# 快速部署 Rancher2 和 K8S 集群

## 准备工作

1.  非必须

    1.  停止所有容器

        ```bash
        docker stop $(docker ps -a -q)
        ```

    2.  删除所有容器

        ```bash
        docker rm $(docker ps -a -q)
        ```

2.  必须

    1.  关闭防火墙，如果有`iptables`也全部干掉

        ```bash
        systemctl stop firewalld && systemctl disable firewalld
        ```

    2.  关闭`selinux`

        1.  `setenforce 0`
        2.  `set -i's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config`

    3.  关闭`swap`

        ```bash
        swapoff -a
        ```

3.  重启`docker`

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl restart docker
    ```

## 主节点启动 rancher

```bash
sudo docker run -d --restart=unless-stopped -p 8080:80 -p 8443:443 -v /home/username/rancher:/var/lib/rancher/ rancher/rancher:stable
```

容器端口 80 和 443 是固定的，同时需要在阿里云或者 XX 云或者别的什么开启访问端口。

`/home/username/rancher`，自己用户目录下一定要创建一个空的文件夹。

启动完毕之后，第一次安装可能需要久一点，然后使用对应的机器的公网 IP 加上 8080 端口进行访问，有点耐心等一会，如果出现什么私密链接，点击高级，然后点击继续前往即可。

第一次启动的时候，会让你设置新密码，然后同意继续即可。

到了设置`Rancher Server URL`的页面的时候，需要填写你对应的内网 IP 加 8443 端口

进入主界面之后，我们点击集群，点击自定义，输入集群名称，其他什么都不用干，全部使用默认配置，点击下一步，针对主机，`master`节点，`etcd、Control、Worker`三个角色都要勾选上。然后复制它给的命令在主机上执行即可。

然后在自己的`worker`节点机器上，我们把`Etcd和Control`勾选去掉，就留下`Worker`之后，复制对应的命令到`worker`节点机器上运行。

最后点击完成即可，需要稍微等一会，需要下载很多镜像。

:::warning

如果出现什么 etcd 的错误，我们到列表页，把上面新加的删除，等到它页面内容完全消失，然后再重复一遍上面的操作，等到下面有一个提示：“2 台新主机注册成功”的时候再点击完成，再继续等待

:::

如果集群列表的状态栏出现`active`，说明成功了，如果有感叹号提示节点 XX 没激活，继续等待即可，它还在注册当中，第一次整，可以去玩一会了。
