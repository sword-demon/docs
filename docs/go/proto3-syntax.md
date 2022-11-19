# proto3 语法

> Google 文档地址：[https://developers.google.com/protocol-buffers/docs/proto3](https://developers.google.com/protocol-buffers/docs/proto3)
>
> `protobuf`类似于`json`，是一个序列化的协议，或者说它是一个接口描述语言，主要作用就是在`rpc`框架里把它作为通信的序列化的一个协议。

## 定义一个消息

我们前面定义消息的时候使用的是`message`关键字,文件类型为`.proto`。

```
syntax = "proto3";

message HelloRequest {
	string name = 1;
	int32 page = 2;
	int32 page_size = 3;
}
```

:::danger 注意

-   文件的第一行指定使用`proto3`语法，否则`protocol buffer`编译器将假定你使用`proto2`，这个声明必须是文件的第一个非空注释行。
-   `HelloRequest`消息定义了 3 个字段，每个字段表示希望包含在此类消息中的每一段数据，每个字段都有一个名称和类型；
-   上面的字段类型都是标量类型，也可以是为字段指定组合类型，包括枚举和其他消息类型
-   最后的`1 2 3`是序号并且不重复的，这些字段编号用来在消息二进制格式中标识字段，在消息类型使用后不能再更改。【注意：范围 1 到 15 中的字段编号需要一个字节进行编码，包括字段编号和字段类型；范围 16 到 2047 的字段编号采用 2 个字节。因此，经常使用的消息元素保留数字 1 到 15 的编号，**切记将来可能添加的经常使用的元素留出一些编号**】；

:::

可以访问大佬的博客地址：[https://www.liwenzhou.com/posts/Go/Protobuf3-language-guide-zh/](https://www.liwenzhou.com/posts/Go/Protobuf3-language-guide-zh/)，基本就是谷歌文档的中文翻译版。
