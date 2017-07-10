//ES6构造函数的语法糖
class Point{
    //构造函数-通过new生成实例时会自动调用
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    //给类Point定义属性(原型对象属性)toString
    toString(){
        //返回this.x + this.y的一个字符串
        return'('+ this.x + ' and ' + this.y +')';
    }
}
//创建一个实例赋值给变量c
var c = new Point('you','me');

c.toString(); //"(you and me)" 