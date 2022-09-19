# 读写关闭的`channel`是啥后果

```go
func main() {
	ch := make(chan int, 3)
	ch <- 1
	ch <- 2
	ch <- 3
	close(ch)

	for item := range ch {
		fmt.Println(item)
	}
}
```

能正常读取

---

```go
func main() {
	ch := make(chan int, 3)
	ch <- 1
	ch <- 2
	ch <- 3
	close(ch)

	item, state := <-ch
	fmt.Println(item, state) // 1 true
}
```

```go
func main() {
	ch := make(chan int, 3)
	ch <- 1
	ch <- 2
	ch <- 3
	close(ch)
	<-ch
    <-ch
	item, state := <-ch
	fmt.Println(item, state) // 3 true
}
```

```go
func main() {
	ch := make(chan int, 3)
	ch <- 1
	ch <- 2
	ch <- 3
	close(ch)
	<-ch
    <-ch
    <-ch
	item, state := <-ch
	fmt.Println(item, state) // 0 false
}
```

如果都读完了关闭的，再读取，就会读取到对应类型的零值以及获取状态为`false`

```go
func main() {
	ch := make(chan int, 3)
	ch <- 1
	ch <- 2
	ch <- 3
	close(ch)

	for {
		item, state := <-ch
		if state {
			fmt.Println(item)
		} else {
			break
		}
	}
}

```

### 总结

1.  如果`channel`有元素哪怕还未读，会正确读到`channel`里的值，哪怕已经关闭了

2.  写则会`panic`

    ```go
    func main() {
    	ch := make(chan int, 3)
    	ch <- 1
    	ch <- 2
    	ch <- 3
    	close(ch)
    	ch <- 4
    }
    ```

    :::danger

    ```bash
    panic: send on closed channel

    goroutine 1 [running]:
    main.main()
    ```

    :::

    源码位置：`runtime/chan.go`

    ```go
    if c.closed != 0 {
        unlock(&c.lock)
        panic(plainError("send on closed channel"))
    }
    ```
