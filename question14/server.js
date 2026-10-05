const express = require('express');

const app = express();

app.get('/', (request, response) => response.send('<h1>Home</h1><p>Welcome to the NodeJS web server.</p>'));
app.get('/about', (request, response) => response.send('<h1>About</h1><p>This server demonstrates Express routes.</p>'));
app.get('/contact', (request, response) => response.send('<h1>Contact</h1><p>Email: lab@example.com</p>'));
app.use((request, response) => response.status(404).send('Page not found'));

app.listen(5011, () => console.log('Question 14 server running on port 5011'));
