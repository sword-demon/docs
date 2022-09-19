# defer 定义函数参数的问题

## 直接打印参数

```go

func test13()  {
	a := 1
	defer fmt.Println(a)
	a++
}

func main() {
	test13()
}
```

> 输出 1，因为变量 a 在定义的时候就已经确定了它就是 1

但是我们如果换成`defer`的匿名函数

```go
a := 1
defer func() {
	fmt.Println(a)
}()
a++
```

那么此时输出的就是 2；如果我们将参数传递给匿名函数，那么就能确定变量的定义，就还是会输出 1

## 使用指针方式来突破`defer`

```go
// 传指针
func show(i *int)  {
	fmt.Println(*i)
}

func test13()  {
	a := 1
	defer show(&a)
	a++
}
```

这里传的是变量 a 的地址，如果 a 的值发生了变化，上面打印的内容也会发生变化。
