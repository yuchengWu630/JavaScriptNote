//使用箭头有几个使用的注意点
//1,函数体内的this对像就是定义时所在的对象,而不是使用时所在的对象
//2,不可以当作构造函数.也就是说不能使用new命令
//3,不可以使用arguments对象,因为在函数体内不存在.但是可以使用rest参数
//4,不可以使用yield命令,因此箭头函数不能用作Generator函数.

function foo(){
    setTimeout(() => {
        console.log('id:',this.id)
    }, 100);
}
foo.call({id : 42});// id :42
//如果不用箭头函数的话,在正常函数定时器内,this永远指向windows.
//但是在箭头函数中,this是固定的,this总是指向函数所在的对象

var handler = {
    id : '123456',
    init : function(){
        document.addEventListener('click',
    event => this.doSomething(event,type),false);
    },
    //如果这样写的话,执行回调函数的时候会报错,因为this指向了全局
    // init:function(){
    //     document.addEventListener('click',
    //     function(event){
    //         this.doSomething(event,type),false
    //     })
    // },
    doSomething : function(type){
        console.log('Handling' + type + 'for' + this.id);
    }
};


function Timer(){
    this.seconds = 0
    setInterval(() => this.seconds++ , 1000)
}
var timer = new Timer()
setTimeout(() => console.log(timer.seconds),3100)
//3
//Timer函数内部的setInterval调用了this.seconds属性.
//通过箭头函数让this总是指向Timer的实例对象timer.
//否则,输出结果是0,而不是3
//this指向的固定化的本质是因为箭头函数内部没有自己的this.
//所以this就是外部代码块的this
//内部没有this也是导致不能作为构造函数的主要原因之一

//下面的函数中有几个this?
function foo(){
    return () => {
        return () =>{
            return () =>{
                console.log('id:',this,id);
            }
        }
    }
}
foo.call({id : 42})()()(); //id:42
//就一个this

//除了this,还有3个变量在箭头函数中也是不存在的
//arguments,super,new.target
function foo(){
    setTimeout(() => {
        console.log("args:",arguments);
    },100);
}
foo(2,4,6,8);//args:[2,4,6,8]
//上面代码中,箭头函数内部的arguments,就是外层函数foo的arguments变量.

//依然是箭头函数没有this 所以call(),apply(),bind()也不能用.
(function(){
    return[
        (() => this.x).bind({x : 'inner'})()
    ]
}).call({x :'outer'});
//['outer']
//bind方法无效,内部的this指向外部的this,外部的this被call指定.

//嵌套的箭头函数
function insert(value){
    return {into:function(array){
        return{after:function(afterValue){
            array.splice(array.indexOf(afterValue)+1,0,value);
        }};
    }};
}
insert(2).into([1,3]).after(1);//[1,3].splice([1,3].indexOf(1)+1,0,2)
//[1,2,3]

//等同于
let insert = (value) => ({into:(array) => ({after:(afterValue) =>{
    array.splice(array.indexOf(afterValue)+1,0,value);
    return array;
}})})
insert(2).into([1,3]).after(1);
//[1,2,3]

const pipeline = (...funcs) =>
    val => funcs.reduce((a,b) => b(a), val);  
const plus1 = a => a+1;
const mult2 = a => a*2;
const addThenMult = pipeline(plus1,mult2);

addThenMult(5);//12

//上面的写法可读性比较差
//可以写成这样
const plus1 = a => a + 1;
const mult2 = a => a * 2;
mult2(plus1(5));//12