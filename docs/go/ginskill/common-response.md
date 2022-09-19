# Gin 通用响应封装

## 公共响应

```go
package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"sync"
)

type JSONResult struct {
	Message string      `json:"message"`
	Code    string      `json:"code"`
	Result  interface{} `json:"result"`
}

func NewJSONResult(message string, code string, result interface{}) *JSONResult {
	return &JSONResult{Message: message, Code: code, Result: result}
}

var ResultPool *sync.Pool

func init() {
	ResultPool = &sync.Pool{
		// 定义池子里放什么: 初始化一个 JSONResult 实例
		// 可以复用已经使用过的对象
		// 减少对象的创建和回收的时间
		New: func() interface{} {
			return NewJSONResult("", "", nil)
		},
	}
}

type ResultFunc func(message, code string, result interface{}) func(output Output)
// Output 决定返回的函数类型 对应下面的 Ok 和 Error
type Output func(c *gin.Context, v interface{})
// R 通用响应内容封装
func R(c *gin.Context) ResultFunc {
	return func(message, code string, result interface{}) func(output Output) {
		r := ResultPool.Get().(*JSONResult)
		// 取出数据后通过 Put 放回去
		defer ResultPool.Put(r)
		r.Message = message
		r.Code = code
		r.Result = result
		// c.JSON(http.StatusOK, r)
		return func(output Output) {
			output(c, r)
		}
	}
}

func Ok(c *gin.Context, v interface{}) {
	c.JSON(http.StatusOK, v)
}

func Error(c *gin.Context, v interface{}) {
	c.JSON(http.StatusBadRequest, v)
}

func Ok2String(c *gin.Context, v interface{}) {
	c.String(http.StatusOK, fmt.Sprintf("%v", v))
}

```

## 案例调用

::: tip 案例
简单实用一个用户列表查询`demo`
:::

> 相当于控制器调用

```go
func UserList(c *gin.Context) {
	user := UserModel.New()
	result.Result(c.ShouldBind(user)).Unwrap()

	if user.UserId > 10 {
		R(c)("get user list", "10001", Getter.UserGetter.GetUserList())(Ok)
	} else {
		R(c)("userList", "10002", "userList")(Error)
	}
}
```
