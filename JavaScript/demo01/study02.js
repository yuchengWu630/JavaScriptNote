//建立对象A
var A = {
    name:'yuchengWu',
    describe:function(){
        return '姓名' + this.name;
    }
};
//建立对象B
var B = {
    name:'chengyuWu'
};
//把A对象的describe属性赋值给B
B.describe = A.describe;
//调用B的describe方法
B.describe(); //"姓名: chengyuWu"