const express = require('express');

const app = express();
app.use(express.json());
let nextId = 3;
let products = [
  { id: 1, name: 'Notebook', price: 80 },
  { id: 2, name: 'Pen', price: 20 }
];

app.get('/products', (request, response) => response.json(products));
app.get('/products/:id', (request, response) => {
  const product = products.find((item) => item.id === Number(request.params.id));
  if (!product) return response.status(404).json({ error: 'Product not found' });
  return response.json(product);
});
app.post('/products', (request, response) => {
  const { name, price } = request.body;
  if (!name || typeof price !== 'number') return response.status(400).json({ error: 'name and numeric price are required' });
  const product = { id: nextId++, name, price };
  products.push(product);
  return response.status(201).json(product);
});
app.put('/products/:id', (request, response) => {
  const product = products.find((item) => item.id === Number(request.params.id));
  if (!product) return response.status(404).json({ error: 'Product not found' });
  const { name, price } = request.body;
  if (name !== undefined) product.name = name;
  if (price !== undefined) {
    if (typeof price !== 'number') return response.status(400).json({ error: 'price must be numeric' });
    product.price = price;
  }
  return response.json(product);
});
app.delete('/products/:id', (request, response) => {
  const productIndex = products.findIndex((item) => item.id === Number(request.params.id));
  if (productIndex === -1) return response.status(404).json({ error: 'Product not found' });
  const [deletedProduct] = products.splice(productIndex, 1);
  return response.json({ message: 'Product deleted', product: deletedProduct });
});
app.use((request, response) => response.status(404).json({ error: 'Route not found' }));

app.listen(5007, () => console.log('Question 10 API running on port 5007'));
