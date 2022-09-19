# Go 的单例模式

如果某些配置，或者某些加载的信息，如果在一开始启动的时候就只执行一次，或者偶尔调用一下，调用的模块不多，那么就没有必要使用单例模式，**只不过这个对象不是同一个地址，不是指向同一个内存。**

```go
type WebConfig struct {
	Port int
}

func GetConfig() *WebConfig {
	return &WebConfig{Port: 8080}
}

func main() {
	c := GetConfig()
	c2 := GetConfig()
	c3 := GetConfig()
	fmt.Println(c == c2, c2 == c3) // false false
}
```

简单加一个指针变量来接收，如果已经有该对象，就直接返回，如果没有是`nil`，就生成一个指针对象返回。

```go
type WebConfig struct {
	Port int
}

var cc *WebConfig

func GetConfig() *WebConfig {
	if cc == nil {
		cc = &WebConfig{Port: 8080}
	}
	return cc
}

func main() {
	c := GetConfig()
	c2 := GetConfig()
	c.Port = 9090
	fmt.Println(c == c2) // true
	fmt.Println(c2) // c2 的 Port 也会跟着变化
}
```

:::warning

此时，这里是单线程执行的，如果有多线程执行，那么就还是不行，此时我们就可以加锁，但是会有性能上的一些损失

:::

```go
var cc *WebConfig
var mu sync.Mutex

func GetConfig() *WebConfig {
	mu.Lock()
	defer mu.Unlock()
	if cc == nil {
		cc = &WebConfig{Port: 8080}
	}
	return cc
}

func main() {
	c := GetConfig()
	c2 := GetConfig()
	c.Port = 9090
	fmt.Println(c == c2)
	fmt.Println(c2)
}

```

:::tip

Go 自己有一个`sync.Once`包提供了这样的一个功能

:::

```go
var cc *WebConfig
var once sync.Once

func GetConfig() *WebConfig {
	// 如果有值就不会加锁
	once.Do(func() {
		cc = &WebConfig{Port: 8080}
	})
	return cc
}

func main() {
	c := GetConfig()
	c2 := GetConfig()
	c.Port = 9090
	fmt.Println(c == c2)
	fmt.Println(c2)
}

```
