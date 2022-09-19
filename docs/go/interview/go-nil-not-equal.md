# 明明是 nil 却!=nil 的问题

## 题目

```go
var f func()

var a *struct{}

func test10() {
	list := []interface{}{f, a}
	for _, item := range list {
		if item == nil {
			fmt.Println("nil")
		}
	}
}
```

上面不成立，但是改成`item != nil` 缺有输出

但是

```go
var f func()

var a *struct{}

func test12() {
	list := []interface{}{f, a}
	for _, item := range list {
		fmt.Println(item)
	}
}

func main() {
	test12()
}
```

这样打印，打印的内容确实是`nil`

```bash
➜ ./run
<nil>
<nil>
```

我们来打印一下类型和值

```go
fmt.Printf("%v\n", item)
fmt.Printf("%T\n", item)
```

发现内容为：

```bash
➜ ./run
<nil>
func()
<nil>
*struct {}

```

**注意：这里我们切片是一个`interface{}`**

`interface`

-   值
-   类型

它有 2 个内容组成，所以我们要判断是不是`nil`，就得判断它的值和类型是不是都是`nil`才可以。

## 使用反射来判断

**当然实际开发还是尽量避免遇到这种情况**

```go
var f func()
var a *struct{}

func test12() {
	list := []interface{}{f, a}
	for _, item := range list {
		if reflect.ValueOf(item).IsNil() {
			fmt.Println("nil")
		}
	}
}
```
