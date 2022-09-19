# Struct 入门和基本写法

> 首先看个简单的代码

```rust
let my_name = "无解";
let my_age = 19;

// 是否有像java和php那样的class实体类来统一描述呢
```

`Ruet`和`go`一样都是`struct`

## 定义和使用

```rust
struct User {
   name: String,
   age: u8,
}

fn main() {
   let me = User{
       name: String::from("无解"),
       age: 19
   };
   println!("{} {}", me.name, me.age);
}
```

:::danger

这里还没有实现`Debug`和`Display`方法，所以不能打印`me`这个实体。

:::

## 定义结构体的方法

```rust
#[derive(Debug)]
struct User {
   name: String,
   age: u8,
}

impl User {
    fn version(&self) {
      println!("1.0");
    }
    fn to_string(&self)->String {
      format!("我的名字是: {}, 我的年龄是: {}", &self.name, &self.age)
    }
}

fn main() {
   let me = User{
       name: String::from("无解"),
       age: 19
   };
   me.version();
   println!("{:#?}", me);
}

```

这里有一个`#[derive(Debug)]`这个是`rust`里的一个注解类似的东西，会自动给你注入一个`Debug`的方法，然后下面就可以打印`me`实体了，这里加上了一个`{:#?}`能够更好看的输出内容

```bash
1.0
User {
    name: "无解",
    age: 19,
}
```
