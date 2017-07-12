//创建一个对象 person(人)
var person = {
    //建立一个name属性
    name:'yuchengWu',
    //建立一个describe属性函数
    describe:function(){
        //返回
        return '姓名:' +this.name;
        //这里的this就是指当前对象person
    }
}
//person这个对象调用了自己的describe属性函数
//所以this指当前对象person
person.describe(); //'姓名:yuchengWu'