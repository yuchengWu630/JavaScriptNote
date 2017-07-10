# Class 表达式

>与函数一样,Class也能用表达式定义

```
const MyClass = class Me{
    getClassName(){
        return Me.name
    }
}
```
上面代码用表达式定义了一个类,需要注意的是,这个类名字是myClass而不是Me.
Me只在Class的内部代码可用,指代当前类.
```
let c = new MyClass()

c.name //undefined

c.getClassName() //'Me'

Me.name //ReferenceError: Me is not defined
```
