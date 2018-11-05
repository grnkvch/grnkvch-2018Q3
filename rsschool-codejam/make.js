/* eslint linebreak-style: ["error", "windows"] */
module.exports = function make(...arg) {
  let data = [];
  if (typeof arg[0] === 'function') throw new TypeError("You can't pass the function without any data.");
  data = arg.slice();
  function foo(...val) {
    if (typeof val[0] === 'function') return data.reduce(val[0]);
    data = data.concat(val);
    return foo;
  }
  return foo;
};
