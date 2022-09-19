# 抽象工厂模式

> 如果后面有新增一个用户类型，我们一般不会去改原先的内容，而是在原先的基础上进行扩展。

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

type AbstractFactory interface {
	CreateUser() User
}

type MemberFactory struct {}
func (m *MemberFactory) CreateUser() User {
	return &Member{}
}

type AdminFactory struct {}
func (m *AdminFactory) CreateUser() User {
	return &Admin{}
}

func main() {
	var fact AbstractFactory = new(MemberFactory)
	fmt.Println(fact.CreateUser().GetRole())
}
```

> 后面新增一个类别，我们只要增加一个工厂，实现对应的方法即可。
