//async函数的用法
// 同Generator函数一样,async函数返回一个Promise对象,可以使用then方法添加回调函数.
// 当函数执行时,一旦遇到await就会先返回.等到触发的异步操作完成,再接着执行函数体内后面的语句
async function getStockPriceByName(name){
    var symbol = await getStockSymbol(name);
    var stockPrice = await getStockPriceByName(symbol);
    return stockPrice;
}
getStockPriceByName('goog').then(function(result){
    console.log(result);
})
//这段代码是一个回去报价的函数,函数前面的async关键字表明该函数内部有异步操作.调用该函数时,会立刻返回一个Promise对象.

function timeout(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve,ms);
    })
}
async function asyncPrint(value,ms){
    await timeout(ms);
    console.log(value)
}
asyncPrint('hello world',50)
//这个例子指定了多少秒后输出一个值

//await命令后面的Promise对象,运行结果可能是Rejected,所以给await命令后的函数加个catch方法.
async function myFunction(){
    await somethingThatReturnsPromise().catch(function(err){
        console.log(err);
    })
}


//await命令不能再普通函数中使用.
async function dbFuc(db){
    let docs = [{},{},{}];
    //这里不能用forEach要用for循环
    for(let doc of docs){
        await db.post(doc);
    }
}
//如果希望多个请求并发执行,要用Promise.all方法
async function dbFuc(db){
    let docs = [{},{},{}];
    let promise = docs.map((doc) => db.post(doc));
    let results = await Promise.all(promise);
}


//假定某个Dom元素上部署了一系列的动画,前一个动画结束才能开始下一个,如果当中有一个失败,就不在往下运行,返回上一个成功执行的动画的返回值.

//Promise写法
function chainAnimationsPromise(elem,animations){
    var ret = null;
    var p = Promise.resolve();
    for(var anim in animations){
        p = p.then(function(val){
            ret = val;
            return anim(elem);
        })
    }
    return p.catch(function(e){
        console.log(e)
    }).then(function(){
        return ret;
    })
}
//Promise的写法比起回调函数的写法有很大改进,但是一眼看上去,代码完全是Promise的API,操作本身的语义反而不容易看出来



//Generator函数的写法
//这个代码使用Generator函数遍历每个动画,用户定义的操作全部在spawn函数的内部,而且必须定义一个spawn函数作为自动执行器,返回一个Promise对象ret.
//这里yield语句后面的表达式必须返回一个Promise.
function chainAnimationsGenerator(elem,animations){
    return spawn(function* (){
        var ret = null;
        try{
            for(var anim of animations){
                ret = yield anim(elem);
            }
        }
        catch(e){
            console.log(e);
        }
        return ret;
    })
}
// function kankan(){
//     return spawn(function* (){
//         var ret = null;
//         var animations = [1,2,3,4,5,6]
//         for(var anim of animations){
//             ret = yield anim;
//             console.log(ret)
//         }
//         return ret;
//     })
// }


//最后async函数的写法
async function chainAnimationsAsync(elem,animations){
    var ret = null;
    try{
        for(var anim of animations){
            ret = await anim(elem);
        }
    }
    catch(e){
        console.log(e);
    }
    return ret;
}
//可以看到async函数最为简洁,他将Generator函数写法中的自动执行器改在语言层面提供,不暴露给用户,代码量少.
