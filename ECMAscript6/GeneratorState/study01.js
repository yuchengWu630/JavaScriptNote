//Generator函数实现状态机.
//正常情况我们都会在全局指定一个变量作为状态改变时的参照
var ticking = true;
var clock = function(){
    if(ticking)
        console.log('Tick!')
    else
        console.log('Tock!')
    ticking = !ticking;
}
//这个函数有两个状态,每运行一次就改变一个状态.
//如果用Generator实现的话
function* clock(_){
    while(true){
        yield _;
        console.log('Tick!');
        yield _;
        console.log('Tock!');
    }
}
var state = clock();
//这个简单的状态改变函数,相比es5省去了全局的参照变量,更简洁,但是还存在一个问题,就是Generator函数第一次调用的问题.
function firstNext(generatorFunction){
    return function(...args){
        let genertorObj = generatorFunction(...args)
        genertorObj.next();
        return genertorObj;
    }
}
var clock = firstNext(function* (_){
    while(true){
        yield _;
        console.log('Tick!');
        yield _;
        console.log('Tock!');
    }
})
var state = clock();
//上面的函数 我们用firstNext函数先包一层,就可起到第一次调用就改变状态
//学了那么久可能会有疑问,为什么一定要用state变量接住clock()然后在执行next()方法,直接用clock().next()也可以出来返回对象啊.
//但是你在调用next()方法会发现,怎么次次结果都是一样的呢?
//因为调用 Generator 函数，会返回一个内部指针(即遍历器对象),如果你直接用Generator函数调用next(),那么这个指针将不被保存.所以你再次执行next()方法是还是同样的值.