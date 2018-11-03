module.exports = function sumOfOther (arr) {
    return arr.map((item,index,arr)=>arr.filter((item,i,arr)=>index!=i).reduce((sum, current)=>sum + current));
}