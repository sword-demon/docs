# 协程为什么总数先输出倒数第一个

```go
// 协程为什么总是先输出倒数第一个
func test20()  {
	runtime.GOMAXPROCS(1)
	wg := sync.WaitGroup{}
	wg.Add(5)
	for i := 0; i < 5; i++ {
		go func(i int) {
			defer wg.Done()
			fmt.Printf("%d ", i)
		}(i)
	}
	wg.Wait()
}
```

1. `runtime.GOMAXPROCS` GO 本身默认使用所有的 CPU 核
2. 当我们设置 CPU 核数为 1 时，就变成了单核运行了
3. 单核情况下，所有`goroutine`(G)运行在同一线程`M`(工作线程)中，线程维护一个上下文`P`(Process 上下文或 CPU)

> 原因：
> 程序中，我们循环创建了若干协程，且是单核

1. P 就绪后，开始执行，默认先执行的是最后一个创建的协程
2. 然后再继续执行其他的协程，此次是按顺序来的

## 解决

我们可以再加一个协程去做点别的事情

```go
func test20()  {
	runtime.GOMAXPROCS(1)
	wg := sync.WaitGroup{}
	wg.Add(6)
	for i := 0; i < 5; i++ {
		go func(i int) {
			defer wg.Done()
			fmt.Printf("%d ", i)
		}(i)
	}
	go func() {
		defer wg.Done()
		fmt.Println("我要开始循环了")
	}()
	wg.Wait()
}
```

然后就能保证输出是顺序的。

```bash
我要开始循环了
0 1 2 3 4 %
```

## 回答面试的点

1. 首先回答是 CPU 单核执行的
2. 然后再说明协程运行是第一个运行的是它最后创建的协程
3. 如果要解决要再加一个协程去做点别的事情当成第一个执行的协程就可以输出顺序的内容
