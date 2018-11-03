module.exports = function make (...arg) {
    let data = [];
    if (typeof arg[0] === 'function') throw new TypeError("There's no data to calculate");
    data = arg.slice();
    return make = function make(...arg) {
        if (typeof arg[0] === 'function') return data.reduce(arg[0]);
        data = data.concat(arg);
        return make;
    }
}