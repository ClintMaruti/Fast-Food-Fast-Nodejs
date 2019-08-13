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

const updateOrder = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, price, quantity, status } = request.body

    pool.query(
      'UPDATE orders SET name = $1, price = $2, quantity = $3, status = $4 WHERE order_id = $5',
      [name, price, quantity, status, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

const deleteOrder = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM orders WHERE order_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
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
    // GET by ID endpoint
    .get(getOrderById)
    // PUT Eendpoint
    .put(updateOrder)
    // DELETE Endpoint
    .delete(deleteOrder)

module.exports = app;
