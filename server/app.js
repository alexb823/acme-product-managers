const express = require('express');
const path = require('path');
const { User, Product } = require('./db');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'src/index.html'));
});

app.get('/api/users', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

app.put('/api/products/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(product => product.update(req.body))
    .then(product => res.send(product))
    .catch(next);
});

//handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error catching endware
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500);
  res.send(err.message || 'Internet server error!');
});

module.exports = app;
