var co = require('co');

var gen = function* (){
    var f1 = yield readFile('/etc/fstab')
    var f2 = yield readFile('/etc/shells')
    console.log(f1.toString())
    console.log(f2.toString())
}
var promise = co(gen);
//co模块可以将你传入的Generator函数自动执行.
//co函数返回一个promise对象,因此可以使用then方法添加回调函数.
promise.then(function(){
    console.log('Generator函数执行完成');
})

//co模块就是用Thunk函数和promise对象这两种自动执行器来'交回执行权'起到一个自动执行的目的.
//使用co模块的前提条件是,Generator函数的yield后面必须是thunk函数或者promise对象.

//基于Promise对象的自动执行(promise对象实现自动流程管理)
var fs = require('fs');
//fs.readFile(fileName,callback)
var readFile = function(fileName){
    return new Promise(function(resolve,reject){
        fs.readFile(fileName,function(error,data){
            if(error) reject(error)
            resolve(data);
        })
    })
}
var gen = function* (){
    var f1 = yield readFile('/etc/fstab')
    var f2 = yield readFile('/etc/shells');
    console.log(f1.toString())
    console.log(f2.toString())
}
//手动
var g = gen();

g.next().value.then(function(data){
    g.next(data).value.then(function(data){
        g.next(data);
    })
})
//自动
function run(gen){
    var g = gen();
    function next(data){
        var result = g.next(data);
        if(result.done) return result.value;
        result.value.then(function(data){
            next(data)
        });
    }
    next();
}
run(gen);