//Generator函数返回的遍历器对象还有一个return()方法,可以返回给定值,并且终结Generator函数的遍历
function* gen(){
    yield 1;
    yield 2;
    yield 3;
}

var g = gen();
g.next() // {value:1,done:false}
g.return() // {value:'foo',done:true}
g.next() //{value:undefined,done:true}

//遍历器对象g调用了return方法后,返回值的value属性就是return方法的参数foo,同时,Generator函数的遍历终止
//以后再调用next()方法,done属性总返回true.

//try...finally代码块
function* numbers(){
    yield 1;
    try{
        yield 2;
        yield 3;
    }
    finally{
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();

g.next() //{done:false,value:1}
g.next() //{done:false,value:2}
g.return(7) //{done:false,value:4}
g.next() //{done:false,value:5}
g.next() //{done:true,value:7}
//上面的代码中,涉及到一些优先级的问题.因为finally代码块是必须最终需要执行的语句,所以return()方法要结束Generator函数的遍历就必须先执行finally代码块中的语句.
//当finally代码块执行完毕,才返回执行return()方法给定的参数,并终结Generator函数的遍历.

