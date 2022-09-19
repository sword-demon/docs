# 限流算法

## 令牌桶

简单粗暴：没有限流，全程一把梭，直接干，可以认为是一个执行函数，也可以是`http`请求。

:::tip 令牌桶原理

系统会以一个恒定的速度往桶里放入令牌，询问”是否可以访问之前“，需要先从桶里获得一个令牌，当桶里没有令牌可取时，则拒绝服务。

:::

简单实现：

```go
package lib

import (
	"sync"
)

type Bucket struct {
	cap    int
	tokens int
	lock   sync.Mutex
}

func NewBucket(cap int) *Bucket {
	if cap <= 0 {
		panic("error cap")
	}
	return &Bucket{cap: cap, tokens: cap}
}

func (b *Bucket) IsAccept() bool {
	b.lock.Lock()
	defer b.lock.Unlock()
	if b.tokens > 0 {
		b.tokens--
		return true
	}
	return false
}

```

```go
package main

import (
	"github.com/gin-gonic/gin"
	"ratelimit/lib"
)

func main() {
	ratelimiter := lib.NewBucket(10)
	r := gin.New()
	r.GET("/", func(c *gin.Context) {
		if ratelimiter.IsAccept() {
			c.JSONP(200, gin.H{"message": "ok"})
		} else {
			c.AbortWithStatusJSON(400, gin.H{"message": "rate limit"})
		}
	})
	r.Run(":8080")
}

```

这样访问设置桶的数量次数之后就都是`rate limit`了。

### 使用装饰器优化

```go
package lib

import "github.com/gin-gonic/gin"

// Limiter 限流装饰器
func Limiter(cap int) func(h gin.HandlerFunc) gin.HandlerFunc {
	limiter := NewBucket(cap)
	return func(h gin.HandlerFunc) gin.HandlerFunc {
		return func(c *gin.Context) {
			if limiter.IsAccept() {
				h(c)
			} else {
				c.AbortWithStatusJSON(429, gin.H{"message": "too many requests"})
			}
		}
	}
}

```

```go
package main

import (
	"github.com/gin-gonic/gin"
	"ratelimit/lib"
)

func test(c *gin.Context) {
	c.JSONP(200, gin.H{"message": "ok"})
}

func main() {
	r := gin.New()
	r.GET("/", lib.Limiter(3)(test))
	r.Run(":8080")
}

```

> 加了装饰器的就会有限流效果，没有加的就没有限流效果。

### 处理令牌速率

```go
package lib

import (
	"sync"
	"time"
)

type Bucket struct {
	cap      int64
	tokens   int64
	lock     sync.Mutex
	rate     int64   // 每秒加入令牌数
	lastTime int64 // 上一次追加token的时间戳
}

func NewBucket(cap, rate int64) *Bucket {
	if cap <= 0 || rate <= 0 {
		panic("error cap or rate")
	}
	bucket := &Bucket{cap: cap, tokens: cap, rate: rate}
	return bucket
}

func (b *Bucket) IsAccept() bool {
	b.lock.Lock()
	defer b.lock.Unlock()
	now := time.Now().Unix()
	// 立刻进行判断
	b.tokens = b.tokens+(now-b.lastTime)*b.rate
	if b.tokens > b.cap {
		b.tokens = b.cap
	}
	b.lastTime = now
	if b.tokens > 0 {
		b.tokens--
		return true
	}
	return false
}

```

## 扩展：支持简单参数限流

> 比如链接里有某参数就进行限流，否则就不进行限流。

在`Limiter`方法基础上进行扩展出一个方法

```go
package lib

import "github.com/gin-gonic/gin"

func ParamLimiter(cap int64, rate int64, key string) func(h gin.HandlerFunc) gin.HandlerFunc {
	limiter := NewBucket(cap, rate)
	return func(h gin.HandlerFunc) gin.HandlerFunc {
		return func(c *gin.Context) {
			// 判断对应的key是否有
			if c.Query(key) != "" {
				if limiter.IsAccept() {
					h(c)
				} else {
					c.AbortWithStatusJSON(429, gin.H{"message": "too many request-param"})
				}
			} else {
				// 不做处理
				h(c)
			}
		}
	}
}

```

测试

```go
package main

import (
	"github.com/gin-gonic/gin"
	"ratelimit/lib"
)

func test(c *gin.Context) {
	c.JSONP(200, gin.H{"message": "ok"})
}

func main() {
	r := gin.New()
	r.GET("/", lib.ParamLimiter(5, 1, "name")(lib.Limiter(3)(test)))
	r.Run(":8080")
}

```

如果是正常的访问，则会触发里面的限流方法，如果带上`name`参数的请求则会触发外部的限流。

## 基于 IP 的限流(无脑)

IP 我们就不能使用上面的`Limiter`来整，我们需要使用一个`sync.Map`来存储访问的 IP，如果下次还有就进行取出去判断。

```go
package lib

import (
	"github.com/gin-gonic/gin"
	"sync"
)

type LimiterCache struct {
	date sync.Map // key=ip+端口 value=bucket对象
}

var IPCache *LimiterCache

func init() {
	IPCache = &LimiterCache{}
}

func IPLimiter(cap int64, rate int64) func(h gin.HandlerFunc) gin.HandlerFunc {
	return func(h gin.HandlerFunc) gin.HandlerFunc {
		return func(c *gin.Context) {
			// 先获取ip
			ip := c.Request.RemoteAddr
			var limiter *Bucket
			if v, ok := IPCache.date.Load(ip); ok {
				limiter = v.(*Bucket)
			} else {
				// 没有存储过，是一个新的ip
				limiter = NewBucket(cap, rate)
				// 后续可以使用 redis 来存储 现在是内存
				IPCache.date.Store(ip, limiter)
			}

			if limiter.IsAccept() {
				h(c)
			} else {
				c.AbortWithStatusJSON(429, gin.H{"message": "too many requests"})
			}
		}
	}
}

```

测试，因为是在本地，所以可以采取不同的浏览器来进行测试。

```go
package main

import (
	"github.com/gin-gonic/gin"
	"ratelimit/lib"
)

func test(c *gin.Context) {
	c.JSONP(200, gin.H{"message": "ok"})
}

func main() {
	r := gin.New()
	r.GET("/", lib.IPLimiter(5, 1)(test))
	r.Run(":8080")
}

```

:::tip 注意

这里的`data`不能随意的存储下去，如果有一万个`ip`进行访问，那么这些`ip`是否需要被清理，否则就会慢慢资源耗尽。

:::

:::tip 解决思路

1.  我们可以加一个过期时间，过期就清理
2.  或者加一个淘汰机制，一旦这个`ip`经常被使用则保存，不是经常使用，就进行淘汰，就会使用到很有名的`LRU`算法

:::

## LRU 算法、go 自带双向链表

> `LRU(Least Recently Used)`即最近很少使用；
>
> 该算法如果用于缓存中，可以实现缓存淘汰机制。

![](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/20220919232853.png)

![](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/20220919233125.png)

> Go 自带双向链表：在包`container/list`包中有。
>
> 它的每个数据都有 2 个指针，分别指向直接后继和直接前驱。

```go
// List represents a doubly linked list.
// The zero value for List is an empty list ready to use.
type List struct {
	root Element // sentinel list element, only &root, root.prev, and root.next are used
	len  int     // current list length excluding (this) sentinel element
}
```

```go
// Element is an element of a linked list.
type Element struct {
	// Next and previous pointers in the doubly-linked list of elements.
	// To simplify the implementation, internally a list l is implemented
	// as a ring, such that &l.root is both the next element of the last
	// list element (l.Back()) and the previous element of the first list
	// element (l.Front()).
	next, prev *Element

	// The list to which this element belongs.
	list *List

	// The value stored with this element.
	Value interface{}
}
```

简单`demo`

```go
package main

import (
	"container/list"
	"fmt"
	"log"
)

func main() {
	ll := &list.List{}

	ll.PushFront("v1") // 向头部插入一个元素

	ll.PushFront("v2")

	elem := ll.Front()
	if elem == nil {
		log.Fatalln("nil element")
	}
	for {
		fmt.Println(elem.Value)
		if elem.Next() == nil {
			break
		}
		elem = elem.Next()
	}
}

```

```bash
➜  ratelimit go run test.go
v2
v1

```
