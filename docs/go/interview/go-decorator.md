# Go 的装饰器模式

特性：

> 允许向一个现有的对象添加新的功能，同时又不改变其结构。

```go
func Decorator(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("this is"))
		f(w, r)
	}
}

func index(writer http.ResponseWriter, request *http.Request) {
	writer.Write([]byte("index"))
}

func main() {
	http.HandleFunc("/", Decorator(index))
	http.ListenAndServe(":8080", nil)
}

```

在网页上输入: `localhost:8080`，原先则只是`index`，现在加了装饰器函数之后会得到`this is index`内。
