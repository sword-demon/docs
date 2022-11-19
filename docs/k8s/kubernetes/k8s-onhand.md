# K8S 无脑上手

> 前置：这里使用的是`Rancher2`搭建的`K8S`集群来上手。

## 创建项目、namespace、初步部署 nginx、nodeport

进入集群后，导航里有一个`project/namespace`，项目/命名空间的点开来。

![image-20221111235418401](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221111235418401.png)

-   `namespace`：是对一组资源和对象的抽象集合，用来将系统内部的对象划分为不同的项目组或用户组；常用来隔离不同的用户，比如`K8S`自带的服务一般运行在`kube-system namespace`中

---

然后我们点击创建项目，输入项目名称，其他都不选也不填，直接点击创建。

![image-20221111235813759](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221111235813759.png)

然后点击添加命名空间

![image-20221111235921518](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221111235921518.png)

就填个名称，然后属于`myproject`项目，直接创建。

![image-20221112000032683](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221112000032683.png)

创建完成之后点进去

![image-20221112000059524](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221112000059524.png)

我们创建的项目就会在`workloads`里创建。

---

### workload

![image-20221112000158200](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221112000158200.png)

`Pod`是所有业务类型的基础，也是`K8S`管理的最小单位级，可以理解为它是一个或多个容器的组合。

然后我们在`workloads`里部署一个`nginx`

![image-20221112001137847](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221112001137847.png)

这里的`Node Scheduling`要选择下面的，自动生成。

然后点击`Add Port`，输入名称，和容器内的端口，`nginx`内置的就是 80 端口，规则选择`TCP`，选择`NodePort`，最后一个会自动生成一个端口，在`30000~32767`范围内，在所有节点上开放一个特定的端口，任何发送到该端口的流量都被转发到对应服务。最后点击`Launch`，也是需要等一会的。

![image-20221112001434322](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221112001434322.png)

这里它自动帮我们生成了一个随机的端口`30370/tcp`而且地址是访问的内网地址。

![image-20221112001609973](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221112001609973.png)

可以看到主节点和另外一个节点都能进行访问。

![image-20221112001648394](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221112001648394.png)

点进去会发现，这个是部署在`k8s-node1`节点上的，`k8s-master1`节点上没有，但是此时 2 个都能进行访问。

> 使用第二台机器的内网地址进行访问，也是可以访问的。

## 部署一个 go api 到 K8S 集群中

简单一个`gin`代码

```go
package main

import (
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	r := gin.Default()
	r.Handle("GET", "/", func(c *gin.Context) {
		c.String(200, "this is myweb")
	})
	r.Handle("GET", "/user", func(c *gin.Context) {
		c.String(200, "this is user 0.7")
	})
	err := r.Run(":80")
	if err != nil {
		log.Fatalln(err)
	}
}

```

使用交叉编译成`linux amd64`可以使用的二进制文件

```bash
CGO_ENABLE=0 GOOS=linux GOARCH=amd64 go build myserver.go
```

---

这次还是继续选择在`Rancher`中选择`Deploy`部署一个`mygo`的服务，不过这次使用`HostPort`，它是直接将容器的端口与所调度的节点上的端口进行映射。

![image-20221113221312459](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221113221312459.png)

如果你是别的什么云，可以选择主机端口为`8081`或者别的，我这个云有点特殊，和`web`相关的端口需要端口备案，所以选择了一个`9502`端口。

---

然后你可以将语言换成中文，来进行选择

![image-20221113221544464](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221113221544464.png)

选择数据卷：选择映射主机目录，卷名称随意，主机路径就和你即将编译后的那个`myweb`的路径有关，容器目录为`/app`

然后这里主机调度，选择指定主机，这里只想在主机上进行运行。

![image-20221113221715655](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221113221715655.png)

然后拉到最下面，点击显示高级选项：

![image-20221113221936731](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221113221936731.png)

-   命令填上`./myserver`，这是启动`go`编译好的一个二进制文件运行的命令。

-   然后设置工作目录为我们设置好的容器映射的目录`/app`

-   控制台选择无
-   安全/主机设置：镜像拉取策略，这里因为我们使用的是`alpine:3.12`，我们本来不存在这个镜像，所以我们换成不存在则拉取，别的都不用动，最后点击启动。照样是要我们等一会，这个会很快的。

最终效果：

![image-20221113230437734](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221113230437734.png)

---

如果是单机部署

```bash
docker pull alpine:3.12
```

```bash
docker run  -d  --name tt \
-v /home/wxvirus/myweb:/app \
-w /app \
-p 8081:80 \
alpine:3.12 \
./myserver

```

## 2 个 go api 进行负载均衡(ingress)

我们将上面部署的一个`mygo`进行编辑，选择部署 2 个节点，将`pod`编写成 2，把前面设置的端口映射的配置删掉，重新使用`NodePort`来进行部署，修改主机调度为每个`pod`自动匹配主机，最后保存即可。

---

:::tip

中间过程偶有问题，【重启 + 删除部署 + 重新部署】是真的可以，然后再自己查看对应的日志内容，去解决即可。

:::

:::danger 我遇到的坑

首次修改保存之后，会产生大量的`Fail`的`Pod`，你删除的速度还没他增长的快。迫不得已，把这个`workloads`删了，重新部署；然后主节点可以了，`worker`节点又不行了，原因是`worker`节点上那个主机映射目录的可执行文件不存在，又整了一下，然后又发现可执行文件没有执行权限，最终`chmod +x myserver`，等待下一次`Pod`重启之后才 OK。

:::

![image-20221113232921379](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221113232921379.png)

---

### Ingress

> 它相当于一个 7 层负载均衡器，理解为进行反向代理并定义规则的一个`api`对象，`ingress Controller`通过监听`Ingress api`转化为各自的配置(常用的有`nginx + ingress`，`trafik-ingress`)

![image-20221113233618260](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221113233618260.png)

然后出去选择负载均衡，添加规则，输入名称和命名空间，然后规则里选择兹定于域名，我这里没啥域名，就不测试了，你可以选自己的域名，然后端口设置为 80 即可，否则访问域名则还需要加上端口才能访问，这个时候，如果你想体现出有负载均衡的感觉，你可以将`myserver`的代码改动一下，将输出的内容换成各个节点的名称来测试。

![image-20221113234143603](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221113234143603.png)

## ClusterIP 模式、服务发现基本入门和调用

把上面的`mygo`再换成`ClusterIP(Internal only)`模式，只能内部访问，应用只要在集群内部都可以访问，外部如公网则无法访问它。类似：`mysql、redis`我们都不需要外部访问，就可以使用这个模式。

![image-20221114223059732](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221114223059732.png)

![image-20221114223115274](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221114223115274.png)

使用此模式之后，这里的 IP 和端口就不见了，变成这个模式之后，外部就无法访问了，我们需要自己写程序来访问。

```go
package main

import (
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
)

func main(){

	r:=gin.Default()
	r.Handle("GET","/", func(context *gin.Context) {
		 host:=context.Query("host")
		 if host==""{
			 context.JSON(400,gin.H{"error":"no host!"})
			 return
		 }
		 // http://mygo
		 rsp,err:=http.Get("http://"+host)
		 if err!=nil{
		 	context.JSON(400,gin.H{"error":err})
		 }else{
		 	b,err:=ioutil.ReadAll(rsp.Body)
		 	if err!=nil{
				context.JSON(400,gin.H{"error":err})
			}else{
				context.JSON(200,gin.H{"message":string(b)})
			}

		 }
	})


	err:=r.Run(":80")
	if err!=nil{
		log.Fatal(err)
	}
}
```

---

`Rancher2.4`使用`k8s-coredns`作为服务发现基础，让在同一个命名空间内的可以通过`service_name`直接解析。不同的则需要使用`service_name.namespace_name`。

我们可以在同命名空间下部署一个`HostPort`不同端口的上面的程序交叉编译的可执行文件，分别去不同的端口去访问。

## 配置一台 nfs 服务进行跨主机文件共享

主机操作(`centos7.8`)

安装`nfs-utils`

```bash
sudo yum install -y nfs-utils
```

配置

```bash
sudo vi /etc/sysconfig/nfs
```

没有`vi`的可以安装一下`vim`

加入以下内容

```
LOCKD_TCPPORT=30001 #TCP锁使用端口
LOCKD_UDPPORT=30002 #UDP锁使用端口
MOUNTD_PORT=30003 #挂载使用端口
STATD_PORT=30004 #状态使用端口
```

> 启动、重启服务

```bash
sudo systemctl restart rpcbind.service
sudo systemctl restart nfs-server.service
```

> 设置开机启动

```bash
sudo  systemctl enable rpcbind.service
sudo systemctl enable nfs-server.service
```

> 编辑共享目录

```bash
sudo vim /etc/exports
```

写入一下内容

你所要设置的共享目录，以及对应的内网地址的网关

```
/home/wxvirus/goapi			内网ip公共部分.0/24(rw,async)
```

|      参数      |                                 作用                                 |
| :------------: | :------------------------------------------------------------------: |
|       ro       |                                 只读                                 |
|       rw       |                                 读写                                 |
|  root_squash   |    当 NFS 客户端以 root 管理员访问时，映射为 NFS 服务器的匿名用户    |
| no_root_squash |  当 NFS 客户端以 root 管理员访问时，映射为 NFS 服务器的 root 管理员  |
|   all_squash   |      无论 NFS 客户端使用什么访问，均映射为 NFS 服务器的匿名用户      |
|      sync      |             同时将数据写入到内存与硬盘中，保证不丢失数据             |
|     async      | 优先将数据保存到内存，然后再写入硬盘；这样效率更高，但可能会丢失数据 |

> 查看挂载

```bash
showmount -e localhost
Export list for localhost:
```

如果不重启服务，这里是没有的

再次重启`nfs`服务

```bash
sudo systemctl restart nfs-server.service
```

再次执行查看挂载就会出现配置的内容

```bash
Export list for localhost:
/home/wxvirus/goapi 个人内网ip.0/24
```

> 到另外的主机也要安装一下`nfs-utils`，不需要启动`nfs`服务

安装完了，直接执行查看挂载的命令

```bash
showmount -e 内网ip公共部分.xx
```

> 尝试进行挂载

```bash
mount -t nfs 内网ip:/home/wxvirus/goapi /home/wxvirus/goapi
```

后面的文件夹你随意，这里我们写成一样的。

这个时候我们再次进入`/home/wxvirus/goapi`查看是否有另外一个主机创建的`test.txt`文件，并查看内容是否一致。

可以使用`df -h`来查看挂载的盘符。可以使用`unmount /home/wxvirus/goapi`进行卸载。

## 使用 rancher 创建 PV 和 PVC、运行 GoAPI

> 概念

`Persistent Volume Claim`和`Persistent Volume`

-   PV: 定义`Volume`的类型、挂载目录、远程存储服务器等
-   PVC：定义`Pod`想要使用的持久化属性，比如存储大小、读写权限等
-   `StorageClass`：`PV`的模板，自动为`PVC`创建`PV`

![image-20221118225412262](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221118225412262.png)

使用`rancher`创建一个持久卷

![image-20221118225727446](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/image-20221118225727446.png)
