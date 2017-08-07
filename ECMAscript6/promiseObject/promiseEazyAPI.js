//done()

Promise.prototype.done = function(onFulfilled,onRejected){
    this.then(onFulfilled,onRejected)
    .catch(function(reason){
        setTimeout(() => {throw reason},0);
    })
}
//done方法用于捕获任何可能出现的错误,并向全局抛出
//不管以then或catch方法结尾,都可能在最后一个方法抛出错误并无法捕捉到.为此就要用done方法,放在回调链的尾端,保证抛出任何可能出现的错误.


//finally()

Promise.prototype.finally = function(callback){
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {throw reason})
    )
}
//finally方法用于不管Promise对象最后状态如何,都会执行的操作.他与done方法的最大区别在于,他接受一个普通的回调函数作为参数.该函数不管怎样都必须执行.