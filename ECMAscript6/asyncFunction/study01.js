//async就是Generator函数的语法糖.
//async和Generator的区别就是async函数就是将Generator函数的(*)替换成了async,将yield替换成了await
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
//等同于async函数的
var asyncReadFile = async function(){
    var f1 = await readFile('/etc/fstab');
    var f2 = await readFile('/etc/shells');
    console.log(f1.toString())
    console.log(f2.toString())
}

//当然光是这样的小变化,当然不能体现async函数的强大.
// async函数对于Generator函数的改进有5点
// 1.内置执行器.Generator函数执行必须靠执行器,所有才有了co模块,而async函数自带执行器.也就是说,async函数和普通函数一样,只需要一行
var result = asyncReadFile();
// 2.上面的代码调用了asyncReadFile函数,然后他就会自动执行.输出最后结果.完全不像Generator函数,需要调用next方法,或者用co模块,才能真正自动执行,并得到最终结果.
// 3.更好的语义,就是星号和yield的改变而已.
// 4.更广的适用性,co模块约定了Generator函数yield命令后面必须是Thunk和promise.而async的await命令后面可以是promise对象和原始类型的值.
// 5.返回值是promise对象.相比Generator函数返回的是iterator对象方便许多,可以用then方法指定下一步操作.

