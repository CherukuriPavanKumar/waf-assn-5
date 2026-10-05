const express = require('express');

const app = express();
app.use(express.json());
let nextId = 3;
let students = [
  { id: 1, name: 'Aarav', branch: 'CSE', semester: 4 },
  { id: 2, name: 'Diya', branch: 'ECE', semester: 6 }
];

app.get('/students', (request, response) => response.json(students));
app.get('/students/:id', (request, response) => {
  const student = students.find((item) => item.id === Number(request.params.id));
  if (!student) return response.status(404).json({ error: 'Student not found' });
  return response.json(student);
});
app.post('/students', (request, response) => {
  const { name, branch, semester } = request.body;
  if (!name || !branch || semester === undefined) return response.status(400).json({ error: 'name, branch, and semester are required' });
  const student = { id: nextId++, name, branch, semester };
  students.push(student);
  return response.status(201).json(student);
});
app.put('/students/:id', (request, response) => {
  const student = students.find((item) => item.id === Number(request.params.id));
  if (!student) return response.status(404).json({ error: 'Student not found' });
  Object.assign(student, request.body);
  return response.json(student);
});
app.delete('/students/:id', (request, response) => {
  const studentIndex = students.findIndex((item) => item.id === Number(request.params.id));
  if (studentIndex === -1) return response.status(404).json({ error: 'Student not found' });
  const [deletedStudent] = students.splice(studentIndex, 1);
  return response.json({ message: 'Student deleted', student: deletedStudent });
});

app.listen(5014, () => console.log('Question 17 API running on port 5014'));
