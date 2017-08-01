//Generator函数是一个状态机,封装了多个内部状态.
//Generator函数也是一个遍历器对象生成函数.返回遍历器对象.可以依次遍历Generator函数内部的每一个状态

function* helloGenerator(){
    //yield - 产出
    yield 'Hello';
    yield 'World';
    return 'ending';
}
var hw = helloGenerator();

//上面的代码定义了一个Generator函数,内部有两个yield语句.
//该函数有3个状态,hello,world和return语句.
//不同于其他函数,调用Generator函数后,该函数并不执行,返回的也不是函数运行结果,而是指向内部状态的指针对象(遍历器对象Iterator Object)

hw.next() // Object{value : 'Hello' , done : false}
//value表示当前yield语句的值,done属性的值为false表示遍历还没有结束.
hw.next() // Object{value : 'World' , done : false}
hw.next() // Object{value : 'ending' , done : true}
hw.next() // Object{value : undefined , done : true}

//我们必须要调用遍历器的next方法,使得指针移向下一个状态.
//每次调用next方法,内部指针就从函数头部或上一次停下来的地方开始执行,直到遇到下一条yield语句或者return语句为止.
//Generator函数是分段执行的,yield语句是暂停执行的标记,next方法可以恢复执行.

//等于javaScript提供了手动的'惰性求值(Lazy Evaluation)'的语法功能
//yield和return的区别在于,return不具备位置记忆功能,而且一个函数中只能执行一次return.相反的yield就具备位置记忆且可以执行多次,使得Generator生成了一系列的值,也就是其名称来历(Generator生成器)

function* f(){
    console.log('执行了!')
}
var genertor = f();

setTimeout(function(){
    genertor.next()
},2000);
//Generator函数f,需要执行next()方法时才会执行,也就是说需要定时器读完两秒,然后执行next()方法,才能在控制台打印'执行了!'.


var arr = [1,[[2,3],4],[5,6]];

var flat = function* (a){
    var length = a.length;
    for(var i = 0;i<length;i++){
        var item = a[i];
        if(typeof item !=='number'){
            yield* flat(item);
        }
        else{
            yield item;
        }
    }
}
for(var f of flat(arr)){
    console.log(f);
}
//1,2,3,4,5,6
//注意,不能再普通函数中使用yield语句,否则会报错



//next()方法的参数
//yield语句本身没有返回值或者说返回undefined,next()方法可以带一个参数,该参数会被当作上一条yield语句的返回值

function* f(){
    for(var i=0;true;i++){
        var reset = yield i;
        console.log(reset)
        if(reset){i = -1}
    }
}
var g = f();

g.next()//{value:0;done:false}
g.next()//{value:1;done:false}
g.next(true)//{value:0;done:false}

//上面是一个无限运行的Generator函数f,如果next()方法没有参数,每次执行到yield语句时,变量reset的值总是undefined,因为yield语句没有返回值,如果这是我们给next()方法带一个参数,则该参数会被当作上一条yield语句的返回值,即reset的值就被赋值为true,因而会等于-1,下次循环则从-1开始递增.
//这个功能有比较重要的语法意义,Generator函数从暂停到恢复运行,使其上下文状态是不变的.通过给next()方法传参,就有办法在Generator函数开始运行后继续向函数体内注入值,也就是说,可以再Generator函数运行到不同阶段,从外部传入不同的值,从而调整整个函数的行为.

function* foo(x){
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}
var a = foo(5);
a.next() // Object{value : 6 , done : false}
a.next() // Object{value : NaN , done : false}
a.next() // Object{value : NaN , done : false}
//上面代码中,第二次运行next()方法时不带参数,导致y的值等于2*undefined(即NaN),除以3以后还是NaN,因此返回对象的value属性也是NaN.第三次运行next()方法时不带参数,导致z等于undefined.
//所以最后return返回对象的value属性等于5+NaN+undefined,即NaN.

var b = foo(5)
b.next();
b.next(12);
b.next(13);
//上面的代码中,我们就向next()方法中添加了参数,结果就完全不一样,上面的代码第一次调用了b的next()方法,返回x+1等于6,第二次调用next()方法,将上一次的yield语句的值设为12,因此y等于24,,返回y/3的值为8;第三次调用next()方法,奖上一次yield的值设置为13,因此z等于13,这是x等于5,y等于24,所以return语句的值为42.

function wrapper(generatorFunction){
    return function(...args){
        let genertorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    }
}
const wrapped = wrapper(function* (){
    console.log(`First input: ${yield}`);
    return 'DONE';
});

wrapped().next('Hello') // First input : Hello
//注意 由于next()方法的参数表示上一条yield语句的返回值,所以第一次使用next()方法不能带参数,V8引擎会直接忽略掉第一次next()方法的参数.
//所以如果想第一次就调用next()方法并迭代参数,可以在Generator函数外面在套一层函数.


//for...of循环
//for...of循环可以自动遍历Generator函数,且此时不在需要调用next()方法
function* foo(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for(let v of foo()){
    console.log(v)
}
//1 2 3 4 5
//上面这段代码使用了for...of循环依次显示5条yield语句的值,一旦next()的返回对象的done属性为true时,循环就会被停止,且不包含返回对象.



function* fbnq(){
    let [children,parent] = [0,1]
    for(;;){
        [children,parent] = [parent,children + parent];
        yield parent;
    }
}
var i=0;
//用户输入天数
var userInput = 5;
for(var total of fbnq()){
    i++;
    if(userInput == i) break;
}
console.log(total);

//上面的代码是一个利用Generator函数和for..of实现的斐波那契数列的例子
//使用for..of语句时就不需要使用next()方法了


//给原生的JavaScript对象添加Symbol.iterator遍历接口.
//1.
function* objectEntries(obj){
    let propKeys = Reflect.ownKeys(obj);
    console.log(propKeys);
    for(let propKey of propKeys){
        yield [propKey,obj[propKey]];
    }
}
let jane = {first:'jane',last:'Doe'};
for(let[key,value] of objectEntries(jane)){
    console.log(`${key}:${value}`)
}
//上面的代码,对象jane原生不具备iterator接口,我们通过Generator函数objectEntries为他加上了遍历器接口
//我们就是利用Reflect.ownKeys()方法生出了一个["first", "last"],并且通过for..of把["first","jane"]依次返回.

//还有另一种写法,是将Generator函数加到对象的Symbol.iterator属性上
function* objectEntries(){
    let propKeys = Object.keys(this);
    for(let propKey of propKeys){
        yield [propKey,this[propKey]];
    }
}
let jane = {first:'jane',last:'Doe'};
jane[Symbol.iterator] = objectEntries;
for(let[key,value] of jane){
    console.log(`${key}:${value}`)
}
