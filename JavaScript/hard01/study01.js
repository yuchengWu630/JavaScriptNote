function wyc(name) {
    this.tasks = [];   
    var self = this;
    window.c=name;
    var fn =(function(n){
        return function(){
            console.log("你好, " + c + "!");
            self.next();
        }
    })(name);
    this.tasks.push(fn);
    setTimeout(function(){
        self.next();
    }, 0); // 在下一个事件循环启动任务
}
/* 事件调度函数 */
wyc.prototype.next = function() { 
    var fn = this.tasks.shift();
    fn && fn();
}
wyc.prototype.eat = function(name) {
    var self = this;
    var fn =(function(name){
        return function(){
            console.log(c + "吃了" + name);
            self.next()
        }
    })(name);
    this.tasks.push(fn);
    return this; // 实现链式调用
}
wyc.prototype.sleep = function(time) {
    var self = this;
    var fn = (function(time){
        return function() {
            setTimeout(function(){
                console.log("休息" + time + "秒!");
                self.next();
            }, time * 1000);
        }
    })(time);
    this.tasks.push(fn);
   return this;
}
wyc.prototype.sleepFirst = function(time) {
    var self = this;
    var fn = (function(time) {
        return function() {
            setTimeout(function() {
                console.log("开始等待" + time + "秒!");
                self.next();
            }, time * 1000);
        }
    })(time);
    this.tasks.unshift(fn);
    // return this;
}
/* 实例化 */
function Human(name){
    return new wyc(name);
}
