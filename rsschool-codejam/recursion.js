module.exports = function recursion(tree, deep = 0, result = []){
    if (!result[deep]) result[deep] = [];
    if (tree) result[deep].push(tree.value);
    else return;
    if (tree.left) recursion(tree.left, (deep+1), result);
    if (tree.right) recursion(tree.right, (deep+1), result);
    return result;
}