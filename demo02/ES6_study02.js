//class类 Point
class Point{};
//class类 的名字
Point.name; //"Point"

/////////////////////////////////////////////////////////////

//表达式
//将class类Me 赋值给常量 MyClass
const MyClass = class Me{
    //属性方法
    getClassName(){
        //返回Me.name
        return Me.name
    }
}
//创建实例c
let c = new MyClass()
//查看实例c的名字
c.name //undefined
//调用实例c的getClassName方法
c.getClassName() //'Me'
//查看class类Me的方法
Me.name //ReferenceError: Me is not defined


////////////////////////////////////////////////////////////

//利用表达式,实现立刻执行的Class
let peron = new class {
    constructor(name){
        this.name = name;
    }
    sayName(){
        console.log(this.name);
    }
}("yuchengWu");

person.sayName(); //yuchengWu

