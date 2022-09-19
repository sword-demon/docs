# 自定义函数和模块的使用

## 函数

`fn`关键字，后面加上函数名 ，一般是写驼峰式，会发生警告，如果你想写成和`java`一样驼峰式，我们可以在代码最上面写上：

```rust
#[allow(non_snake_case)]
```

代表我允许驼峰。

:::tip 建议

一般来说，是按照它的建议来写。

:::

## 模块

`Module`就是模块，用于将函数或结构体按照功能分组，和别的语言的`package`类似。

使用`mod`关键字加上名称即可定义模块

```rust
mod lib {
    fn show_me() {
        // ...
    }
}
```

![private](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/20220901230302.png)

注意，它这里无法调用，是因为显示它是`private`私有的。

**注意: 它的公有关键字是`pub`**，不是`public`

调用方式，使用两个冒号进行调用方法：`lib::show_me()`

`main.rs`

```rust
mod lib{
    pub fn show_me() {
        let my_name = "wujie";
        let my_age = 18;
        println!("我的名字是: {}, 年龄是: {}", my_name, my_age);
    }
}
fn main() {
    println!("u8最大值: {}, 最小值{}", u8::max_value(), u8::min_value());
    lib::show_me();
}

```

现在是将`mod`放在`main.rs`文件里，如果放在外部该如何访问？

### 调用外部函数：同级调用

在和`main.rs`同级目录创建一个`lib.rs`

```rust
pub fn show_me() {
	let my_name = "wujie";
	let my_age = 18;
	println!("我的名字是: {}, 年龄是: {}", my_name, my_age);
}

```

这里不使用`mod`进行包裹。

然后在`main.rs`

```rust
mod lib;
fn main() {
    println!("u8最大值: {}, 最小值{}", u8::max_value(), u8::min_value());
    lib::show_me();
}

```

`mod lib;`默认执行的时候去同级目录下寻找`lib.rs`文件里的`show_me`函数，模块名和文件名是一样的。

---

如果`lib.rs`的`mod`没去掉，`main.rs`想要访问，也得在前面加上`pub`关键字

```rust
pub mod lib {
	pub fn show_me() {
		let my_name = "wujie";
		let my_age = 18;
		println!("我的名字是: {}, 年龄是: {}", my_name, my_age);
	}
}

```

而`main.rs`调用则必须还得再加一层名为`lib`的模块才能找到函数

```rust
mod lib;
fn main() {
    println!("u8最大值: {}, 最小值{}", u8::max_value(), u8::min_value());
    lib::lib::show_me();
}

```

### 调用外部函数：多文件夹

上面是在同一级目录下的`lib.rs`名称是这个，如果在加一层目录

```
├── Cargo.lock
├── Cargo.toml
├── README.md
├── src
│   ├── lib
│   │   └── mod.rs
│   └── main.rs
```

我们把上面的`lib.rs`删除，新建`lib`目录，下面新建一个**固定名称的`mod.rs`**，如果在`main.rs`加载`lib`目录的内容，会首先加载`mod.rs`，不过前提也得是`pub`的。

`mod.rs`

```rust
pub mod helper {
	pub fn show_me() {
		let my_name = "wujie";
		let my_age = 18;
		println!("我的名字是: {}, 年龄是: {}", my_name, my_age);
	}
}

```

`main.rs`

```rust
mod lib; // lib.rs 或者 lib/mod.rs
fn main() {
    println!("u8最大值: {}, 最小值{}", u8::max_value(), u8::min_value());
    lib::helper::show_me();
}

```

:::tip 注意

`mod lib;`会加载同级的`lib.rs`文件或者加载同级目录`lib`下的`mod.rs`文件，如果有多个文件夹嵌套，也是一样。

:::

我们再在`lib`目录下新建一个`config.rs`，该如何获取它里面的内容

```
├── Cargo.lock
├── Cargo.toml
├── README.md
├── src
│   ├── lib
│   │   ├── config.rs
│   │   └── mod.rs
│   └── main.rs
```

```rust
pub mod config {
	pub fn show_version() {
		println!("version: 1.0")
	}
}

```

:::tip 注意

上面说了会默认先加载`mod.rs`里的内容，所以在`mod.rs`里加上引入`config`的模块

```rust
pub mod config; // config.rs 或者 config/mod.rs
pub mod helper {
	pub fn show_me() {
		let my_name = "wujie";
		let my_age = 18;
		println!("我的名字是: {}, 年龄是: {}", my_name, my_age);
	}
}

```

和`main.rs`加载模块同理，要么获取**同级目录下的同模块名称**的`rs`文件，或者是**同一级的模块名目录下**的`mod.rs`。

:::

`main.rs`调用

```rust
mod lib; // lib.rs 或者 lib/mod.rs
fn main() {
    println!("u8最大值: {}, 最小值{}", u8::max_value(), u8::min_value());
    lib::helper::show_me();

    lib::config::config::show_version();
}

```

这里写了 2 个`config`的原因是`config.rs`里又套了一层`mod`，我们可以去掉

```rust
pub fn show_version() {
    println!("version: 1.0")
}
```

`main.rs`

```rust
mod lib; // lib.rs 或者 lib/mod.rs
fn main() {
    println!("u8最大值: {}, 最小值{}", u8::max_value(), u8::min_value());
    lib::helper::show_me();

    lib::config::show_version();
}

```
