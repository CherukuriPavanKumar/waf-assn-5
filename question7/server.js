const express = require('express');

const app = express();
app.use(express.json());
let nextId = 3;
let students = [
  { id: 1, name: 'Aarav', branch: 'CSE' },
  { id: 2, name: 'Diya', branch: 'ECE' }
];

app.get('/students', (request, response) => response.json(students));
app.get('/students/:id', (request, response) => {
  const student = students.find((item) => item.id === Number(request.params.id));
  if (!student) return response.status(404).json({ error: 'Student not found' });
  return response.json(student);
});
app.post('/students', (request, response) => {
  const { name, branch } = request.body;
  if (!name || !branch) return response.status(400).json({ error: 'name and branch are required' });
  const student = { id: nextId++, name, branch };
  students.push(student);
  return response.status(201).json(student);
});

app.listen(5004, () => console.log('Question 7 API running on port 5004'));
