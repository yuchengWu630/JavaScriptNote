//构造函数Az
function Az(name){
    //将实例的属性赋值为name参数
    this.name = name;
}
//创建c对象.d对象
let c = {};
let d = {};

//分别替换c和d的this,并传递参数.
Az.apply(c,["c-yuchengWu"]); 
Az.call(d,"d-yuchengWu"); 

//分别打印c和d的name属性
console.log(c.name);  //c-yuchengWu
console.log(d.name);  //d-yuchengWu
