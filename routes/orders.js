const express = require('express');
const app = express();
const pool = require('../src/db');

const getOrders = (request, response) => {
  pool.query('SELECT * FROM orders', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addOrder = (request, response) => {
    const { name, price, quantity, status } = request.body
  
    pool.query('INSERT INTO orders (name, price, quantity, status) VALUES ($1, $2, $3, $4)', [name, price, quantity, status], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0]}`)
    })
  }

app
  .route('/')
  // GET endpoint
  .get(getOrders)
    // POST endpoint
    .post(addOrder)
  
module.exports = app;
