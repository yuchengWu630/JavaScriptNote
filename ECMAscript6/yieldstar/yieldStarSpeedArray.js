//通过yield*命令很快的取出嵌套数组所有成员
function* iterTree(tree){
    if(Array.isArray(tree)){
        for(let i = 0; i < tree.length;i++){
            yield* iterTree(tree[i])
        }
    }else{
        yield tree;
    }
}
const tree = ['a',['b','c'],['d','e']];

for(let x of iterTree(tree)){
    console.log(x)
}