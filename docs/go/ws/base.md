# 基本的 websocket 代码

> 是 HTML5 提供的一个浏览器与服务器之间进行全双工通讯的网络技术。

全双工：在同一时刻信息可以进行双向传输，和打电话一样，说的同时也能听，边说边听。

是基于 HTTP 协议的

```text
GET /HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: xxxxxxxx== # 是一个base64加密的秘钥
Sec-WebSocket-Version: 13 # 告诉服务器ws的版本
Origin: http://xxx.com # 来源
```

其中：`upgrade websocket`用于告诉服务器此连接需要升级到`websocket`，意味着你的服务端需要支持`websocket`协议。

**服务端响应**

```text
HTTP/1.1 101 Switching Protocols
Content-Length: 0
Upgrade: websocket
Sec-WebSocket-Accept: ZEs+c+VBdqwdqwdwqdqwdqw=dqwd
Connection: Upgrade
```

-   101：代表的是协议切换
-   `Sec-WebSocket-Accept`：表示服务器同意握手建立连接

下面开始就和`http`没啥关系了。

## 第三方库

地址：[https://github.com/gorilla/websocket](https://github.com/gorilla/websocket)

安装：

```bash
go get github.com/gorilla/websocket
```

创建一个`upgrader`对象

```go
var upgrader = websocket.Upgrader {
    CheckOrigin: func(r *http.Request) bool {
        return true
    },
}
```

跨域处理，现在是所有来源都可以访问：`return true`

```go
package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"time"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	http.HandleFunc("/echo", func(w http.ResponseWriter, r *http.Request) {
		// 客户端连接对象
		client, err := upgrader.Upgrade(w, r, nil) // 升级
		if err != nil {
			fmt.Println(err)
		}
		for {
			err := client.WriteMessage(websocket.TextMessage, []byte("hello"))
			if err != nil {
				log.Println(err)
			}
			time.Sleep(time.Second * 2)
		}
	})
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalln(err)
	}
}

```

服务启动后，可以找一个在线的`websocket`测试网站进行测试。
