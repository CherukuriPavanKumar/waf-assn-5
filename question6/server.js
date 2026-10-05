const express = require('express');

const app = express();

function requireAdmin(request, response, next) {
  if (request.query.role === 'admin') return next();
  return response.status(403).send('Access Denied');
}

app.get('/home', (request, response) => response.send('Welcome to Home'));
app.get('/dashboard', requireAdmin, (request, response) => response.send('Welcome to the admin dashboard'));

app.listen(5003, () => console.log('Question 6 server running on port 5003'));
