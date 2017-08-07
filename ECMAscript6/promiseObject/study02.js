//Promise实例具有then方法.then方法定义在原先对象Promise.prototype上.
//它的作用是为Promise实例添加状态改变时的回调函数.
//then方法两个参数 resolved和rejected
//注意.then方法返回的是一个新的Promise实例(不是原来那个),所以可以采用链式写法.

getJSON('/post/1.json').then(function(post){
    return getJSON(post.commentURL);
}).then(function funA(comments){
    console.log('Resolved: ',comments);
},function funB(err){
    console.log('Rejected: ',err)
});
//采用链式调用可以指定一组按照次序调用的回调函数.这时,前一个回调函数返回的还是一个Promise对象.而后一个回调函数就会等待该Promise对象的状态发生改变,再被调用.
//上面代码的第二个then方法就会等待上一个then方法return的新Promise对象的状态发生变化.如果变为Resolved,就调用FunA,反之就调用FunB.

//Promise.prototype.catch方法主要是用于处理错误的回调函数.
getJSON('/posts.json')
    .then(posts => console.log(posts))
    .catch(error => console.log('发生错误!(在这个catch方法中,就可以处理错误)',error));
//catch方法也可以写成 .then(null,(error) => console.log('发生错误!(在这个catch方法中,就可以处理错误)',error));

var promise = new Promise(function(resolve,reject){
    resolve('OK');
    throw new Error('test');
});
promise.then(value => console.log(value)).catch(error => console.log(error));
//OK
//还有一种情况就是,Promise排除一个错误,就会被catch方法的回调函数捕获,但是如果Promise的状态已经变成Resolved,在抛出错误是无效的.
//Promise对象的错误是具有'冒泡'性质的.会一直向后传递,直到被捕获为止.


//注意 所以不要在then方法中定义Rejected状态的回调函数,而是直接使用catch方法.
//catch方法返回的也是一个Promise对象,所以后面依旧可以链式调用then方法.如果没有报错就会跳过catch方法.

var promise = new Promise(function(resolve,reject){
    resolve('ok');
    setTimeout(function(){ throw new Error ('test')},0)
})
promise.then(value => console.log(value));
// ok
// Uncaught Error:test
//这段代码中,Promise在指定下一轮'事件循环'再抛出错误,结果由于没有指定使用try..catch语句,就冒泡到最外层,成了未捕获的错误,因此Promise函数已经运行结束,这个错误就在Promise函数体外被抛出.
//Node.js有一个unhandleRejection事件,专门用来监听未捕获的Reject错误.
process.on('unhandledRejection',function(error,promise){
    console.error(error.stack)
});

//Promise.all方法用于多个Promise实例包装成一个新的Promise实例
var p = Promise.all([p1,p2,p3]);
//all方法接受一个具有Iterator接口的参数.p的状态由内部的p1,p2,p3决定.
//只有所有成员的状态都变成Fuifilled,p的状态才会变成Fulfilled,此时所有成员的返回值会组成一个数组,传递给p的回调函数.
//只要有一个成员的状态为Rejected,p的状态就变成Rejected,此时第一个被Rejected的实例返回值会传给p的回调函数.



//Generator函数与Promise对象的结合.
function getFoo(){
    return new Promise(function(resolve,reject){
        resolve('foo');
    });
}
var g = function* (){
    try{
        var foo = yield getFoo();
        console.log(foo);
    }catch(e){
        console.log(e);
    }
}
function run(generator){
    var it =  generator();

    function go(result){
        if(result.done) return result.value;

        return result.value.then(function(value){
            return go(it.next(value));
        },function(error){
            return go(it.throw(error))
        })
    }
    go(it.next());
}
run(g);
//上面的Generator函数g中,有一个异步操作getFoo,他返回的就是一个Promise对象.函数run用来处理这个Promise对象,并调用下一个next()方法.