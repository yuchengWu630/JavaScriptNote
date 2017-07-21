function C(){
    this.yuchengWu = [];
}
var yuchengWu = new C();

C.prototype.bind = function(key,fun){
    var tasks = this.yuchengWu[key] || [];
    tasks.push(fun);
    this.yuchengWu[key] = tasks;
}
C.prototype.exec = function(key,fun,param){
    var args = Array.prototype.slice.apply(arguments).slice(2);
    var tasks = this.yuchengWu[key];
    tasks = [];
    tasks.push(fun);
    tasks[0].apply(this,args);


}
C.prototype.execAll = function(key,param){
    var tasks = this.yuchengWu[key];
    var args = Array.prototype.slice.apply(arguments).slice(1);
    if(!Array.isArray(tasks)) return;
    tasks.forEach(function(fun){
            fun.apply(this,args);
    }) 
}
C.prototype.del = function(key ,fun){
    var tasks = this.yuchengWu[key];
    var method = fun.toString();
    state = 0;
    for(let i = 0;i<tasks.length;i++){
        if(tasks[i] == method){
            tasks[i]="";
            state=1;
        }
    }
    if(state == 0){
        console.log("没找到对应函数")
    }
    
}

C.prototype.delAll = function (key) {
    this.yuchengWu[key]=[]
}