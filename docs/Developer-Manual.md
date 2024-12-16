How to install our application and all dependencies:
- install necessary npm modules 
    - nodemon 
    - supabase 
- ensure vercel is located properly

How to run our application on a server:
- ensure node.js is installed 
- ensure correct port (3000)
- remember npm start, npm run commands

How to run any tests:
We have a total of 4 tests included in our test.js file. These tests run on the about us, breeds list, favorites, and home page software. Each test has a comment indicating what it is testing and other important information. To run our tests follow these steps: 
1. Confirm that Node.js and npm are installed on your system ()
2. Install Jest and related testing libraries: npm install --save-dev jest @testing-library/dom @testing-library/jest-dom
3. Run all tests: npm test

API endpoints:
- GET http://localhost:3000/customers: Gets list of customers first & last names and emails
- POST http://localhost:3000/customer: Allows user to input first & last names and emails to database

