# 反射

## 通过反射简单获取结构体的字段和字段类型

```go
type User struct {
	UserId int
	UserName string
}

func main() {
	u := User{}

	t := reflect.TypeOf(u)
	fmt.Println(t.Name())
	fmt.Println(t.NumField())

	for i := 0; i < t.NumField(); i++ {
		fmt.Println(t.Field(i).Name, t.Field(i).Type)
	}
}

```

```bash
User
2
UserId int
UserName string
```

## Elem 函数

> 用来获取指针指向的变量

但是前提是：传入的参数必须是指针才行

```go

type User struct {
	UserId int
	UserName string
}

func main() {
	u := &User{}

	t := reflect.TypeOf(u)
	t = t.Elem() // 把t变成了指针指向的变量
	fmt.Println(t.Name())
	fmt.Println(t.NumField())

	for i := 0; i < t.NumField(); i++ {
		fmt.Println(t.Field(i).Name, t.Field(i).Type)
	}
}
```

## Kind 函数

> 可以获取类型

```go
type User struct {
	UserId int
	UserName string
}

func main() {
	u := &User{}

	t := reflect.TypeOf(u)
	// 判断类型
	if t.Kind() == reflect.Ptr {
		t = t.Elem() // 把t变成了指针指向的变量
	}
	fmt.Println(t.Name())
	fmt.Println(t.NumField())

	for i := 0; i < t.NumField(); i++ {
		fmt.Println(t.Field(i).Name, t.Field(i).Type)
	}
}
```

## 反射取值

```go
func main() {
	u := &User{1, "wujie"}

	t := reflect.ValueOf(u)
	// 判断类型
	if t.Kind() == reflect.Ptr {
		t = t.Elem() // 把t变成了指针指向的变量
	}
	for i := 0; i < t.NumField(); i++ {
		if t.Field(i).Kind() == reflect.Int {
			fmt.Println(t.Field(i).Int())
		}
		if t.Field(i).Kind() == reflect.String {
			fmt.Println(t.Field(i).String())
		}
	}
}
```

如果一个一个都要这么去判断就很费劲，我们可以使用`interface{}`替换

```go
func main() {
	u := &User{1, "wujie"}

	t := reflect.ValueOf(u)
	// 判断类型
	if t.Kind() == reflect.Ptr {
		t = t.Elem() // 把t变成了指针指向的变量
	}
	for i := 0; i < t.NumField(); i++ {
		fmt.Println(t.Field(i).Interface())
	}
}
```

## 利用反射设置 Struct 属性值、切片映射 Struct

```go
func main() {
	u := &User{}

	t := reflect.ValueOf(u)
	// 判断类型
	if t.Kind() == reflect.Ptr {
		t = t.Elem() // 把t变成了指针指向的变量
	}
	for i := 0; i < t.NumField(); i++ {
		//fmt.Println(t.Field(i).Interface())
		if t.Field(i).Kind() == reflect.Int {
			t.Field(i).SetInt(101)
		}
		if t.Field(i).Kind() == reflect.String {
			t.Field(i).SetString("李四")
		}
	}

	fmt.Println(u)
}
```

或者

```go
for i := 0; i < t.NumField(); i++ {
		//fmt.Println(t.Field(i).Interface())
		if t.Field(i).Kind() == reflect.Int {
			t.Field(i).Set(reflect.ValueOf(13))
		}
		if t.Field(i).Kind() == reflect.String {
			t.Field(i).Set(reflect.ValueOf("李四"))
		}
	}
```

切片映射

```go

func main() {
	u := &User{}

	t := reflect.ValueOf(u)
	// 判断类型
	if t.Kind() == reflect.Ptr {
		t = t.Elem() // 把t变成了指针指向的变量
	}
	values := []interface{}{12, "wujie"}
	for i := 0; i < t.NumField(); i++ {
		if t.Field(i).Kind() == reflect.ValueOf(values[i]).Kind() {
			t.Field(i).Set(reflect.ValueOf(values[i]))
		}
	}

	fmt.Println(u)
	fmt.Println(values)
}
```

## Map 映射

```go
type User struct {
	UserId int
	UserName string
}

func Map2Struct(m map[string]interface{}, u interface{})  {
	v := reflect.ValueOf(u)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
		// 判断是否是结构体
		if v.Kind() != reflect.Struct {
			panic("must struct")
		}
		findFromMap := func(key string) interface{} {
			for k, v := range m {
				if k == key {
					return v
				}
			}
			return nil
		}
		for i := 0; i < v.NumField(); i++ {
			get_value := findFromMap(v.Type().Field(i).Name)
			// 类型相等且不等于nil
			if get_value != nil && reflect.ValueOf(get_value).Kind() == v.Field(i).Kind() {
				v.Field(i).Set(reflect.ValueOf(get_value))
			}
		}
	} else {
		panic("must ptr")
	}
}

func main() {
	u := &User{}
	m :=  map[string]interface{}{
		"id": 123,
		"UserId": 101,
		"UserName": "wujie",
		"age": 19,
	}

	Map2Struct(m, u)

	fmt.Println(u)
}

```

## map 映射成 Struct 支持 tag 参数

> 我们约定只要属性和`tag`中任何一个匹配`name`，则取它为准，否则取属性名

```go
type User struct {
	UserId   int `name:"uid" bcd:"456"`
	UserName string
}

func Map2Struct(m map[string]interface{}, u interface{}) {
	v := reflect.ValueOf(u)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
		// 判断是否是结构体
		if v.Kind() != reflect.Struct {
			panic("must struct")
		}
		findFromMap := func(key string, nameTag string) interface{} {
			for k, v := range m {
				if k == key || k == nameTag {
					return v
				}
			}
			return nil
		}
		for i := 0; i < v.NumField(); i++ {
			get_value := findFromMap(v.Type().Field(i).Name, v.Type().Field(i).Tag.Get("name"))
			// 类型相等且不等于nil
			if get_value != nil && reflect.ValueOf(get_value).Kind() == v.Field(i).Kind() {
				v.Field(i).Set(reflect.ValueOf(get_value))
			}
		}
	} else {
		panic("must ptr")
	}
}

func main() {
	u := &User{}
	m := map[string]interface{}{
		"id":       123,
		"uid":      101,
		"UserName": "wujie",
		"age":      19,
	}

	Map2Struct(m, u)

	fmt.Println(u)
}
```
