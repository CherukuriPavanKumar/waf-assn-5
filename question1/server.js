const http = require('http');

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'text/plain');

  if (request.url === '/') {
    response.statusCode = 200;
    response.end('Welcome to NodeJS Lab');
    return;
  }

  if (request.url === '/time') {
    response.statusCode = 200;
    response.end(new Date().toString());
    return;
  }

  response.statusCode = 404;
  response.end('404 Page Not Found');
});

server.listen(3000, () => {
  console.log('NodeJS server running at http://localhost:3000');
});
