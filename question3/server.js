const express = require('express');

const app = express();

app.get('/', (request, response) => response.send('Welcome to ExpressJS'));
app.get('/about', (request, response) => response.send('NodeJS Laboratory'));
app.use((request, response) => response.status(404).send('Route not found'));

app.listen(5000, () => console.log('Express server running at http://localhost:5000'));
