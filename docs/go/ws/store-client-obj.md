# JS 脚本简学、保存客户端对象封装

## 客户端即 HTML 页面代码

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>客户端A</title>
    </head>
    <body>
        <div>
            <div id="message" style="width: 500px;height:300px;border:solid 1px gray;overflow:auto"></div>
        </div>
        <script>
            var ws = new WebSocket('ws://localhost:8080/echo')
            ws.onopen = function () {
                //当WebSocket创建成功时，触发onopen事件
                console.log('open')
                ws.send('i am user-a') //将消息发送到服务端
            }
            ws.onmessage = function (e) {
                //当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
                let html = document.getElementById('message').innerHTML

                html += '<p>服务端消息:' + e.data + '</p>'
                document.getElementById('message').innerHTML = html
            }
            ws.onclose = function (e) {
                //当客户端收到服务端发送的关闭连接请求时，触发onclose事件
                console.log('close')
            }
            ws.onerror = function (e) {
                //如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
                console.log(e)
            }
        </script>
    </body>
</html>
```

然后我们运行前面的服务端代码

```bash
go run main.go
```

然后打开我们的`html`页面

![client](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/20220915232310.png)

## 保存客户端对象

迁移升级对象

`Common.go`

```go
package core

import (
	"github.com/gorilla/websocket"
	"net/http"
)

var UpGrader websocket.Upgrader

func init()  {
	UpGrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
}
```

定义存储客户端对象结构体
`ClientMap.go`

```go
package core

import (
	"github.com/gorilla/websocket"
	"log"
	"sync"
)

// 存储客户端对象

// ClientMap 外部公共使用
var ClientMap *ClientMapStruct

func init() {
	ClientMap = &ClientMapStruct{}
}

type ClientMapStruct struct {
	data sync.Map // key 是客户端IP value 是websocket连接对象
}

func (c *ClientMapStruct) Store(key string, conn *websocket.Conn)  {
	c.data.Store(key, conn)
}

// SendAll 向所有客户端发送消息
func (c *ClientMapStruct) SendAll(msg string) {
	c.data.Range(func(key, value interface{}) bool {
		err := value.(*websocket.Conn).WriteMessage(websocket.TextMessage, []byte(msg))
		if err != nil {
			log.Println(err)
		}
		return true
	})
}
```

迁移`main.go`代码中的`handle`函数

`Echo.go`

```go
package handlers

import (
	"log"
	"net/http"
	"wspro/src/core"
)

func Echo(w http.ResponseWriter, r *http.Request) {
	client, err := core.UpGrader.Upgrade(w, r, nil) // 升级
	if err != nil {
		log.Println(err)
	} else {
		core.ClientMap.Store(client.RemoteAddr().String(), client)
	}
}

```

主函数改写

```go
package main

import (
	"log"
	"net/http"
	"wspro/src/core"
	"wspro/src/handlers"
)

func main() {
	http.HandleFunc("/echo", handlers.Echo)
	http.HandleFunc("/send_all", func(w http.ResponseWriter, r *http.Request) {
		msg := r.URL.Query().Get("msg")
		core.ClientMap.SendAll(msg)
		w.Write([]byte("ok"))
	})
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalln(err)
	}
}

```
