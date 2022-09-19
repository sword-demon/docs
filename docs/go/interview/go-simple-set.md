# Go 实现简单的 Set

## 概念

> 常见的`Set`在别的语言里是一个集合，里面的内容不能重复

我们可以基于`map`来进行设置

```go
type Empty struct{}
type Set1 map[interface{}]Empty

func (s Set1) Add(vs ...interface{}) Set1 {
	for _, v := range vs {
		s[v] = Empty{}
	}
	return s
}

func (s Set1) String() string {
	var buff bytes.Buffer
	for k, _ := range s {
		if buff.Len() > 0 {
			buff.WriteString(",")
		}
		buff.WriteString(fmt.Sprintf("%v", k))
	}
	return buff.String()
}

func NewSet() Set1 {
	return make(map[interface{}]Empty)
}

func test25() {
	set := NewSet().Add(1, 2, 3, 4, 5, 2, 3)
	fmt.Println(set)
}

func main() {
	test25()
}
```

:::danger

如果涉及到多线程的`map`安全，可以使用`sync.Map`

:::
