// ============================================================
// 🌐  APIs — LIVE CLASS
// ============================================================
// Open index.html in your browser.
//
// This lesson is about UNDERSTANDING APIs before writing fetch code.
// You will:
//   1. Explore real APIs in the browser
//   2. Read and navigate JSON responses in JavaScript
//   3. Understand what query parameters do
//
// The JSON Explorer on the right side of the page is wired up
// below (Part 1). The concept tasks are in Parts 2-5.
// Open DevTools (F12 → Console) to see task output.
// ============================================================

// ============================================================
// PART 1 — JSON EXPLORER (wires up the UI)
// ============================================================
// This powers the Parse button on the page.
// Read it, then move on to the concept tasks below.
// You do not need to edit this section.

document.getElementById("parse-btn").addEventListener("click", function () {
  const raw = document.getElementById("json-input").value.trim();
  const outputEl = document.getElementById("output-panel");

  if (!raw) {
    outputEl.innerHTML =
      '<p class="output-placeholder">Nothing to parse — paste a JSON response first.</p>';
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    outputEl.innerHTML = formatJSON(parsed, 0);
  } catch (e) {
    outputEl.innerHTML =
      '<p class="output-error">❌ Invalid JSON: ' + e.message + "</p>";
  }
});

document.getElementById("clear-btn").addEventListener("click", function () {
  document.getElementById("json-input").value = "";
  document.getElementById("output-panel").innerHTML =
    '<p class="output-placeholder">Parsed output will appear here.</p>';
});

// Recursive JSON formatter — colours each value type
function formatJSON(value, depth) {
  const indent = "  ".repeat(depth);
  const innerIndent = "  ".repeat(depth + 1);

  if (value === null) {
    return '<span class="output-null">null</span>';
  }
  if (typeof value === "boolean") {
    return '<span class="output-bool">' + value + "</span>";
  }
  if (typeof value === "number") {
    return '<span class="output-num">' + value + "</span>";
  }
  if (typeof value === "string") {
    return '<span class="output-str">"' + value + '"</span>';
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }
    const items = value.map(
      (item) => innerIndent + formatJSON(item, depth + 1),
    );
    return "[\n" + items.join(",\n") + "\n" + indent + "]";
  }

  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return "{}";
    }
    const pairs = keys.map(
      (k) =>
        innerIndent +
        '<span class="output-key">"' +
        k +
        '"</span>: ' +
        formatJSON(value[k], depth + 1),
    );
    return "{\n" + pairs.join(",\n") + "\n" + indent + "}";
  }

  return String(value);
}

// ============================================================
// PART 2 — WHAT IS AN API? (concept exploration)
// ============================================================
//
// API = Application Programming Interface
//
// Think of a restaurant:
//   - You (the client) look at the menu and place an order
//   - The waiter (the API) takes your request to the kitchen
//   - The kitchen (the server) prepares the food
//   - The waiter brings back the result
//
// You never go into the kitchen. You don't need to know how
// the food is made. You just order from the menu (the API docs)
// and receive what you asked for.
//
// In web development:
//   - YOUR browser/app is the client
//   - The API is the set of URLs you can call
//   - The server processes the request and returns data
//   - The data comes back as JSON

// TASK 1 — Explore a real API in the browser
// Open this URL in your browser's address bar (it's also a link in the UI):
//   https://jsonplaceholder.typicode.com/posts/1
//
// You just made a GET request! The browser IS the client.
// You should see a JSON response like:
//   {
//     "userId": 1,
//     "id": 1,
//     "title": "sunt aut facere...",
//     "body": "quia et suscipit..."
//   }
//
// Copy the response and paste it into the JSON Explorer on the page.
// Click Parse and observe the colour-coded output.
//
// Now answer these questions as comments:

// Q1: What is the URL you called? Write it here:
// URL:https://jsonplaceholder.typicode.com/posts/1

// Q2: What HTTP method did the browser use? (GET/POST/PUT/DELETE)
// Method:GET

// Q3: List the 4 properties in the response:
// Properties: userId, id, title, body

// Q4: What data type is "userId"? What type is "title"?
// Types: userId is a number, title is a string

// ============================================================
// PART 3 — QUERY PARAMETERS
// ============================================================
// Query parameters let you customise a GET request.
// They go at the END of the URL, starting with ?
//
// Base URL:   https://jsonplaceholder.typicode.com/posts
// With params:https://jsonplaceholder.typicode.com/posts?userId=1

//
// The ? marks the start of the query string.
// Each key=value pair is a parameter.
// Multiple parameters are separated by &:
//   /posts?userId=1&_limit=3
//
// These are NOT part of the path — the server reads them
// separately to filter or configure the response.

// TASK 2 — Query parameter exploration
// Open each URL below in the browser and compare the responses.
// Write what changes as a comment next to each.

// URL A: https://jsonplaceholder.typicode.com/posts
// How many posts? Write it: 100

// URL B: https://jsonplaceholder.typicode.com/posts?userId=1
// How many posts now? What changed? 10. we have userId=1

// URL C: https://jsonplaceholder.typicode.com/posts?userId=1&_limit=3
// How many posts now? What did _limit do?
// 3 posts. _limit limited the amount of posts returned.

// URL D: https://jsonplaceholder.typicode.com/posts?_page=2&_limit=5
// What posts appeared? What did _page do?
// 5 posts. _limit limited to second half of id post

// Write a comment explaining in plain English what query params do:
// Query params: Query params are ways to control data being shown by filtering, pagination, searching, and configuring.

// ============================================================
// PART 4 — JSON IN JAVASCRIPT
// ============================================================
// JSON (JavaScript Object Notation) looks like a JS object —
// but it's actually just a STRING. A text format for data.
//
// The key difference:
//   JS object: { name: "Alex", age: 28 }
//   JSON:      '{"name":"Alex","age":28}'   ← a string, with quoted keys
//
// To go between them:
//   JSON.stringify(jsObject) → JSON string
//   JSON.parse(jsonString)   → JS object
//
// When an API sends data, it sends a JSON string.
// Your JavaScript parses it into a real object you can work with.

// TASK 3 — Parse and navigate JSON
// Below is a mock API response (a JSON string).
// Parse it, then answer the questions by logging to the console.

const mockResponse = `{
  "status": 200,
  "data": {
    "user": {
      "id": 42,
      "name": "Sofia Patel",
      "email": "sofia@example.com",
      "isPremium": true,
      "tags": ["developer", "mentor", "speaker"]
    },
    "posts": [
      { "id": 1, "title": "Getting Started with JS", "likes": 142 },
      { "id": 2, "title": "Understanding the DOM",    "likes": 89  },
      { "id": 3, "title": "APIs Made Simple",          "likes": 203 }
    ]
  }
}`;

// a) Parse mockResponse into a JavaScript object called apiData
// const apiData = ...

const apiData = JSON.parse(mockResponse);

// b) Log the user's name
// console.log(apiData...);

console.log(apiData.data.user.name);

// console.log(mockResponse.data.user.name)

// c) Log whether the user is premium
// console.log(apiData...);

console.log(apiData.data.user.isPremium);

// d) Log the first tag in the tags array
// console.log(apiData...);

console.log(apiData.data.user.tags[0]); // developer

// e) Log the title of the second post
// console.log(apiData...);
console.log(apiData.data.posts[1].title); // Understanding the DOM

// f) Log the total number of posts
// console.log(apiData...);

console.log(apiData.data.posts.length); // 3

// TASK 4 — Loop through an API results array
// Using apiData from Task 3:
//
// a) Use forEach to log each post in this format:
//    "Post [id]: [title] — [likes] likes"

apiData.data.posts.forEach(function (post) {
  console.log(
    "Post " + post.id + ": " + post.title + " - " + post.likes + " likes",
  );
});

//
// b) Use filter to find posts with more than 100 likes.
//    Log how many there are.
const likes = apiData.data.posts.filter(function (post) {
  return post.likes > 100;
});
console.log(likes); // 2
//
// c) Use find to get the post with id === 2.
//    Log its title.
//

const titleWithID2 = apiData.data.posts.find(function (post) {
  return post.id === 2;
});
console.log(titleWithID2.title); // "Understanding the DOM"

// d) Use map to create an array of just the post titles.
//    Log the titles array.
const titles = apiData.data.posts.map((post) => {
  return post.title;
});
console.log(titles); // ["Getting Started with JS", "Understanding the DOM", "APIs Made Simple"]

// ============================================================
// PART 5 — HTTP METHODS AND STATUS CODES
// ============================================================

// TASK 5 — Match the method
// For each scenario, write which HTTP method you'd use.
// Write your answers as comments.

// Scenario A: Fetch a list of all products from a store.
// Method:GET

// Scenario B: Submit a new blog post.
// Method: POST

// Scenario C: Change a user's email address.
// Method: PUT

// Scenario D: Delete a comment.
// Method: DELETE

// Scenario E: Search for products with ?q=laptop
// Method:GET

// TASK 6 — Decode the status code
// For each status code, write what it means in plain English.
// Write your answers as comments.

// You try to fetch a post that was deleted:
// Status code: 404
// Meaning:NOT FOUND

// You try to access your bank account but your session expired:
// Status code: 401
// Meaning: UNAUTHORISED

// You successfully created a new user account:
// Status code: 201
// Meaning: CREATED

// You sent a form with an empty required field:
// Status code: 400
// Meaning:Bad Request

// The server crashed because of a bug in their code:
// Status code: 500
// Meaning:INTERNAL SERVER ERROR

// ============================================================
// PART 6 — READING API DOCUMENTATION
// ============================================================

// TASK 7 — Read real API docs and answer questions
//
// Open this URL: https://jsonplaceholder.typicode.com/
// Read the "Routes" section of the page.
//
// Answer as comments:
// Q1: What URL would you use to get ALL users?
// URL: https://jsonplaceholder.typicode.com/users

// Q2: What URL would you use to get user with ID 3?
// URL:https://jsonplaceholder.typicode.com/users/3

// Q3: What URL would you use to get all posts by user 2?
//     (Hint: look for query parameter examples on the page)
// URL:https://jsonplaceholder.typicode.com/posts?userId=2

// Q4: What URL would you use to get the comments on post 5?
//     (Hint: look for nested resource routes)
// URL:https://jsonplaceholder.typicode.com/posts/5/comments

// TASK 8 — Build a query string manually
// Declare a function called buildQueryString.
// Parameter: paramsObject (an object of key-value pairs)
//
// Returns a query string starting with "?".
// Example:
//   buildQueryString({ userId: 1, _limit: 5 })
//   → "?userId=1&_limit=5"
//
// Hint: use Object.keys() and .map() to build the pairs,
// then .join("&"), then prepend "?".

function buildQueryString(paramsObject) {
  const buildString = Object.keys(paramsObject).map(function (key) {
    return key + "=" + paramsObject[key];
  });

  return "?" + buildString.join("&");
}


// {
// userId: 1,
// _limit: 5
//}

//["userId, "_limit"]

//["userId=1", "_limit=5"]

// userId=1&_limit=5


// Test it:
console.log(buildQueryString({ userId: 1, _limit: 5 }));
// Expected: "?userId=1&_limit=5"

console.log(
  buildQueryString({
    latitude: 40.71,
    longitude: -74.01,
    current_weather: true,
  }),
);
// Expected: "?latitude=40.71&longitude=-74.01&current_weather=true"
