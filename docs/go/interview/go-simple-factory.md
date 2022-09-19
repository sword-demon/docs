# Go 实现简单工厂模式

> 能将接口与具体实现分离，根据需要实例化

```go
type Member struct{}

func (this *Member) GetRole() string {
    return "XXX会员"
}

type Admin struct{}

func (this *Admin) GetRole() string {
    return "后台管理用户"
}
```

我们还是使用接口和常量配置来实现

```go
type User interface {
	GetRole() string
}

type Member struct{}
func (this *Member) GetRole() string {
	return "XXX会员"
}
type Admin struct{}
func (this *Admin) GetRole() string {
	return "后台管理用户"
}

const (
	Mem = iota
	Adm
)

func CreateUser(t int) User {
	switch t {
	case Mem:
		return new(Member)
	case Adm:
		return new(Admin)
	default:
		return new(Member)
	}
}

func main() {
	fmt.Println(CreateUser(Mem).GetRole())
}
```
