# Class的基本语法

 参考 <<ES6 标准入门>> -- 阮一峰 著

<br>

>JavaScript语言的传统方法生成新对象
>
>对比
>
>ES6运用Class类生成新对象

<br>

****
两个demo练习,很好的诠释了,ES6 Class类的概念,它让写法更加清晰,更像面向对象的语法,所以可以看做是一个语法糖.
当然你如果习惯了ES5的写法也没有关系.
****

<br>

在类的实例上调用方法,其实就是调用原型的方法.
```
class C{}

let a =new C();

let b = new C();

a.constructor === C.prototype.constructor;//true

a.constructor === b.constructor;//true
```


