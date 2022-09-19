# 字符串练习

## 循环字符、判断长度、match

> 注意，`rust`是没有`switch`这个关键字的，我们可以使用`match`来替代。

### 练习：filter 函数，接收一个字符串参数

> 遍历里面每个字符

```rust
fn filter(html:&str) {
    for c in html.chars() {
        println!("{}", c)
    }
    // 输出字符串的长度 如果有中文，每个中文占3个长度
    println!("{}", html.len())
}
```

**变量名尽量不要和关键字冲突**

### 判断当前字符串的长度：使用 match

> 我们约定在 4-10 之间

```rust
fn filter(html:&str) {
    // 范围表达式
    match html.len() {
        4..=10 => println!("{}", "ok"),
        0..=3 => println!("{}", "太短了"),
        _ => println!("{}", "不ok"),
    }
}
```

我们这里使用`4..=10`表示 4 到 10 之间，`_`下划线代表默认范围

### 循环练习

```rust
fn filter() {
   for i in 1..=10  {
       println!("{}", i);
   }
}
```

> `1..=10`代表左闭右闭，打印 1-10 的数，即`[1, 10]`
>
> 如果修改成`1..10`，则代表左闭右开：`[1, 10)`

## String 的基本堆栈结构

`str`存在于栈中，性能高。通常以`&str`的方式引用。有点类似`C++`中的`char*`

> `String`分配在堆中，属于`RUST`标准库提供的功能。可增长、可变、有所有权、UTF-8 编码的字符串类型。

```rust
// mod lib; // lib.rs 或者 lib/mod.rs

fn main() {
    // 两个字面量
   let first_name = String::from("无");
   let last_name = String::from("解");

   // 初始化的时候进行价值不需要加上 mut 后面进行修改的时候必须加上mut
    // 重写的原理也是调用 push_str 所以里面要转换成 &str 类型
   let name = first_name + &last_name; // &str &String => &str 自动转化
   println!("{}", name);
}

```

字符串相加必须转换为：`&str`类型。

`String::new()`创建一个空字符串

`String::from()`可以从`&str`类型去创建字符串

```rust
let name = "无解"; // 字面量 &str

let mut name1 = String::new(); // 空字符串
// 改变其值
name1.push_str("无解"); // 需要push &str 类型的进入，此时会报一个无法修改的变量，需要给变量加上 mut 此时变量就可以改了。
println!("{}", name1);
```

使用`String:from`初始化的方式

```rust
let name = String::from("无解"); // 参数为 &str 类型的
```

## 使用 format 宏来初始化

```rust
let name = format!("{}{}", first_name, last_name); // 拼接2个字符串
```

## 堆基本结构

代码：`let name = String::from("abc");`在内存角度发生了什么？

栈：

| Name     | value |
| -------- | ----- |
| Ptr 指针 |       |
| len      | 3     |
| capacity | 3     |

堆：

| index | value |
| ----- | ----- |
| 0     | a     |
| 1     | b     |
| 2     | c     |

> 堆放内容，栈放地址。堆内存由垃圾处理器管理。

```rust
let name = String::from("abc");
println!("长度: {}, 容量: {}", name.len(), name.capacity());
```

如果在来一个变量赋值一个`name`

```rust
let name = String::from("abc");
let name2 = name;
println!("长度: {}, 容量: {}", name2.len(), name2.capacity());
```

> 则会新增一个栈保存`name2`，同样指向堆中的存储内容。

打印地址

```rust
let name = String::from("abc");
println!("{:p}", name.as_ptr());
```

> `{}`针对基本类型如：`int`、`&str`等，都可以直接打印，他们都有对应的`Display`方法。如果对象或后面的自定义的`struct`时，则打印不了。

同样的语言里：PHP 不能使用`echo 去打印一个对象`，如果要输出，则要实现`__toString()`方法。

`Rust`里面主要是`Display`和`Debug`方法要实现。

```rust
fn main() {
   let name = String::from("abc");
   println!("{:?}", name.as_ptr()); // ? 会调用 Debug
   let name2 = name;
   println!("{:p}", name2.as_ptr());
   println!("长度: {}, 容量: {}", name2.len(), name2.capacity());
}
```

```bash
0x137e06b90
0x137e06b90
长度: 3, 容量: 3
```

`as_ptr()`:指向了第一个字节的地址，如果占位符里写了`{:?}`或者`{?p}`，后面打印的内容必须是指针类型。

### Rust 常见的符号

`unspecified`：`Display`即`{}`，默认就是调用`Display`

`?`：`Debug`

`o`：`Octal`八进制

`x`：`LowerHex`十六进制

`X`：`UpperHex`

`p`：`Pointer`

`b`：`Binary` 二进制

## 所有者、字符串拷贝

```rust
let name = String::from("abc");
println!("{:p}", name.as_ptr());
```

:::tip 提示

`name`就是这个字符串`"abc"`的所有者，而且**有且只有一个所有者。不能脚踏两条船。当所有者离开作用域，这个值将被抛弃。**

:::

```rust
fn main() {
   let name = String::from("abc");
   println!("{:p}", name.as_ptr());
   let you = String::from("abc");
   println!("{:p}", you.as_ptr());
}
```

"案例：同名同姓的变量"，完全是可以的，第一个字符指针对应的地址，这里是不一样的

```bash
0x149606b90
0x149606ba0
```

"脚踏两条船"

```rust
fn main() {
   let name = String::from("abc");
   let you = name;
   println!("{:p}", name.as_ptr());
   println!("{:p}", you.as_ptr());
}
```

此时`name`叫”abc“，此时把`name`的值给了`you`，我就没有了，就不能调用`as_ptr()`，这个就不能打印了，`name`这个变量就已经作废了。这也是所有者有且只有一个。

:::details 解决办法

1.  第一种就是上面的定义变量值都是一样的即可，即”同名同姓“的含义。
2.  第二种可以使用`name.clone()`方法

```rust
fn main() {
   let name = String::from("abc");
   let you = name.clone();
   println!("{:p}", name.as_ptr());
   println!("{:p}", you.as_ptr());
}

```

就好比是复制了一块内存。

3.  第三种：添加`&`符号

```rust
fn main() {
   let name = String::from("abc");
   let you = &name;
   println!("{:p}", name.as_ptr());
   println!("{:p}", you.as_ptr());
}

```

这 2 个地址是一样的，这个代码没有发生所有者的改变，只是引用。

:::

:::tip 提示

如果是`&str`类型，就不会发生所有者转换的问题。

:::

## 函数传参所有者转移、修改原字符串

### 所有者转移

```rust
fn show_len(s: String) {
   println!("{}", s.len());
} // show_len 函数执行完 s 才废掉

fn main() {
   let name = String::from("abc");
   show_len(name);
   println!("{}", name);
}
```

这里会出现报错：”^^^^ value borrowed here after move“

这里就好比是，把`name`的所有者交给了函数`show_len`的`s`，此时`name`的值在内存里就释放掉了。

就上面的解决办法来说，我们可以加一个引用

```rust
fn show_len(s: &String) { // s 就没有获取所有权
   println!("{}", s.len());
}

fn main() {
   let name = String::from("abc");
   show_len(&name); // 传入的是对 name 的引用
   println!("{}", name);
}// 函数结束 name 才废掉
```

### 修改原字符串

修改值，我们可以使用到上面说的`push_str`函数，但是这个是不可变的，所以我们需要加上`mut`

```rust
fn change(s: &mut String) {
   s.push_str("_19");
}

fn main() {
   let mut name = String::from("abc");
   change(&mut name);
   println!("{}", name);
}

// 打印内容 abc_19
```
