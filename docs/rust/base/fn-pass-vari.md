# 函数参数传递

## 数字参数

> 简单需求：
>
> 输入 ID，打印出用户名
>
> 1.  wujie -> 1
> 2.  张三 -> 2
> 3.  其他一律是 `unknown`

传参方式和`go`类似

```rust
fn 函数名(参数:参数类型) {}
```

**注意，这里会使用冒号进行表示`参数:参数类型`，冒号不可缺少，`go`语言是没有冒号的！**

`main.rs`

```rust
fn get_user(uid:i32) {
    if uid == 1 {
        println!("user is {}", "wujie")
    } else if uid == 2 {
        println!("user is {}", "张三")
    } else {
        println!("user is {}", "unknown")
    }
}

fn main() {
    get_user(3);
}

```

## 函数返回值&字符串

> Rust 里主要是使用`&str`和`String`来表示字符串。

比如：直接定义变量

```rust
let name = "wujie"; // 其实这里的默认类型为 &str

// 完整定义
let name:&'static str = "无解"; // 带生命周期的完整写法
```

![&str](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/20220904112630.png)

看到`&`就知道，它是一个引用

1.  在内存中写入`wujie`
2.  创建一个引用赋给`name`这个变量

我们不能直接操作`str`，需要加上一个`&`来操作它的“引用”，`&str`好比是有一个固定长度的字符序列（数组）。

---

给上面的函数添加字符串的返回值

```rust
fn get_user(uid:i32)->&'static str {
    if uid == 1 {
        return "wujie";
    } else if uid == 2 {
        return "张三";
    } else {
        return "unknown";
    }
}

fn main() {
    println!("user is {}", get_user(3));
}

```

它这里的返回值写法和`go`类似，但是它要加上一个`->`然后加上它原始的类型`&'static str`

<style>
blockquote:before {
	background-color: #f66;
    border-radius: 100%;
    color: #fff;
    content: '☆';
    font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    font-weight: bold;
    left: -12px;
    line-height: 20px;
    position: absolute;
    height: 20px;
    width: 20px;
    text-align: center;
    top: 14px;
}
blockquote {
	border-bottom-right-radius: 2px;
	border-left: 4px solid #f66 !important;
	border-top-right-radius: 2px;
	margin: 2em 0 !important;
	padding: 12px 24px 12px 30px;
	position: relative;
}
</style>
