//如果在Generator函数中调用另一个Generator函数,默认是没有效果的.
//所以这时就需要用到yield*语句.
function* foo(){
    yield 'a';
    yield 'b';
}

function* bar(){
    yield 'x';
    yield* foo();
    yield 'y';
}
//等同于
function* bar(){
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
}
for(let v of bar()){
    console.log(v);
}
// 'x' 'a' 'b' 'y'

function* inner(){
    yield 'hello';
}
function* outer1(){
    yield 'open'
    yield inner();
    yield 'close';
}
var gen = outer1()
gen.next().value //'open'
gen.next().value //返回一个遍历器对象
gen.next().value //'close'

//上面的代码没有能正常运行 因为我们的yield语句没有加*.导致调用next()方法时返回了一个遍历器对象,这不是我们想要的
//所以我们修改一下

function* outer2(){
    yield 'open'
    yield* inner();
    yield 'close';
}
//这样就能正确的取到我们想要的value值了.
//当然如果遇到字符串,数组.我们也可以使用yield*语句,这样的话我们就可以返回字符串每个值或者数组每个值的遍历对象.

//如果被代理的Generator函数中有return语句.
function*　foo(){
    yield 2;
    yield 3;
    return 'foo';
}
function* bar(){
    yield 1;
    var v = yield* foo();
    console.log('v: ' + v);
    yield 4;
}
var it = bar();
it.next() // {value:1,done:false}
it.next() // {value:2,done:false}
it.next() // {value:3,done:false}
it.next() 
// 'v: foo'
// {value:4,done:false}
it.next() // {value:5,done:true}
//在上面的代码第4次调用next()方法的时候,会输出'v: foo',这是因为函数foo的return语句向函数bar提供了返回值.

function* genFuncWithReturn(){
    yield 'a';
    yield 'b';
    return 'The result';
}
function* logReturned(genObj){
    let result = yield* genObj;
    console.log(result);
}
[...logReturned(genFuncWithReturn())]
// The result
// ['a','b']
//上面这段代码,存在两次遍历,第一次是扩展运算符遍历函数logReturned返回遍历器对象,第二次是yield*语句遍历函数genFuncWithReturn返回的遍历器对象.
//所以最终的数据表达式得到的值为['a','b'],但是函数genFuncWithReturn的return语句的返回值The result会返回logReturned内部的result变量.

//对象属性为Generator函数
let obj = {
    * myGeneratorMethod(){

    }
}




//Generator函数中的this
//主要就是因为Generator不是普通的构造函数,所以this返回的回事遍历器对象,而不是this对象.

function* g(){
    this.a = 11
}
let obj = g();
obj.a //undefined

//如果想把Generator函数当作正常的构造函数使用.我们需要先生成一个空对象.
//然后使用bind方法绑定Generator函数内部的this.这样,构造函数调用后,这个空对象就是Generator函数的实例对象.
function* F(){
    yield this.x = 2;
    yield this.y = 3;
}
var obj = {};
var f = F.bind(obj)();
f.next() //Object {value:2,done:false}
f.next() //Object {value:3,done:false}
f.next() //Object {value:undefined,done:true}
//上面的代码中,首先是F的内部的this对象绑定了obj对象,然后调用它,返回一个Iterator对象.
//这个对象执行了3次next()方法,完成了F内部所有代码的运行.
//这时,所有内部属性都绑定在obj对象上.因而obj对象也就是F的实例了.
