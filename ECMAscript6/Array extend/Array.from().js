//下面是一个类数组对象
let arrayLike = {
    '0':'yuchengWu',
    '1':21,
    '2':'The Milky Way Era',
    '3':'maomao',
    '4':'Alienware17R3',
    length:5
}
//通过Array.from方法可以将他们转化为真正的数组
let arr1 = Array.from(arrayLike);

/////////////////////////////////////////////

//查找多个元素 返回一个类数组对象
let ps = document.querySelectorAll('p');
//就可以通过Array.from方法把他转化为一个真正的数组
//然后再利用forEach方法给他们都绑定上函数
Array.from(ps).forEach(function(p){
    console.log(p);
});

////////////////////////////////////////////

//函数声明后自动生成的arguments对象
function foo(arguments){
    //我们也可以把这个对象转化成数组
 var args = Array.from(arguments);

}

////////////////////////////////////////////

//对于还没有部署该方法的浏览器,可以用Array.prototype.slice方法代替

const toArray = (()=> Array.form ? Array.from : obj => [].slice.call(obj))();

(function (obj){
    
    return [].slice.call(obj)

})();