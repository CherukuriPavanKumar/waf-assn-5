const express = require('express');

const app = express();

app.use((request, response, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${request.method} ${request.originalUrl} - ${timestamp}`);
  next();
});

app.get('/', (request, response) => response.send('Middleware demo home'));
app.get('/status', (request, response) => response.json({ status: 'ok' }));

app.listen(5002, () => console.log('Question 5 server running on port 5002'));
