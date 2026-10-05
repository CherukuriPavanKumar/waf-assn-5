const express = require('express');

const app = express();
app.use(express.json());
app.use((request, response, next) => {
  console.log(`${new Date().toISOString()} ${request.method} ${request.originalUrl}`);
  next();
});
let nextId = 3;
const employees = [
  { id: 1, name: 'Ananya', department: 'Engineering' },
  { id: 2, name: 'Rohan', department: 'Design' }
];

app.get('/employees', (request, response) => response.json(employees));
app.get('/employees/:id', (request, response) => {
  const employee = employees.find((item) => item.id === Number(request.params.id));
  if (!employee) return response.status(404).json({ error: 'Employee not found' });
  return response.json(employee);
});
app.post('/employees', (request, response) => {
  const { name, department } = request.body;
  if (!name || !department) return response.status(400).json({ error: 'name and department are required' });
  const employee = { id: nextId++, name, department };
  employees.push(employee);
  return response.status(201).json(employee);
});
app.use((request, response) => response.status(404).json({ error: 'Route not found' }));

app.listen(5006, () => console.log('Question 9 API running on port 5006'));
