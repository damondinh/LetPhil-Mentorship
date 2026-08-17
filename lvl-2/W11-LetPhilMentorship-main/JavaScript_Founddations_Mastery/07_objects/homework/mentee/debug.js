// ============================================================
// 🐛  OBJECTS — HOMEWORK  |  DEBUG TASKS
// ============================================================
// Fix the bug in each snippet.
// Explain what was wrong as a comment. Then fix it.
// ============================================================

// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This should log the product's category but logs undefined.

// const product = {
//   name:     "Laptop",
//   price:    999,
//   category: "Electronics",
//   stock:    10
// };

// console.log(product.Category);

// What's wrong ↓
// property name is not capitalised
// Your fix ↓
const product = {
	name: 'Laptop',
	price: 999,
	category: 'Electronics',
	stock: 10,
};

console.log(product.category);

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This loop should log each product's name and price.
// It logs "undefined undefined" for every product. Why?

// const inventory = [
// 	{ Name: 'Shirt', Price: 29.99 },
// 	{ Name: 'Jeans', Price: 59.99 },
// 	{ Name: 'Jacket', Price: 89.99 },
// ];

// for (let i = 0; i < inventory.length; i++) {
// 	console.log(inventory[i].name + ' — $' + inventory[i].price);
// }

// What's wrong ↓
// property names are capitalised
// Your fix ↓
const inventory = [
	{ Name: 'Shirt', Price: 29.99 },
	{ Name: 'Jeans', Price: 59.99 },
	{ Name: 'Jacket', Price: 89.99 },
];

for (let i = 0; i < inventory.length; i++) {
	console.log(inventory[i].Name + ' — $' + inventory[i].Price);
}
// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This should calculate the total value of all products
// (price × stock) and log it. It logs NaN. There are TWO bugs.

// const products = [
// 	{ name: 'Phone', price: 699, stock: 15 },
// 	{ name: 'Tablet', price: 499, stock: 8 },
// 	{ name: 'Monitor', price: 329, stock: 12 },
// ];

// let totalValue = 0;

// for (let i = 0; i <= products.length; i++) {
// 	totalValue += products[i].price * products.stock;
// }

// console.log('Total value: $' + totalValue);

// Bug 1 ↓
// wrong syntax for selecting element in products array
// Bug 2 ↓
// index out of bounds when for loop is starts at 0 and i <= arr.length
// Your fix ↓
const products = [
	{ name: 'Phone', price: 699, stock: 15 },
	{ name: 'Tablet', price: 499, stock: 8 },
	{ name: 'Monitor', price: 329, stock: 12 },
];

let totalValue = 0;

for (let i = 0; i < products.length; i++) {
	totalValue += products[i].price * products[i].stock;
}

console.log('Total value: $' + totalValue);
