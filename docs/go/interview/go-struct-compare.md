# Go 的结构体能比较吗？

:::danger 大坑
回答能/不能 都错
:::

> **应该是有时候可以，有时候不可以**

## 举例

```go
type Compare struct {
	id int
}
a := Compare{id: 101}
b := Compare{id: 101}
fmt.Println(a == b) // true
```

这一眼上去肯定是 true

但是我们加上一个`map`

```go
type Compare struct {
	id int
	m  map[string]string
}
```

同样的上面的代码则会报错

:::danger 报错
invalid operation: a == b (struct containing map[string]string cannot be compared)

:::

:::tip

1. map
2. slice
3. func

这 3 种类型的都不能进行比较
:::

---

我们如果加上取地址

```go
type Compare struct {
	id int
}
a := &Compare{id: 101}
b := &Compare{id: 101}
fmt.Println(a == b) // false
```

这比较下来为`false`

---

如果两个不同类型的呢

```go
type Compare struct {
	id int
}
type Compare1 struct {
	id int
}
a := Compare{id: 101}
b := Compare1{id: 101}
fmt.Println(a == b)
```

这样是不能比较的，会提示类型比较错误

> invalid operation: a == b (mismatched types Compare and Compare1)

但是我们进行类型转换那就可以进行比较

```go
fmt.Println(a == (Compare)b)
```

:::warning 前提
两个不同类型的成员都是一样的，而且都是可比较的，才能进行转换
:::

## 结论

-   相同结构，只要成员类型都可以比较，则就能比较
-   不相同的结构，如果能互相转化，也能比较，**前提是成员都是可比较的**
