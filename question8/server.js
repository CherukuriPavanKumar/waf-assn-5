const express = require('express');

const app = express();
app.use(express.json());
let nextId = 3;
let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: 'Clean Code', author: 'Robert C. Martin' }
];

app.get('/books', (request, response) => response.json(books));
app.post('/books', (request, response) => {
  const { title, author } = request.body;
  if (!title || !author) return response.status(400).json({ error: 'title and author are required' });
  const book = { id: nextId++, title, author };
  books.push(book);
  return response.status(201).json(book);
});
app.put('/books/:id', (request, response) => {
  const book = books.find((item) => item.id === Number(request.params.id));
  if (!book) return response.status(404).json({ error: 'Book not found' });
  const { title, author } = request.body;
  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  return response.json(book);
});
app.delete('/books/:id', (request, response) => {
  const bookIndex = books.findIndex((item) => item.id === Number(request.params.id));
  if (bookIndex === -1) return response.status(404).json({ error: 'Book not found' });
  const [deletedBook] = books.splice(bookIndex, 1);
  return response.json({ message: 'Book deleted', book: deletedBook });
});

app.listen(5005, () => console.log('Question 8 API running on port 5005'));
