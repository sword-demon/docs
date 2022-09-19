# 封装中间件来响应错误消息

## 错误捕捉中间件的实现

```go
package common

import "github.com/gin-gonic/gin"

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if e := recover(); e != nil {
				c.JSON(400, gin.H{"message": e})
			}
		}()
		c.Next()
	}
}

```

## gin 中进行注册

```go
r := gin.New()
r.Use(common.ErrorHandler())
r.Run(":8080")
```
