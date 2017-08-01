//箭头函数基本用法
var c = d => d;
//等同于
var c = function(d){
    return d;
}

//如果箭头函数不需要参数或需要多个参数
//则用圆括号表示
var f = () => 5;
//等同于
var f = function(){
    return 5;
}

var sum = (num1,num2) => num1+num2;
//等同于
var sum = function(num1,num2){
    return num1+num2;
}

//如果箭头函数的代码块部分多于一条语句,就可以用大括号括起来
//但是由于大括号被解释为代码块,所以箭头函数会直接返回一个对象
//必须在大括号外加上圆括号
var getTempItem = id => ({
    id : id , name : "Temp"
})
//等同于
var getTempItem = function(id){
    return {
        id : id,
        name : "Temp"
    }
}

//箭头函数可以与变量结构结合使用
var obj = {first,last}
const full = (obj) => first + '' +last;
//等同于
function full(obj){
    return obj.first + '' + obj.last;
}

//箭头函数使得表达式更加简洁
const isEven = n => n%2 ==0;
const square = n => n*n;
//等同于
function isEven(n){
    return n%2==0
}
function square(n){
    return n*n
}
//箭头函数的话,只用两行就定义了两个简单的工具函数
//如果不用箭头函数,就需要占用很多的空间

//箭头函数的一个用处就是简化回调函数
[1,2,3].map(function(x){
    return x*x;
})
//箭头函数写法
[1,2,3].map(x => x*x);

var result = values(function(a,b){
    return a-b;
})
//箭头函数写法
var result = varlues((a,b) => a-b);

//下面是将rest参数与箭头函数结合
const numbers = (...nums) => nums;
//等同于
function numbers(){
    return Array.prototype.slice.call(arguments);
}

const headAndTail = (head,...tail) => [head,tail];
headAndTail(1,2,3,4,5) //[1,[2,3,4,5]]

//毫无疑问 箭头函数简洁清晰 同时避免使用arguments
[1,2,3,4,5].map( function( n ) {
    return !( n > 1 ) ? 1 : arguments.callee( n - 1 ) * n;
} );
//等同于
let c = n => !( n > 1 ) ? 1 : c( n - 1 ) * n;
[1,2,3,4,5].map(c);


