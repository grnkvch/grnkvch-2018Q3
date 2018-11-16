/* eslint linebreak-style: ["error", "windows"] */
module.exports = function sumOfOther(arr) {
  return arr
    .map((item, index, arr) => arr
      .filter((item, i) => index !== i)
      .reduce((sum, current) => sum + current));
};
