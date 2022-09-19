# 框架中的路由：前缀树

## 路由

框架里现在基本都会有一个配置访问路径的功能：

譬如：`/user/index`，对应`UserController`里的`index`方法

简单做法：使用`hashmap`，如：

```go
map[string]interface{}{
    "/user/index": UserController.index()
}
```

但是如果变成：`/user/:id`这种带参数的，使用`hashmap`就不怎么好了，所以现在就有一个概念：前缀树【字典树】的使用。

:::tip 百度百科

一种哈希树的变更。典型应用时用于统计，排序和保存大量的字符串(但不仅限于字符串)，所以经常被搜索引擎系统用于文本词频统计。它的优点是：利用字符串的**公共前缀**来**减少查询时间**，最大限度地减少无谓的字符串的比较，查询效率比哈希树高。

:::

![demo](https://virusoss.oss-cn-shanghai.aliyuncs.com/images/20220828112900.png)

> 这里`php`和`python`就都有相同的`p`前缀

查询就很方便：比如查询一个`gin`，我们只要查询经过每一个字符的这个子节点，如果`n`是最后一个子节点就可以找到这个字符串；如果查找一个`gis`，我们只能查找到`i`，但是找不到`s`，如果`i`也不是最后一个子节点，那么我们就可以认为`gis`这个字符串找不到。

### 特征

1.  根节点不包含字符
2.  每个节点的所有子节点包含的字符都不相同
3.  一个节点的所有子节点都有相同的前缀

## 代码实现

```go
type Node struct {
	isend bool // 是否最后一个
	Children map[string]*Node // 用map就省的遍历了 查找子节点
}

func NewNode() *Node {
	return &Node{Children: make(map[string]*Node)}
}

type Trie struct {
	root *Node // 根节点
}

func NewTrie(root *Node) *Trie {
	return &Trie{root: NewNode()}
}
```

### 插入节点

> 这里会涉及一个字符串的遍历，需要注意的是，字符串遍历打印的是对应字符的 ASCII 值，我们需要加上`string`包裹一下，或者我们使用`([]rune)(str)`也可以

```go
func (t Trie) Insert(str string) {
	current := t.root
	for _, item := range ([]rune)(str) {
		// 判断它的子节点 是否有值
		if _, ok := current.Children[string(item)]; !ok {
			// 没有值就设置一个值
			current.Children[string(item)] = NewNode()
		}
		// 如果找到了设置为自己的 children
		current = current.Children[string(item)]
	}
	// 直至遍历到最后一个，设置最后一个节点的 为true
	current.isend = true
}
```

### 查询字符串

```go
func (t Trie) Search(str string) bool {
	current := t.root
	for _, item := range ([]rune)(str) {
		// 判断它的子节点 是否有值
		if _, ok := current.Children[string(item)]; !ok {
			// 没有找到直接返回false
			return false
		}
		// 如果找到了设置为自己的 children
		current = current.Children[string(item)]
	}
	// 如果前面都找到了 返回它是否是最后一个 否则没有匹配到
	return current.isend
}
```

### 测试

```go
func test30() {
	strs := []string{"go", "gin", "golang", "goapp", "guest"}
	tree := NewTrie()
	for _, s := range strs {
		tree.Insert(s)
	}

	strs = append(strs, "abc", "gogo")
	for _, s := range strs {
		fmt.Println(tree.Search(s))
	}
}

func main() {
	test30()
}
```

```bash
true
true
true
true
true
false
false

```
