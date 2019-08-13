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

const getOrderById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM orders WHERE order_id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
    }  

app
    .route('/')
    // GET endpoint
    .get(getOrders)
    // POST endpoint
    .post(addOrder)

app
    .route('/:id')
    // GET endpoint
    .get(getOrderById)

module.exports = app;
