# Problem: Arbietnow doesnt permit cross-origin browser requests

## Cross origin browser requests

A cross-origin request happens when JavaScript running on one website tries to request data from a different origin. The browser has a security system called the Same-Origin Policy. By default, it prevents JavaScript from freely reading data from other origins.

For example,
suppose your vanilla HTML/JS app is running at:

```
http://localhost:5500
```

and your JavaScript does:

```
fetch("https://www.arbeitnow.com/api/job-board-api")
```

these are different origins:

```
Your website:
http://localhost:5500
  ↓
  ↓ cross-origin request
  ↓
Arbeitnow API:
https://www.arbeitnow.com
```

The browser has a security system called the Same-Origin Policy. By default, it prevents JavaScript from freely reading data from other origins.

## Why this didn't happen in Github Portfolio Tracker Project

Because the GitHub API sends a CORS header in its response allowing browser applications to access it. The browser sees that permission and allows Axios to give the response to your JavaScript.

```
Browser
  │
  │ GET https://api.github.com/users/damondinh/repos
  ▼
GitHub API
  │
  │ HTTP 200
  │ Access-Control-Allow-Origin: *
  ▼
Browser
  │
  │ ✓ CORS allows this
  ▼
Your JavaScript receives response.data
```

## Solution: CORS (Cross-Origin Resource Sharing)

By adding your own backend, your browser stops requesting the problematic API directly. Instead, your backend makes that request for you.

```
Browser
   |
   | Axios
   v
Your Backend
   |
   | HTTP request
   v
Arbeitnow API
```
