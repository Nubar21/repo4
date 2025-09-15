//решение первой задачи
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let twoSum = function (nums, target) {
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
var isPalindrome = function (x) {
  const str = x.toString();
  const reversedStr = str.split("").reverse().join("");
  return str === reversedStr;
};

//решение третьей задачи
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let sum = 0;
  let i;
  for (let i = 0; i < s.length; i++) {
    const currentValue = values[s[i]];
    const nextValue = values[s[i + 1]];
    if (nextValue && currentValue < nextValue) {
      sum -= currentValue;
    } else {
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
var isValid = function (s) {
  const map = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  const stack = [];
  for (const char of s) {
    console.log(char);
    if (!map[char]) {
      stack.push(char);
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
var plusOne = function (digits) {
  let allNines = true;
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i] += 1;
      allNines = false;
      break;
    } else {
      digits[i] = 0;
    }
  }
  if (allNines) {
    digits.unshift(1);
  }
  return digits;
};

//Решения задач для модуля 1.5

//решение первой задачи
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  let result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      result.push("FizzBuzz");
    } else {
      if (i % 5 === 0) {
        result.push("Buzz");
      } else {
        if (i % 3 === 0) {
          result.push("Fizz");
        } else {
          result.push(i.toString());
        }
      }
    }
  }
  return result;
};

//решение второй задачи
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const sign = x >= 0 ? 1 : -1;
  let absX = Math.abs(x);
  let str = absX.toString();
  const reversedStr = str.split("").reverse().join("");
  const reversedNumber = parseInt(reversedStr, 10) * sign;
  if (reversedNumber < -2147483648 || reversedNumber > 2147483647) {
    return 0;
  }
  return reversedNumber;
};

//решение третьей задачи
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  let counts = {};
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (counts[char] === undefined) {
      counts[char] = 1;
    } else {
      counts[char] += 1;
    }
  }
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (counts[char] === 1) {
      return i;
    }
  }
  return -1;
};

//решение четвертой задачи
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let lastNonZeroFoundAt = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            if (i !== lastNonZeroFoundAt) {
                [nums[lastNonZeroFoundAt], nums[i]] = [nums[i], nums[lastNonZeroFoundAt]];
            }
            lastNonZeroFoundAt++;
        }
    }
};

//решение пятой задачи
