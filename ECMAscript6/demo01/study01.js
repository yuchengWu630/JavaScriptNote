//建立一个构造函数
function Point(x,y){
    //将参数x赋值到this.x中
    this.x = x;
    //将参数y赋值到this.y中
    this.y = y;
}
//把构造函数Point原型上的toString属性,赋值为function
Point.prototype.toString = function () {
    //返回this.x + this.y的一个字符串
    return'('+ this.x + ' and ' + this.y +')';
}
//创建一个实例赋值给变量c
var c = new Point('you','me');

c.toString() //"(you and me)" 

