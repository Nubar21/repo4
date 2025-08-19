//решение первой задачи
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

//решение второй задачи
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  const str = x.toString();
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
};

//решение третьей задачи
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

//решение четвертой задачи
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const map = {
        ')': '(',
        '}': '{',
        ']': '[',
    }
    const stack = [];
    for (const char of s) {
        console.log(char)
    if (!map[char]) {
    stack.push (char);
    } else {
            const lastOpen = stack.pop();
            if (map[char] !== lastOpen) {
                return false;
            }
        }
    }
    if (stack.length === 0) {
        return true;
    } else {
        return false;
    }
};

//решение пятой задачи
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let allNines = true;
    for (let i = digits.length - 1; i>=0; i--) {
        if (digits[i] < 9) {
            digits[i] += 1;
            allNines = false;
            break;
} else { 
    digits[i] = 0;
    }
}
if (allNines) {digits.unshift(1);
}
return digits;
};