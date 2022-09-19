# 模型的构造函数封装

## 模型的"构造函数"封装

模型实例内容

```go
package UserModel

type UserEntityImpl struct {
	UserId   int    `json:"user_id" form:"id"`
	UserName string `json:"user_name" form:"name" binding:"required,UserName"`
}

func New(attrs ...UserEntityAttrFunc) *UserEntityImpl {
	u := &UserEntityImpl{}
	UserEntityAttrFunctions(attrs).Apply(u)
	return u
}

func (receiver *UserEntityImpl) Mutate(attrs ...UserEntityAttrFunc) *UserEntityImpl {
	UserEntityAttrFunctions(attrs).Apply(receiver)
	return receiver
}

```

模型额外属性封装

```go
package UserModel

type UserEntityAttrFunc func(*UserEntityImpl)
type UserEntityAttrFunctions []UserEntityAttrFunc

func (functions UserEntityAttrFunctions) Apply(u *UserEntityImpl) {
	for _, f := range functions {
		f(u)
	}
}

func WithUserId(id int) UserEntityAttrFunc {
	return func(u *UserEntityImpl) {
		u.UserId = id
	}
}

func WithUserName(name string) UserEntityAttrFunc {
	return func(u *UserEntityImpl) {
		u.UserName = name
	}
}

```

## 使用实例

```go
r := gin.New()
r.GET("/", func(c *gin.Context) {
		user := UserModel.New().
			Mutate(UserModel.WithUserId(3),
				UserModel.WithUserName("wujie"))
		c.JSON(200, user)
	})
r.Run(":8081")
```
