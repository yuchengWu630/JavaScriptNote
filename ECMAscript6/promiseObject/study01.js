var promise = new Promise(function(resolve,reject){
    //some code
    if(异步操作成功)
        resolve(value)
    else
        reject(error)
})
//promise实例生成后,可以用then方法分别指定Resolved状态和Reject状态的回调函数
promise.then(function(value){
    //success
},function(value){
    //failure
})
//这两个函数都接受promise对象传出的值作为参数.

function timeout(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms,'done')
    });
}
timeout(100).then((value)=>{
    console.log(value);
})
//timeout方法返回一个Promise实例,过了指定时间ms后,Promise实例的状态变为Resolved,触发then方法绑定的回调.


//异步加载图片
function loadImageAsync(url){
    return new Promise (function(resolve,reject){
        var image = new Image();
        image.onload = function(){
            resolve(image);
        }
        image.onerror =function(){
            reject(new Error('Could not load image at ' + url))
        }
        image.src = url;
    });
}

//AJAX
var getJSON = function(url){
    var promise = new Promise(function(resolve,reject){
        var client = new XMLHttpRequest();
        clinet.open('GET',url);
        client.onreadystatechange = handler;
        client.response = 'json';
        client.setRequestHeader('Accept','apllication/json');
        client.send();

        function handler(){
            if(this.readyState !== 4){
                return;
            }
            if(this.status === 200){
                resolve(this.response);
            }
            else{
                reject(new Error(this.statusText));
            }
        }
    })
    return promise;
}
getJSON('/posts.json').then(function(json){
    console.log('Contents: '+json);
},function(error){
    console.log('出错了',error);
})
// 上面代码中,getJSON是对XMLHttpRequest对象的封装,用于发出一个针对JSON数据的HTTP请求,并返回一个promise对象.
//注意,在getJSON内部,resolve函数和reject函数调用时都带有参数.
//这些参数会被传递给回调函数.一般来说reject函数参数通常是一个Error对象的实例,表示抛出的错误.
//resolve函数的参数除了正常的值外,还可能是另一个Promise实例.

var p1 = new Promise(function(resolve,reject){
    //....
})
var p2 = new Promise(function(resolve,reject){
    resolve(p1);
})
//就像这样,p1和p2都是Promise实例,但是p2的resolve方法将p1作为参数,即一个异步操作的结果返回另一个异步操作.
//注意,p1的状态决定了p2的状态,如果p1状态是Pending,那么p2的回调函数就会等待p1的状态改变,若果改变成resolved或者rejected,那么p2的回调函数就会立刻执行.

var p1 = new Promise(function(resolve,reject){
    setTimeout(()=>reject(new Error('fail')),3000)
});
var p2 = new Promise(function(resolve,reject){
    setTimeout(()=>resolve(p1),1000)
})
p2.then(result => console.log(result),error => console.log(error));
p2.catch(error => console.log(error));
//这段代码中,p1是一个Promise实例,3秒后变为Rejected,p2的状态由p1决定,1秒过后,p2调用resolve方法,但此时p1状态还没有改变,因此p2状态也不会变都为Pending.2秒后p1变为rejected,那么p2也变为rejected.

 