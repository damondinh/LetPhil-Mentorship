// ============================================================
// 🐛  ARRAYS — HOMEWORK  |  DEBUG TASKS
// ============================================================
// Fix the bug in each snippet.
// Explain what was wrong as a comment. Then fix it.
// ============================================================

// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This should log the middle element ("C") of the array.
// Instead it logs undefined. What's wrong?

// const letters = ['A', 'B', 'C', 'D', 'E'];
// const middleIndex = letters.length / 2;
// console.log(letters[middleIndex]);

// What's wrong ↓
// middleIndex is undefined beacuse length / 2 is 2.5 then is used as an index
// Your fix ↓
const letters = ['A', 'B', 'C', 'D', 'E'];
const middleIndex = Math.floor(letters.length / 2);
console.log(letters[middleIndex]);
// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This loop should build a total of all prices.
// It logs NaN instead of a number. What's wrong?

// const prices = [10, 20, 30, 40];
// let total = 0;

// for (let i = 0; i <= prices.length; i++) {
// 	total += prices[i];
// }

// console.log('Total: $' + total);

// What's wrong ↓
// for loop is <= prices.length causing an index out side of the prices array length to be processed
// Your fix ↓
const prices = [10, 20, 30, 40];
let total = 0;

for (let i = 0; i < prices.length; i++) {
	total += prices[i];
}

console.log('Total: $' + total);

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This code is supposed to find the highest score in the array
// and log the winner's name. It always logs the wrong winner.
// There are TWO bugs. Find both.

// const names = ['Alice', 'Bob', 'Carol', 'Dave'];
// const scores = [82, 91, 78, 95];

// let topIndex = 1;
// let topScore = 0;

// for (let i = 0; i < scores.length; i++) {
// 	if (scores[i] > topScore) {
// 		topScore = scores[i];
// 		topIndex = i;
// 	}
// }

// console.log('Winner: ' + names[topIndex] + ' with ' + topScore);

// Bug 1 ↓

// Bug 2 ↓

// Your fix ↓
const names = ['Alice', 'Bob', 'Carol', 'Dave'];
const scores = [82, 91, 78, 95];

let topIndex = 1;
let topScore = 0;

for (let i = 0; i < scores.length; i++) {
	if (scores[i] > topScore) {
		topScore = scores[i];
		topIndex = i;
	}
}

console.log('Winner: ' + names[topIndex] + ' with ' + topScore);
// no bugs? Dave with 95 is the highest with the correct console log
