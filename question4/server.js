const express = require('express');

const app = express();
const students = [
  { id: 1, name: 'Aarav', branch: 'CSE' },
  { id: 2, name: 'Diya', branch: 'ECE' },
  { id: 3, name: 'Kabir', branch: 'ISE' }
];

app.get('/students', (request, response) => response.json(students));
app.get('/students/:id', (request, response) => {
  const student = students.find((item) => item.id === Number(request.params.id));
  if (!student) return response.status(404).json({ error: 'Student not found' });
  return response.json(student);
});
app.get('/faculty', (request, response) => response.json([
  { name: 'Dr. Meera Rao', department: 'Computer Science' },
  { name: 'Prof. Arun Das', department: 'Electronics' }
]));
app.use((request, response) => response.status(404).json({ error: 'Invalid route' }));

app.listen(5001, () => console.log('Question 4 server running on port 5001'));
