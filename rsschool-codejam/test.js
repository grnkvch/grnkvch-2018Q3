
const assert = require('assert');
const sumOfOther = require('./sumOfOther.js');
const make = require('./make.js');
const recursion = require('./recursion.js');

describe('sumOfOther', () => {
    it('0', () => {
      assert.equal(JSON.stringify(sumOfOther([1, 1, 1, 1])), JSON.stringify([3, 3, 3, 3]));
    });

    it('1', () => {
        assert.equal(JSON.stringify(sumOfOther([2, 3, 4, 1])), JSON.stringify([8, 7, 6, 9]));
      });
});

describe('make', () => {

    function sum(a, b) {
        return a + b;
    }

    it('0', () => {
      assert.equal(make(15)(34)(sum), 49);
    });

    it('1', () => {
        assert.equal(make(15)(34, 21)(sum), 70);
      });

    it('2', () => {
        assert.equal(make(15)(34, 21, 666)(sum), 736);
    });  

    it('3', () => {
        assert.equal(make(15)(34, 21, 666)(41)(sum), 777);
    });
});

describe('recursion', () => {

    let tree = {"value":100,"left":{"value":90,"left":{"value":70},"right":{"value":99}},"right":{"value":120,"left":{"value":110},"right":{"value":130}}};

    it('0', () => {
      assert.equal(JSON.stringify(recursion(tree)), JSON.stringify([[100], [90, 120], [70,99,110,130]]));
    });

});