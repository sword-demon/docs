# Go 的并发模式

几个点：

1. Go 有协程以及 CSP 调度模型，是它可以进行并发运行的基础
2. 我们可以使用协程来完成“并发变成”
3. Go 有一句并发编程的哲学化口号：不要通过共享内存来通信，而应通过通信来共享内存
4. 并发编程的重点在于：如何精准的控制“共享数据”

## 最基本的

`sync.WaitGroup`搭配协程

```go
func test18()  {
	wg := sync.WaitGroup{}
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go func(input int) {
			defer wg.Done()
			fmt.Println(input*2)
		}(i)
	}
	wg.Wait()
}
```

## 通过 channel 来通信

```go
func test18() {
	c := make(chan int, 3)
	for i := 0; i < 3; i++ {
		go func(input int) {
			c <- input*2
		}(i)
	}

	for i := 0; i < cap(c); i++ {
		fmt.Println(<-c)
	}
}
```

## 生产者消费者

```go
func Producer(out chan int) {
	// 不要忘了关闭
	defer close(out)
	for i := 0; i < 5; i++ {
		out <- i * 2
		time.Sleep(time.Second)
	}
}

func Consumer(out chan int) {
	for item := range out {
		fmt.Println(item)
	}
}

func main() {
	c := make(chan int)
	go Producer(c)
	Consumer(c)
}
```

### 第二种写法

```go
func Consumer(out chan int, r chan struct{}) {
	for item := range out {
		fmt.Println(item)
	}
	r <- struct{}{}
}

func main() {
	c := make(chan int)
	r := make(chan struct{}) // 开关协程
	go Producer(c)
	go Consumer(c, r)

	<-r
}
```

### 第三种：推荐

```go
func Producer(out chan int) {
	// 不要忘了关闭
	defer close(out)
	for i := 0; i < 5; i++ {
		out <- i * 2
		time.Sleep(time.Second)
	}
}

func Consumer(out chan int) (r chan struct{}) {
	// 初始化
	r = make(chan struct{})
	go func() {
		defer func() {
			r <- struct{}{}
		}()
		for item := range out {
			fmt.Println(item)
		}
	}()
	return r
}

func main() {
	c := make(chan int)
	go Producer(c)
	r := Consumer(c)
	<-r
}
```

## 优胜劣汰模式

使用多个协程同时处理一个任务

模拟一个任务

```go
func LongTimeJob() int {
	rand.Seed(time.Now().Unix())
	result := rand.Intn(5)
	time.Sleep(time.Second * time.Duration(result)) // 模拟延迟
	return result
}
```

实现

```go
func main() {
	c := make(chan int, 5)
	for i := 0; i < 5; i++ {
		go func() {
			c <- LongTimeJob()
		}()
	}
	fmt.Println("最快用了:", <-c, "秒")
}
```
