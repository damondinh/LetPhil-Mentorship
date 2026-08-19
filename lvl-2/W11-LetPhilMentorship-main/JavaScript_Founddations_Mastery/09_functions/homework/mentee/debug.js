// ============================================================
// 🐛  FUNCTIONS — HOMEWORK  |  DEBUG TASKS
// ============================================================

// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This arrow function should return the full name
// but always returns undefined. What's wrong?

const getFullName = (first, last) => {
	first + ' ' + last;
};

console.log(getFullName('Alex', 'Rivera'));

// What's wrong ↓
// no return statement within an arrow function with curley brackets
// Your fix — write TWO versions:
//   a) Fix by adding return inside the braces
//   b) Fix by removing the braces (one-liner implicit return)

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This should return "Admin", "Moderator", or "Member"
// depending on role. It works for "admin" but returns
// undefined for everything else. What's wrong?

// function getRoleLabel(role) {
// 	if (role === 'admin') {
// 		return 'Admin';
// 	} else if (role === 'mod') {
// 		('Moderator');
// 	} else {
// 		('Member');
// 	}
// }

console.log(getRoleLabel('admin')); // "Admin" ✅
console.log(getRoleLabel('mod')); // undefined ❌
console.log(getRoleLabel('member')); // undefined ❌

// What's wrong ↓
// no return statement for else if and else cases
// Your fix ↓
function getRoleLabel(role) {
	if (role === 'admin') {
		return 'Admin';
	} else if (role === 'mod') {
		return 'Moderator';
	} else {
		return 'Member';
	}
}
// Bonus: rewrite the whole function as an arrow function
// using nested ternaries (just to see what it looks like —
// then write a comment about whether you'd actually use it).
const roleLabel = (role) =>
	role === 'admin' ? 'Admin' : role === 'mod' ? 'moderator' : 'Member'; // no because its harder to read
console.log(roleLabel('admin')); // "Admin" ✅
console.log(roleLabel('mod')); // undefined ❌
console.log(roleLabel('member')); // undefined ❌

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This discount calculator has TWO bugs.
// Both cause wrong math — find them both.

// const applyDiscount = (price, discountPercent = 10) => {
// 	const discountAmount = price * discountPercent;
// 	const finalPrice = price + discountAmount;
// 	return finalPrice;
// };

// console.log(applyDiscount(100, 20)); // expected: 80
// console.log(applyDiscount(50)); // expected: 45

// Bug 1 (math) ↓
// discountAmount = price * (discountPercent/100)
// Bug 2 (math) ↓
// finalPrice = price - discountAmount
// Your fix ↓
const applyDiscount = (price, discountPercent = 10) => {
	const discountAmount = price * (discountPercent / 100);
	const finalPrice = price - discountAmount;
	return finalPrice;
};

console.log(applyDiscount(100, 20)); // expected: 80
console.log(applyDiscount(50)); // expected: 45
