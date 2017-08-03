//Generator函数返回遍历器对象都有一个throw()方法
//可以在函数外抛出错误,然后在函数内捕获
var g = function* (){
    while(true){
        try{
            yield;
        }
        catch(e){
            if(e != 'a') throw e;
            console.log('内部捕获',e);
        }
    }
}
var i = g();
i.next();

try{
    i.throw('a');
    i.throw('b');
}catch (e){
    console.log('外部获取',e);
}
//遍历器对象i抛出两个错误,第一个错误被Generator函数体内的catch语句捕获
//第二个错误,被体外的catch语句捕获.
//这里是遍历器对象的throw方法,而不是全局的throw命令.

