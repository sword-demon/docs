# Gin 通用错误响应结果内容封装

```go
package result

import "fmt"

type ErrorResult struct {
	data interface{}
	err  error
}

func (e ErrorResult) Unwrap() interface{} {
	if e.err != nil {
		panic(e.err.Error())
	}
	return e.data
}

func Result(vs ...interface{}) *ErrorResult {
	if len(vs) == 1 {
		if vs[0] == nil {
			return &ErrorResult{nil, nil}
		}
		// 断言是否是error
		if e, ok := vs[0].(error); ok {
			return &ErrorResult{nil, e}
		}
	}
	if len(vs) == 2 {
		if vs[1] == nil {
			return &ErrorResult{vs[0], nil}
		}
		// 断言是否是error
		if e, ok := vs[1].(error); ok {
			return &ErrorResult{vs[0], e}
		}
	}
	return &ErrorResult{nil, fmt.Errorf("error result format")}
}

```
