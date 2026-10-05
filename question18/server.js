const express = require('express');

const app = express();
app.use(express.json());
let nextId = 3;
let events = [
  { id: 1, title: 'Tech Symposium', date: '2026-11-15', venue: 'Main Auditorium' },
  { id: 2, title: 'Cultural Fest', date: '2026-12-02', venue: 'Open Ground' }
];

app.use((request, response, next) => {
  console.log(`${request.method} ${request.originalUrl}`);
  next();
});
app.get('/events', (request, response) => response.json(events));
app.get('/events/:id', (request, response) => {
  const event = events.find((item) => item.id === Number(request.params.id));
  if (!event) return response.status(404).json({ error: 'Event not found' });
  return response.json(event);
});
app.post('/events', (request, response) => {
  const { title, date, venue } = request.body;
  if (!title || !date || !venue) return response.status(400).json({ error: 'title, date, and venue are required' });
  const event = { id: nextId++, title, date, venue };
  events.push(event);
  return response.status(201).json(event);
});
app.put('/events/:id', (request, response) => {
  const event = events.find((item) => item.id === Number(request.params.id));
  if (!event) return response.status(404).json({ error: 'Event not found' });
  Object.assign(event, request.body);
  return response.json(event);
});
app.delete('/events/:id', (request, response) => {
  const eventIndex = events.findIndex((item) => item.id === Number(request.params.id));
  if (eventIndex === -1) return response.status(404).json({ error: 'Event not found' });
  const [deletedEvent] = events.splice(eventIndex, 1);
  return response.json({ message: 'Event deleted', event: deletedEvent });
});

app.listen(5015, () => console.log('Question 18 API running on port 5015'));
