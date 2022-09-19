# 管道模式

## 初级

Linux 命令有一个很经典的命令

```bash
cat log.txt | grep "xxx"
```

> 前面的每一个进程的输出(stdout)直接作为下一个进程的输入(stdin)

## 案例

> 假设有一个切片，我们需要从里面找到偶数，找到之后，把偶数乘以 10

### 常用方式

```go
func Evens(list []int) (ret []int) {
	ret = make([]int, 0)
	for _, num := range list {
		if num%2 == 0 {
			ret = append(ret, num)
		}
	}
	return
}

func Multiply(list []int) (ret []int) {
	ret = make([]int, 0)
	for _, num := range list {
		ret = append(ret, num * 10)
	}
	return
}
```

如果要换成管道模式运行

```bash
Evens nums | Multiply nums
```

常用方式模拟管道模式

```go
package main

import "fmt"

type Cmd func(list []int) (ret []int)

func Evens(list []int) (ret []int) {
	ret = make([]int, 0)
	for _, num := range list {
		if num%2 == 0 {
			ret = append(ret, num)
		}
	}
	return
}

func Multiply(list []int) (ret []int) {
	ret = make([]int, 0)
	for _, num := range list {
		ret = append(ret, num*10)
	}
	return
}

func p(args []int, c1, c2 Cmd) []int {
	ret := c1(args)
	return c2(ret)
}

func main() {
	nums := []int{2, 3, 321, 3321, 4, 54, 65, 767, 6, 83, 4234, 2423}

	fmt.Println(p(nums, Evens, Multiply))
}

```

## 使用 channel 改进管道模式

```go
package main

import "fmt"

type Cmd func(list []int) chan int
type PipeCmd func(in chan int) chan int // 支持管道的函数

func Evens(list []int) chan int {
	// 注意这个是没有缓冲区的
	c := make(chan int)
	// 使用协程执行 异步完成
	go func() {
		defer close(c)
		for _, num := range list {
			// 业务流程
			if num%2 == 0 {
				c <- num
			}
		}
	}()
	// 先返回
	return c
}

// M10 这个函数时支持管道的 参数 channel
func M10(in chan int) chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for num := range in {
			out <- num * 10
		}
	}()

	return out
}

func Pipe(args []int, c1 Cmd, c2 PipeCmd) chan int {
	ret := c1(args)
	return c2(ret)
}

func main() {
	nums := []int{2, 3, 321, 3321, 4, 54, 65, 767, 6, 83, 4234, 2423}

	ret := Pipe(nums, Evens, M10)
	for r := range ret {
		fmt.Printf("%d ", r)
	}
}

```

> 多参数调整

```go
package main

import (
	"fmt"
)

type Cmd func(list []int) chan int
type PipeCmd func(in chan int) chan int // 支持管道的函数

func Evens(list []int) chan int {
	// 注意这个是没有缓冲区的
	c := make(chan int)
	// 使用协程执行 异步完成
	go func() {
		defer close(c)
		for _, num := range list {
			// 业务流程
			if num%2 == 0 {
				c <- num
			}
		}
	}()
	// 先返回
	return c
}

// M10 这个函数时支持管道的 参数 channel
func M10(in chan int) chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for num := range in {
			out <- num * 10
		}
	}()

	return out
}

func M2(in chan int) chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for num := range in {
			out <- num * 2
		}
	}()

	return out
}

func Pipe(args []int, c1 Cmd, cs ...PipeCmd) chan int {
	ret := c1(args)

	if len(cs) == 0 {
		return ret
	}

	retList := make([]chan int, 0)
	for index, c := range cs {
		if index == 0 {
			retList = append(retList, c(ret))
		} else {
			// 获取最后一个执行的结果
			getChan := retList[len(retList)-1]
			retList = append(retList, c(getChan))
		}
	}
	return retList[len(retList)-1]
}

func main() {
	nums := []int{2, 3, 321, 3321, 4, 54, 65, 767, 6, 83, 4234, 2423}

	ret := Pipe(nums, Evens, M10, M10, M10, M10)
	for r := range ret {
		fmt.Printf("%d ", r)
	}
}

```

## 多路复用、提高性能

> 前面 2 个执行的顺序

![前面执行的顺序](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/20220828221716.png)

> 实现多路复用则为：

![多路复用](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/20220828222113.png)

:::tip

多个函数同时从同一个`channel`里读取数据，直至`channel`被关闭，则可以更好的利用多核。

:::

多路复用版：

```go
// Pipe2 多路复用实现
func Pipe2(args []int, c1 Cmd, cs ...PipeCmd) chan int {
	ret := c1(args) // 找偶数
	out := make(chan int)
	wg := sync.WaitGroup{}
	for _, c := range cs {
		getChan := c(ret)
		wg.Add(1)
		go func(input chan int) {
			defer wg.Done()
			for v := range input {
				out <- v
			}
		}(getChan)
	}
	// 也得开协程执行，否则会一直等着上面所有的协程执行完，那么效率也会很低
	go func() {
		defer close(out) // wait 结束就关闭
		wg.Wait()
	}()
	return out
}

func main() {
	nums := []int{2, 3, 321, 3321, 4, 54, 65, 767, 6, 83, 4234, 2423}

	ret := Pipe2(nums, Evens, M10, M10, M10, M10, M10, M10, M10)
	for r := range ret {
		fmt.Printf("%d ", r)
	}
}

```

> 当处理的函数越来越多的时候，它执行的速度越来越快，我这个已经基本就是 1 秒种就完成了。

## 相对通用的管道工具类

![channel](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/20220903211718.png)

```go
package getdata

import "sync"

type InChan chan interface{}
type OutChan chan interface{}

// 获取数据的函数
type CmdFunc func(args ...interface{}) InChan
// 操作数据的函数
type PipeCmdFunc func(in InChan) OutChan

type Pipe struct {
	Cmd     CmdFunc
	PipeCmd PipeCmdFunc
	Count   int
}

func NewPipe() *Pipe {
	return &Pipe{Count: 1}
}

func (p *Pipe) SetCmd(c CmdFunc) {
	p.Cmd = c
}

func (p *Pipe) SetPipeCmd(c PipeCmdFunc, count int) {
	p.PipeCmd = c
	p.Count = count
}

func (p *Pipe) Exec(args ...interface{}) OutChan {
	in := p.Cmd(args)
	out := make(OutChan)
	wg := sync.WaitGroup{}
	for i := 0; i < p.Count; i++ {
		getChan := p.PipeCmd(in)
		wg.Add(1)
		go func(input OutChan) {
			defer wg.Done()
			for v := range input {
				out <- v
			}
		}(getChan)
	}
	go func() {
		defer close(out)
		wg.Wait()
	}()
	return out
}

```

```go
package getdata

import (
	"fmt"
	"go++/src/pipeline/AppInit"
	"log"
)

const sql = "select * from book limit ? offset ?"

func GetPage(args ...interface{}) InChan {
	in := make(InChan)
	go func() {
		defer close(in)
		for i := 1; i <= 80; i++ {
			in <- i
		}
	}()
	return in
}

func DoData(in InChan) OutChan {
	out := make(OutChan)
	go func() {
		defer close(out)
		for d := range in {
			v := d.([]*Book)
			out <- fmt.Sprintf("处理了%d条数据\n", len(v))
		}
	}()
	return out
}

func GetData(in InChan) OutChan {
	out := make(OutChan)
	go func() {
		defer close(out)
		for d := range in {
			page := d.(int)
			pageSize := 1000
			bookList := &BookList{make([]*Book, 0), page}
			db := AppInit.GetDB().Raw(sql, pageSize, (page-1)*pageSize).Find(&bookList.Data)
			if db.Error != nil {
				log.Println(db.Error)
			}
			out <- bookList.Data
		}
	}()
	return out
}

func PipeTest() {
	p1 := NewPipe()
	p1.SetCmd(GetPage)
	p1.SetPipeCmd(GetData, 2)
	out := p1.Exec()

	p2 := NewPipe()
    // 第一个管道的结果作为第二个管道的内容
	p2.SetCmd(func(args ...interface{}) InChan {
		return InChan(out)
	})
	p2.SetPipeCmd(DoData, 5)
	out2 := p2.Exec()

	for item := range out2 {
		fmt.Println(item)
	}
}

```
