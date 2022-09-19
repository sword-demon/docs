# 简述 Go channel 的底层机制

源码：`runtime/chan.go`

```go
type hchan struct {
	qcount   uint           // total data in the queue
	dataqsiz uint           // size of the circular queue
	buf      unsafe.Pointer // points to an array of dataqsiz elements
	elemsize uint16
	closed   uint32
	elemtype *_type // element type
	sendx    uint   // send index
	recvx    uint   // receive index
	recvq    waitq  // list of recv waiters
	sendq    waitq  // list of send waiters

	// lock protects all fields in hchan, as well as several
	// fields in sudogs blocked on this channel.
	//
	// Do not change another G's status while holding this lock
	// (in particular, do not ready a G), as this can deadlock
	// with stack shrinking.
	lock mutex
}
```

重点关注：

1.  `buf`指向一个循环队列
2.  `sendx`和`recvx`用于记录`buf`发送和接收的`index`
3.  `lock`互斥锁
4.  `sendq`和`recvq`等待(阻塞)列表
5.  `qcount`：队列剩余数
6.  `dataqsize`: 缓冲区大小

```go
ch := make(chan int, 3) //3 就是buf 然后会创建一个循环队列
ch <- 3 // 给ch发值 这里可以理解为 send
<- ch // 读 可以认为是 recv 的过程

// 塞获取读取数据都需要加锁
```

1.  它会在堆(`heap`)里创建，`ch`本身是一个指针，指向堆中的`hchan`
2.  缓冲区设置为 3，创建一个循环队列，此时`sendx=0 recvx=0`
3.  插入或者获取值，执行前都需要加锁，插入一个值时，`sendx`加 1，知道塞满，`recvx`也是一样。
4.  一旦缓冲区满了，此时`G`阻塞，核心(`P`)会调度将阻塞的移开，换别的不阻塞的`G`来给`M`（真正执行的线程）去执行；此时的阻塞的`G`会变成一个`sudog`结构，里面会有一个指针`g`指向它，`elem`就是阻塞后要发送的数据，此时如何唤醒这个阻塞的 G 呢，就需要另外一个`goroutine`来读取，然后继续把`G`放入本地队列进行排队。

```go
type sudog struct {
	// The following fields are protected by the hchan.lock of the
	// channel this sudog is blocking on. shrinkstack depends on
	// this for sudogs involved in channel ops.

	g *g

	next *sudog
	prev *sudog
	elem unsafe.Pointer // data element (may point to stack)

	// The following fields are never accessed concurrently.
	// For channels, waitlink is only accessed by g.
	// For semaphores, all fields (including the ones above)
	// are only accessed when holding a semaRoot lock.

	acquiretime int64
	releasetime int64
	ticket      uint32

	// isSelect indicates g is participating in a select, so
	// g.selectDone must be CAS'd to win the wake-up race.
	isSelect bool

	// success indicates whether communication over channel c
	// succeeded. It is true if the goroutine was awoken because a
	// value was delivered over channel c, and false if awoken
	// because c was closed.
	success bool

	parent   *sudog // semaRoot binary tree
	waitlink *sudog // g.waiting list or semaRoot
	waittail *sudog // semaRoot
	c        *hchan // channel
}
```

**总结回答点**

1.  `chan`创建在堆中，返回指针
2.  使用环形队列作为缓冲区
3.  每次操作都要加锁，并更新操作(`sendx`和`recvx`的`index`索引)
4.  缓冲满，进入等待队列，并让出`M`，等待被唤醒
5.  被唤醒（读取操作`<-ch`）后，重新加入`G`队列
