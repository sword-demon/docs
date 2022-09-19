# 统计文本的行数

## 使用`bufio.scanner`

> 就好比是一个带缓冲区的迭代器。不会一下子将文本内容加入到内存中。

**scanner 方法**

-   `NewScanner`创建`Scanner`
-   `Scanner.Split`设置处理函数
-   `Scanner.Scan`获取当前`token`，扫描下一`token`
-   `Scanner.Bytes`将`token`以`[]byte`的形式返回
-   `Scanner.Text`将`token`以`string`的形式返回
-   `Scanner.Err`获取处理方法返回的错误

**处理方法**

-   `ScanBytes`将`token`处理为单一字节
-   `ScanRunes`将`token`处理为`utf-8`编码的`unicode`码
-   `ScanWords`以空格分隔
-   `ScanLines`以换行符分割`token`，默认处理方法

```go
func test31() {
	file, err := os.Open("go.mod")
	if err != nil {
		log.Fatalln(err)
	}
	scanner := bufio.NewScanner(file)
	//scanner.Split(bufio.ScanLines)
	scanner.Split(bufio.ScanWords)
	count := 0
	for scanner.Scan() {
		log.Println(scanner.Text())
		count++
	}
	fmt.Println("一共有: ", count, "行")
}

func main() {
	test31()
}

```

我们也可以自己去`copy`一份处理方法过来改成我们自己想要的内容，比如以`:`分割

```go
func split(data []byte, atEOF bool) (advance int, token []byte, err error) {
	if atEOF && len(data) == 0 {
		return 0, nil, nil
	}
    if i := bytes.IndexByte(data, ':'); i >= 0 {
		// We have a full newline-terminated line.
		return i + 1, dropCR(data[0:i]), nil
	}
	// If we're at EOF, we have a final, non-terminated line. Return it.
	if atEOF {
		return len(data), dropCR(data), nil
	}
	// Request more data.
	return 0, nil, nil
}

// dropCR drops a terminal \r from the data.
func dropCR(data []byte) []byte {
    if len(data) > 0 && data[len(data)-1] == ':' {
		return data[0 : len(data)-1]
	}
	return data
}
```

然后我们就可以在自己的方法里调用即可。

---

这个不仅仅可以读文件，也可以读字符串内容

```go
func test31() {
	reader := strings.NewReader("aaa:bbb:ccc:ddd:eee")
	scanner := bufio.NewScanner(reader)
	//scanner.Split(bufio.ScanLines)
	scanner.Split(bufio.ScanLines)
	count := 0
	for scanner.Scan() {
		log.Println(scanner.Text())
		count++
	}
	fmt.Println("一共有: ", count, "行")
}

```

只要实现了`Reader`接口的都能进行读取

```go
type Reader interface {
	Read(p []byte) (n int, err error)
}
```
