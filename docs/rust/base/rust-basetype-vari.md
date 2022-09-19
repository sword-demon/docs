# 基本类型、变量和函数类型、创建数字变量的基本方式

## 常见的基本类型(标量类型)

-   有符号整型(`signed integers`)：`i8`、`i16`、`i32`、`i64`和`isize(指针大小)`
-   无符号整型(`unsigned integers`)：`u8`、`u16`、`u32`、`u64`和`usize`（指针大小）
-   浮点类型(`floating point`)：`f32`、`f64`
-   `char`字符：单个`Unicode`字符，如：`'a'`
-   `bool`布尔型：true、false
-   单元类型(`unit type`)：`()`，有且仅有一个值，写成小写括号`()`

## 复合类型

-   数组：如 `[1,2,3]`
-   元组：如 `(1, true)`

## 创建数字变量

```rust
fn main() {
    let my_age:u8 = 19;
    println!("我的年龄是: {}", my_age);
}

```

上面是指示了类型，我们也可以不写，但是要注意对应的类型的数字范围。

```rust
fn main() {
    let my_age:u8 = 2;
    let your_age = my_age  +2;
    println!("我的年龄是: {}", my_age);
    println!("你的年龄是: {}", your_age);
    println!("u8最大值: {}, 最小值{}", u8::max_value(), u8::min_value());
}

```

```bash
➜  mypro git:(master) ✗ cargo build && cargo run
   Compiling mypro v0.1.0 (/Users/wangxin/workspace/rustworkspace/mypro)
    Finished dev [unoptimized + debuginfo] target(s) in 0.24s
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/mypro`
我的年龄是: 2
你的年龄是: 4
u8最大值: 255, 最小值0
```
