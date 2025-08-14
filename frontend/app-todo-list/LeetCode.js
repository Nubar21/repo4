//готовое решение первой задачи
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        const j = nums.indexOf(complement, i + 1);
        if (j !== -1) {
            return [i, j];
        }
    }
    return [];
};

//готовое решение второй задачи
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  const str = x.toString();
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
};

//готовое решение третьей задачи
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const values = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
};
let sum = 0;
let i;
   for (let i = 0; i < s.length; i++) {
    const currentValue = values[s[i]];
    const nextValue = values[s[i + 1]];
        if (nextValue && currentValue < nextValue) {
            sum -= currentValue
        }
            else {
    sum += currentValue;
}
    }
    return sum;
};

//готовое решение четвертой задачи

//готовое решение пятой задачи