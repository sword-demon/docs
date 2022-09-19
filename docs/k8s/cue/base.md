# Cuelang 了解和基本使用

## 简介

> Cue 是一种开源数据约束语言，旨在简化涉及定义和使用数据的任务。
>
> 它是`json`的超集，让熟悉`json`的用户快速上手。

[github 地址](https://github.com/cue-lang/cue)

## 安装

现在是`go 1.17或者更高的`使用

```bash
go install cuelang.org/go/cmd/cue@v0.4.2
```

会安装到你的`GOPATH/bin`目录下，安装完了就可以使用`cue`命令

```bash
➜  cue version
cue version v0.4.2 darwin/arm64
```

## 基础使用

创建一个`test.cue`文件，如果是`goland`可以安装一个`cue`的扩展去识别该文件。

```cue
user: {
	name: "wujie",
	age: 19
}
```

### 基础命令：渲染输出

`cue export xxx.cue`

-   `cue export xxx.cue -e pod`指定输出
-   `cue export xxx.cue -e pod --out yaml`输出为`yaml`

```bash
➜  cue export test.cue
{
    "user": {
        "name": "wujie",
        "age": 19
    }
}

```

```cue
user: {
	name: "wujie",
	age: 19
}

pod: {
	"apiVersion": "v1",
	"kind": "Pod",
	"metadata": {
		"name": "mypod"
	},
	"spec": {
		"containers": [
			{
				"image": "nginx:1.18-alpine"
			}
		]
	}
}
```

```bash
➜  cue export test.cue
{
    "user": {
        "name": "wujie",
        "age": 19
    },
    "pod": {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
            "name": "mypod"
        },
        "spec": {
            "containers": [
                {
                    "image": "nginx:1.18-alpine"
                }
            ]
        }
    }
}

```

只渲染出`pod`对象的内容

```bash
➜  cue export test.cue -e pod
{
    "apiVersion": "v1",
    "kind": "Pod",
    "metadata": {
        "name": "mypod"
    },
    "spec": {
        "containers": [
            {
                "image": "nginx:1.18-alpine"
            }
        ]
    }
}

```

生成`yaml`格式的内容

```bash
➜  cue export test.cue -e pod --out yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - image: nginx:1.18-alpine

```

## 拆分对象

文档：[https://cuelang.org/docs/references/spec/](https://cuelang.org/docs/references/spec/)

类型相关：[https://cuelang.org/docs/references/spec/#predeclared-identifiers](https://cuelang.org/docs/references/spec/#predeclared-identifiers)

```cue
user: {
	name: "wujie",
	age: 19
}

metadata: {
	name: "nginx"
}

pod: {
	"apiVersion": "v1",
	"kind": "Pod",
	"metadata": metadata,
	"spec": {
		"containers": [
			{
				"image": "nginx:1.18-alpine"
			}
		]
	}
}
```

```bash
➜  cue export test.cue -e pod --out yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
    - image: nginx:1.18-alpine

```

### 简单验证

设置类型

```cue
#metadata: {
	name: string
}
```

验证生效

```cue
metadata: #metadata & {
	name: "nginx"
}
```

如果想要字符串和整型都支持

```cue
#metadata: {
	name: string | int
}
```

如果写了类型，但是你下面没写，会提示错误要你填写

### 可选属性

```cue
#metadata: {
	name: string
	namespace?: string
}
```

可填可不填，可以在键后面加上问号

```cue
#metadata: {
	name: string
	namespace?: string | *"default"
}
```

此时，如果你不填，生成的对象就没有`namespace`

```bash
➜ cue export test.cue -e pod --out yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
    - image: nginx:1.18-alpine

```

如果把问号去掉且你还是没填，则会给你生成一个默认的`namespace`对应的值为`default`

```bash
➜  cue export test.cue -e pod --out yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  namespace: default
spec:
  containers:
    - image: nginx:1.18-alpine

```

但是如果你加了问号，也自己写了对应的内容，就会显示你写的对应的内容。

还可以使用变量来代替默认值的设置

```cue
let defaultns = "default"

#metadata: {
	name: string
	namespace: string | *defaultns
}
```

## 列表的快速使用

```cue
#container: {
	name?: string
	image: string
}

#containers: [...#container]
containers: #containers & [
	{
		name: "nginx"
		image: "nginx:1.18-alpine"
	}
]

pod: {
	"apiVersion": "v1",
	"kind": "Pod",
	"metadata": metadata,
	"spec": {
		"containers": containers
	}
}
```

参数模式

```cue
param: {
	apiVersion: "v1",
	kind: "Pod"
}

pod: {
	"apiVersion": param.apiVersion,
	"kind": param.kind,
	"metadata": metadata,
	"spec": {
		"containers": containers
	}
}
```
