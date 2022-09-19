# 表达式和语句以及 if 的风骚写法

## 表达式

> Rust 是一个以表达式为主的语言。

比如：`let a = 1;`这就是一个语句，

如果：`if a == 1 {}` 这里面的`a == 1`就是一个表达式，表达式可以包括定义某值，或判断某物，最终会有一个“值”的体现。

```rust
let a = 1; // 语句
if a == 1 {
    let b = 5;
    println!("{}", b);
}
```

我们可以使用表达式的风骚写法替换

```rust
let a = 1; // 语句
let b = if a == 1 {5}else {10};
println!("{}", b);
```

实现自增效果，正常写法：

```rust
fn add (i:i32)->i32 {
    return i+1; // return 之后要加分号
}
```

如果使用表达式来简写

```rust
fn add (i:i32)->i32 {
    i+1 // 使用表达式 可以不加分号
}
```

然后优化一下前面的一个函数

```rust
fn get_user(uid:i32)->&'static str {
    if uid == 1 {
        "wujie"
    } else if uid == 2 {
        "张三"
    } else {
        "unknown"
    }
}
```

把`return`和分号都去掉即可。

或者

```rust
fn get_user(uid:i32)->&'static str {
    let ret = if uid == 1 {
        "wujie"
    } else if uid == 2 {
        "张三"
    } else {
        "unknown"
    };
    // 前面写内容是可以的，但是再写一个表达式也是不可以的
    ret
    // 注意这个表达式后面不能写内容
}
```
