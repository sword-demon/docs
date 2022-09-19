# 写一个带过期机制的 kv 获取 map

## 分析点

1. 原始的`map`不是线程安全的，所以使用`sync.Map`
2. 或者可以自己加锁
3. 过期：可以使用`time.AfterFunc`函数

## 简单编写

```go
var kv sync.Map

func Set(key string, value interface{}, expire time.Duration) {
	kv.Store(key, value)
	time.AfterFunc(expire, func() {
		// 过期后干掉它
		kv.Delete(key)
	})
}

func test21() {
	Set("ID", 101, time.Second*5)
	Set("name", "张三", time.Second*8)

	for {
		fmt.Println(kv.Load("ID"))
		fmt.Println(kv.Load("name"))
		time.Sleep(time.Second)
	}
}
```

```bash
➜ ./run
101 true
张三 true
101 true
张三 true
101 true
张三 true
101 true
张三 true
101 true
张三 true
<nil> false
张三 true
<nil> false
张三 true
<nil> false
张三 true
<nil> false
<nil> false

```
