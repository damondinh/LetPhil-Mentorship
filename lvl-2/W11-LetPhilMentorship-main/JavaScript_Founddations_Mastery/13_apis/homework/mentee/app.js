// ============================================================
// 🏠  APIs — HOMEWORK
// ============================================================
// API Exploration and JSON Navigation Exercises
//
// For this homework you will:
//   1. Open real API URLs in the browser
//   2. Copy responses and work with them as JS strings
//   3. Parse, navigate, and analyse the JSON data
//   4. Build URL utilities
//
// Open DevTools (F12 → Console) to see all output.
// Use the reference links on the page to explore the APIs.
// ============================================================

// ----------------------------------------------------------
// TASK 1 — Explore JSONPlaceholder users
// ----------------------------------------------------------
// Open this URL in your browser:
//   https://jsonplaceholder.typicode.com/users
//
// You will see an array of 10 user objects.
// Each user has: id, name, username, email, address, phone, website, company
//
// Copy the ENTIRE response (all 10 users) and paste it as a
// string assigned to the variable below.
//
// const usersJson = `[paste here]`;
//
// Then:
// a) Parse it: const users = JSON.parse(usersJson)
// b) Log how many users there are
// c) Log the name of the first user
// d) Log the email of the last user (use .length - 1)
// e) Log the city of the third user (address.city)
// f) Log the company name of user with id === 7

// Paste the JSON response here:
const usersJson = `[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": {
      "street": "Douglas Extension",
      "suite": "Suite 847",
      "city": "McKenziehaven",
      "zipcode": "59590-4157",
      "geo": {
        "lat": "-68.6102",
        "lng": "-47.0653"
      }
    },
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": {
      "name": "Romaguera-Jacobson",
      "catchPhrase": "Face to face bifurcated interface",
      "bs": "e-enable strategic applications"
    }
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": {
      "street": "Hoeger Mall",
      "suite": "Apt. 692",
      "city": "South Elvis",
      "zipcode": "53919-4257",
      "geo": {
        "lat": "29.4572",
        "lng": "-164.2990"
      }
    },
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
    "company": {
      "name": "Robel-Corkery",
      "catchPhrase": "Multi-tiered zero tolerance productivity",
      "bs": "transition cutting-edge web services"
    }
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": {
      "street": "Skiles Walks",
      "suite": "Suite 351",
      "city": "Roscoeview",
      "zipcode": "33263",
      "geo": {
        "lat": "-31.8129",
        "lng": "62.5342"
      }
    },
    "phone": "(254)954-1289",
    "website": "demarco.info",
    "company": {
      "name": "Keebler LLC",
      "catchPhrase": "User-centric fault-tolerant solution",
      "bs": "revolutionize end-to-end systems"
    }
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": {
      "street": "Norberto Crossing",
      "suite": "Apt. 950",
      "city": "South Christy",
      "zipcode": "23505-1337",
      "geo": {
        "lat": "-71.4197",
        "lng": "71.7478"
      }
    },
    "phone": "1-477-935-8478 x6430",
    "website": "ola.org",
    "company": {
      "name": "Considine-Lockman",
      "catchPhrase": "Synchronised bottom-line interface",
      "bs": "e-enable innovative applications"
    }
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz",
    "address": {
      "street": "Rex Trail",
      "suite": "Suite 280",
      "city": "Howemouth",
      "zipcode": "58804-1099",
      "geo": {
        "lat": "24.8918",
        "lng": "21.8984"
      }
    },
    "phone": "210.067.6132",
    "website": "elvis.io",
    "company": {
      "name": "Johns Group",
      "catchPhrase": "Configurable multimedia task-force",
      "bs": "generate enterprise e-tailers"
    }
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": {
      "street": "Ellsworth Summit",
      "suite": "Suite 729",
      "city": "Aliyaview",
      "zipcode": "45169",
      "geo": {
        "lat": "-14.3990",
        "lng": "-120.7677"
      }
    },
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
    "company": {
      "name": "Abernathy Group",
      "catchPhrase": "Implemented secondary concept",
      "bs": "e-enable extensible e-tailers"
    }
  },
  {
    "id": 9,
    "name": "Glenna Reichert",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io",
    "address": {
      "street": "Dayna Park",
      "suite": "Suite 449",
      "city": "Bartholomebury",
      "zipcode": "76495-3109",
      "geo": {
        "lat": "24.6463",
        "lng": "-168.8889"
      }
    },
    "phone": "(775)976-6794 x41206",
    "website": "conrad.com",
    "company": {
      "name": "Yost and Sons",
      "catchPhrase": "Switchable contextually-based project",
      "bs": "aggregate real-time technologies"
    }
  },
  {
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": {
      "street": "Kattie Turnpike",
      "suite": "Suite 198",
      "city": "Lebsackbury",
      "zipcode": "31428-2261",
      "geo": {
        "lat": "-38.2386",
        "lng": "57.2232"
      }
    },
    "phone": "024-648-3804",
    "website": "ambrose.net",
    "company": {
      "name": "Hoeger LLC",
      "catchPhrase": "Centralized empowering task-force",
      "bs": "target end-to-end models"
    }
  }
]`; // ← replace [] with the real response

// Your code:
const users = JSON.parse(usersJson); //convert json string to object
console.log(`Users count: ${users.length}`);
console.log(`First user's name: ${users[0].name}`);
console.log(`Last user's email: ${users[users.length - 1].email}`);
console.log(`Third user's city: ${users[2].address.city}`);
console.log(
	`User with ID 7's company name: ${users.find((u) => u.id === 7).company.name}`,
);

// ----------------------------------------------------------
// TASK 2 — Navigate nested data
// ----------------------------------------------------------
// Using the users array from Task 1:
//
// a) Use map to create an array of just the user names.
//    Log: "All users: " + names
//
// b) Use filter to find users whose email ends in ".biz"
//    (Hint: email.endsWith(".biz"))
//    Log how many there are and their names.
//
// c) Use find to get the user with username === "Samantha"
//    Log their full address:
//    user.address.street + ", " + user.address.city
//
// d) Use forEach to log each user's name and company:
//    "Name: [name] | Company: [company.name]"

// a) Create an array of just the user names
const names = users.map((u) => u.name);
console.log(`All users: ${names}`);
// b) find users whose emails ends in ".biz"
const emails = users.filter((u) => u.email.endsWith('.biz'));
console.log(`Number of emails ending with .biz: ${emails.length}`);
console.log(`Users with emails ending with .biz: ${emails.map((u) => u.name)}`);
// c) user with username === "Samantha"
//const userFound = users.find((u) => u.name === 'Samantha');
const userFound = users.find((u) => u.name.includes('Leanne'));
console.log(`${userFound.address.street}, ${userFound.address.city}`);
// d) log each users name and company
users.forEach((u) => {
	console.log(`Name: ${u.name} | Company: ${u.company.name}`);
});

//console.log(`Name: ${samantha.name} | Company: ${samantha.company.name}`);
// ----------------------------------------------------------
// TASK 3 — Query parameters in practice
// ----------------------------------------------------------
// Open these URLs one at a time and answer the questions as comments.
//
// URL A: https://jsonplaceholder.typicode.com/posts?userId=3
// How many posts does user 3 have?
// Answer: 10
//
// URL B: https://jsonplaceholder.typicode.com/todos?userId=1&completed=true
// How many completed todos does user 1 have?
// Answer: 11
//
// URL C: https://jsonplaceholder.typicode.com/todos?userId=1&completed=false
// How many incomplete todos does user 1 have?
// Answer: 9
//
// URL D: https://jsonplaceholder.typicode.com/posts?_page=3&_limit=4
// What is the id of the first post on page 3?
// (Count: page 3 at limit 4 = posts starting at index 8, id 9)
// Answer: 9
//
// Write a comment explaining what you'd change in URL D to get page 5:
// Answer: change query parameter ?_page=5
//         https://jsonplaceholder.typicode.com/posts?_page=5&_limit=4

// ----------------------------------------------------------
// TASK 4 — Build URLs with query params
// ----------------------------------------------------------
// Declare a function called buildApiUrl.
// Parameters: baseUrl (string), params (object)
//
// Inside:
//   - If params is empty (Object.keys(params).length === 0)
//     return baseUrl unchanged
//   - Otherwise build the query string:
//       "?" + Object.keys(params)
//         .map(key => key + "=" + params[key])
//         .join("&")
//     return baseUrl + queryString

function buildApiUrl(baseUrl, params) {
	// 1. Handle empty params
	if (Object.keys(params).length === 0) {
		return baseUrl;
	} else {
		// 2. Handle valid params
		const queryString =
			'?' +
			Object.keys(params)
				.map((key) => key + '=' + params[key])
				.join('&');
		return baseUrl + queryString;
	}
}

// Test it:
console.log(
	buildApiUrl('https://jsonplaceholder.typicode.com/posts', { userId: 1 }),
);
// "https://jsonplaceholder.typicode.com/posts?userId=1"

console.log(
	buildApiUrl('https://jsonplaceholder.typicode.com/posts', {
		userId: 2,
		_limit: 5,
	}),
);
// "https://jsonplaceholder.typicode.com/posts?userId=2&_limit=5"

console.log(buildApiUrl('https://jsonplaceholder.typicode.com/posts', {}));
// "https://jsonplaceholder.typicode.com/posts"  ← no ? when no params

// ----------------------------------------------------------
// TASK 5 — Work with the Open-Meteo weather API
// ----------------------------------------------------------
// Open this URL in your browser:
//   https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true
//
// This is a REAL weather API — no API key needed.
// You will see the current weather for New York City.
//
// Copy the response and paste it below.

const weatherJson = `{"latitude":40.710335,"longitude":-73.99308,"generationtime_ms":0.17702579498291016,"utc_offset_seconds":0,"timezone":"GMT","timezone_abbreviation":"GMT","elevation":27.0,"current_weather_units":{"time":"iso8601","interval":"seconds","temperature":"°C","windspeed":"km/h","winddirection":"°","is_day":"","weathercode":"wmo code"},"current_weather":{"time":"2026-09-28T07:45","interval":900,"temperature":15.2,"windspeed":20.4,"winddirection":21,"is_day":0,"weathercode":3}}`; // ← replace {} with the real response

// Then:
// a) Parse it: const weather = JSON.parse(weatherJson)
// b) Log the current temperature
//    (Hint: weather.current_weather.temperature)
// c) Log the wind speed
// d) Log the weathercode
//    (Note: weathercode is a number. 0 = clear sky, 1-3 = cloudy,
//     45-48 = foggy, 51-67 = rain, 71-77 = snow, 80-99 = storms)
// e) Write a function called describeWeather that takes a weathercode
//    and returns a human-readable description using if/else:
//      0        → "☀️ Clear sky"
//      1, 2, 3  → "⛅ Partly cloudy"
//      45, 48   → "🌫️ Foggy"
//      (below 80 and above 3) → "🌧️ Rain or drizzle"
//      80 and above → "⛈️ Stormy"
//
// ⚠️ ORDER MATTERS: 45 and 48 are inside the "below 80 and
//    above 3" range too. Check them in the order listed above —
//    foggy BEFORE the wider rain range — or every foggy day
//    silently gets misclassified as rain. This is why if/else
//    (not just a series of separate ifs) matters here: once one
//    condition matches, the rest are skipped.
//    Log describeWeather(weather.current_weather.weathercode)

// Your code:
const weather = JSON.parse(weatherJson);
console.log(`Current Temp: ${weather.current_weather.temperature}C`);
console.log(`Wind Speed: ${weather.current_weather.windspeed}`);
console.log(`Weathercode: ${weather.current_weather.weathercode}`);
function describeWeather(weathercode) {
	const intCode = parseInt(weathercode);
	if (intCode === 0) {
		return '☀️ Clear sky';
	} else if (intCode >= 1 && intCode <= 3) {
		return '⛅ Partly cloudy';
	} else if (intCode === 45 || intCode === 48) {
		return '🌫️ Foggy';
	} else if (intCode > 3 && intCode < 80) {
		return '🌧️ Rain or drizzle';
	} else if (intCode >= 80) {
		return '⛈️ Stormy';
	}
}
console.log(describeWeather(weather.current_weather.weathercode));
// console.log(describeWeather('0') === '☀️ Clear sky');
// console.log(describeWeather('1') === '⛅ Partly cloudy');
// console.log(describeWeather('3') === '⛅ Partly cloudy');
// console.log(describeWeather('45') === '🌫️ Foggy');
// console.log(describeWeather('48') === '🌫️ Foggy');
// console.log(describeWeather('47') === '🌧️ Rain or drizzle');
// console.log(describeWeather('4') === '🌧️ Rain or drizzle');
// console.log(describeWeather('79') === '🌧️ Rain or drizzle');
// console.log(describeWeather('80') === '⛈️ Stormy');
// console.log(describeWeather('999') === '⛈️ Stormy');

// ----------------------------------------------------------
// TASK 6 — Compare two cities
// ----------------------------------------------------------
// Open BOTH weather URLs from the reference panel on the page:
//   NYC:    latitude=40.71&longitude=-74.01
//   London: latitude=51.51&longitude=-0.13
//
// Paste each response below.

const nycWeatherJson = `{"latitude":40.710335,"longitude":-73.99308,"generationtime_ms":0.1589059829711914,"utc_offset_seconds":0,"timezone":"GMT","timezone_abbreviation":"GMT","elevation":27.0,"current_weather_units":{"time":"iso8601","interval":"seconds","temperature":"°C","windspeed":"km/h","winddirection":"°","is_day":"","weathercode":"wmo code"},"current_weather":{"time":"2026-09-28T08:00","interval":900,"temperature":15.2,"windspeed":21.3,"winddirection":24,"is_day":0,"weathercode":61}}`; // ← NYC response
const londonWeatherJson = `{"latitude":51.51147,"longitude":-0.13078308,"generationtime_ms":0.19156932830810547,"utc_offset_seconds":0,"timezone":"GMT","timezone_abbreviation":"GMT","elevation":29.0,"current_weather_units":{"time":"iso8601","interval":"seconds","temperature":"°C","windspeed":"km/h","winddirection":"°","is_day":"","weathercode":"wmo code"},"current_weather":{"time":"2026-09-28T08:00","interval":900,"temperature":15.1,"windspeed":7.6,"winddirection":34,"is_day":1,"weathercode":3}}`; // ← London response

// Then:
// a) Parse both
// b) Compare temperatures:
//    "NYC: [temp]°C | London: [temp]°C"
// c) Log which city is warmer:
//    "The warmer city is: [city name]"
//    Use a ternary: nycTemp > londonTemp ? "New York" : "London"
const nycWeather = JSON.parse(nycWeatherJson);
const londonWeather = JSON.parse(londonWeatherJson);
const nycTemp = nycWeather.current_weather.temperature;
const londonTemp = londonWeather.current_weather.temperature;

console.log(`NYC: ${nycTemp}°C | | London: ${londonTemp}°C`);
console.log(
	`The warmer city is ${nycTemp > londonTemp ? 'New York' : 'London'}`,
);
// ----------------------------------------------------------
// TASK 7 — Status code scenario matching
// ----------------------------------------------------------
// For each scenario below, write the most likely status code
// AND a brief explanation. Write your answers as comments.
//
// Scenario 1: You request /users/9999 but no user has that id.
// Code + reason: 200 OK but no data returned because the request has a valid format
//
// Scenario 2: You try to delete a post but you're not logged in.
// Code + reason: 401 Unauthorized because your not logged in and dont have a valid token
//
// Scenario 3: You create a new post successfully.
// Code + reason: 201 Created because a new post was successfully created
//
// Scenario 4: You send a POST request with a required field missing.
// Code + reason: 400 Bad Request because the data is missing fields
//
// Scenario 5: You request /posts and get back a list of 100 posts.
// Code + reason: 200 OK because you recieved data back after a request
//
// Scenario 6: The API database server crashes while processing your request.
// Code + reason: 500 Internal Server Error because its a server side error

// ----------------------------------------------------------
// TASK 8 — Connect the dots: analyse user posts
// ----------------------------------------------------------
// This task combines everything:
// variables, functions, array methods, objects, and API data.
//
// Below is a mock response from /users/1 and /posts?userId=1
// (We use mocked data here so the task doesn't depend on
// copy-pasting — but the structure matches the real API exactly.)

const userMock = {
	id: 1,
	name: 'Leanne Graham',
	username: 'Bret',
	email: 'Sincere@april.biz',
	address: {
		street: 'Kulas Light',
		city: 'Gwenborough',
		zipcode: '92998-3874',
	},
	company: { name: 'Romaguera-Crona' },
};

const postsMock = [
	{
		userId: 1,
		id: 1,
		title: 'sunt aut facere repellat provident',
		body: 'quia et suscipit...',
	},
	{ userId: 1, id: 2, title: 'qui est esse', body: 'est rerum tempore...' },
	{
		userId: 1,
		id: 3,
		title: 'ea molestias quasi exercitationem',
		body: 'et iusto sed...',
	},
	{
		userId: 1,
		id: 4,
		title: 'eum et est occaecati',
		body: 'ullam et saepe...',
	},
	{
		userId: 1,
		id: 5,
		title: 'nesciunt quas odio',
		body: 'repudiandae veniam...',
	},
	{
		userId: 1,
		id: 6,
		title: 'dolorem eum magni eos aperiam laborum',
		body: 'ut aspernatur...',
	},
	{
		userId: 1,
		id: 7,
		title: 'magnam facilis autem',
		body: 'dolore placeat...',
	},
	{
		userId: 1,
		id: 8,
		title: 'dolorem dolore est ipsam',
		body: 'dignissimos aperiam...',
	},
	{
		userId: 1,
		id: 9,
		title: 'nesciunt iure omnis dolorem tempora',
		body: 'consectetur animi...',
	},
	{
		userId: 1,
		id: 10,
		title: 'optio molestias id quia eum',
		body: 'quo et expedita...',
	},
];

// Declare a function called analyseUser.
// Parameters: user (object), posts (array)
//
// Inside:
//   1. Log a profile header:
//      "=== " + user.name + " (@" + user.username + ") ==="
//
//   2. Log their location:
//      "📍 " + user.address.city
//
//   3. Log their company:
//      "🏢 " + user.company.name
//
//   4. Log their post count:
//      "📝 Posts: " + posts.length
//
//   5. Find the post with the shortest title (fewest characters)
//      and log: "Shortest title: " + shortestPost.title
//
//   6. Log all post titles using forEach:
//      "  • " + post.title
//
// Call analyseUser(userMock, postsMock)

function analyseUser(user, posts) {
	// 1. Log a profile header
	console.log(`=== ${user.name} (@${user.username}) ===`);
	// 2. Log their location
	console.log(`📍 ${user.address.city}`);
	// 3. Log their company
	console.log(`🏢 ${user.company.name}`);
	// 4. Log their post count
	console.log(`📝 Posts: ${posts.length}`);
	// 5. Find the post with the shortest title
	let shortestPost = posts.reduce((shortest, post) => {
		if (post.title.length < shortest.title.length) {
			return post;
		}
		return shortest;
	});

	console.log(`Shortest title: ${shortestPost.title}`);
	// 6. Log all post titles using foreach
	posts.forEach((p) => console.log(`  • ${p.title}`));
}

analyseUser(userMock, postsMock);

// ----------------------------------------------------------
// ⭐ STRETCH GOAL — URL parser
// ----------------------------------------------------------
// Declare a function called parseUrl.
// Parameter: url (string)
//
// Returns an object with:
//   {
//     base:   the part before the ?  (e.g. "https://api.example.com/posts")
//     params: an object of key-value pairs from the query string
//             (e.g. { userId: "1", _limit: "5" })
//   }
//
// Hints:
//   - url.includes("?") → check if there are params
//   - url.split("?") → splits into [base, queryString]
//   - queryString.split("&") → gives ["userId=1", "_limit=5"]
//   - Each pair.split("=") → gives ["userId", "1"]
//   - Build the params object using forEach
//
// Test it:
// parseUrl("https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5")
// → { base: "https://jsonplaceholder.typicode.com/posts", params: { userId: "1", _limit: "5" } }
//
// parseUrl("https://jsonplaceholder.typicode.com/users")
// → { base: "https://jsonplaceholder.typicode.com/users", params: {} }

function parseUrl(url) {
	const params = {};

	if (url.includes('?')) {
		const urlSplit = url.split('?');

		// 1. set base
		const base = urlSplit[0];

		// 2. set params
		const queryString = urlSplit[1]; // get query
		const pairs = queryString.split('&'); // split query into param key value pairs
		pairs.forEach((pair) => {
			const p = pair.split('=');
			params[p[0]] = p[1];
		});

		return {
			base,
			params,
		};
	} else {
		return {
			base: url,
			params,
		};
	}
}

console.log(
	parseUrl('https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5'),
);
console.log(parseUrl('https://jsonplaceholder.typicode.com/users'));
