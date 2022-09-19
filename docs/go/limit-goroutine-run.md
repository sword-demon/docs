# 限制协程执行的基本方法

## demo

```go
func job(index int) {
	// 模拟延迟
	time.Sleep(time.Millisecond * 500)
	fmt.Printf("执行完毕，序号: %d\n", index)
}

var pool chan struct{}

func main() {
	// 限制10个
	maxNum := 10
	pool = make(chan struct{}, maxNum)

	wg := sync.WaitGroup{}
	for i := 0; i < 100; i++ {
		pool <- struct{}{} // 到达最大长度是阻塞
		wg.Add(1)
		go func(index int) {
			defer wg.Done()
			defer func() {
				<-pool
			}()
			job(index)
		}(i)
	}
	wg.Wait()
}

```
