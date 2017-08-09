//javaScript语言中的Thunk函数.
//JavaScript语言是传值调用,它的Thunk函数含义有所不同.在JavaScript语言中,thunk函数替换的不是表达式,而是多参数函数.他将其替换成单参数的版本,且只接受回调函数作为参数.

fs.readFile(fileName,callback);
//Thunk函数版本
var readFileThunk = Thunk(fileName);
readFileThunk(callback);

var Thunk = function(fileName){
    return function(callback){
        return fs.readFile(fileName,callback)
    }
}
//上面代码中,fs模块的readFile方法是一个多参数的函数,两个参数分别为文件名和回调函数.
//经过转化器处理面层一个单参数函数.这就叫Thunk函数.

//任何函数,只要参数有回调函数,就能写成Thunk函数的形式,下面是一个Thunk函数转化器.
var Thunk = function(fun){
    return function (...args){
        return function(callback){
            args.push(callback);
            return fun.apply(this,args);
        }
    }
}
//使用上面的转化器生成fs.readFile的Thunk函数
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback)

//thunk函数最大的作用就是可以自动执行Generator函数.
function run(fn){
    var gen = fn();
    function next(err,data){
        var result = gen.next(data);
        if(result.done) return;
        result.value(next);
    }
    next();
}
run(gen);
//上面的run函数就是一个Generator函数的自动执行器,内部的next函数就是Thunk回调函数.next函数先将指针移动到Generator函数的下一步(gen.next方法),然后在判断Generator函数是否结束(result.done属性),如过没结束就将next函数再传入Thunk函数(result.value属性),否则直接退出.
//前提是每一个异步操作都要是Thunk函数,也就是说yield后面必须是Thunk函数.