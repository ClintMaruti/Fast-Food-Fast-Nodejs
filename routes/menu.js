const express = require('express');
const app = express();
var pool = require('../src/db');

if ( process.env.NODE_ENV === 'test' ) { 
  pool = require('../src/db_test');  
}

const getMenu = (request, response) => {
  pool.query('SELECT * FROM menu', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addMenu = (request, response) => {
    const { name, price, description } = request.body
  
    pool.query('INSERT INTO menu (name, price, description) VALUES ($1, $2, $3, $4)', [name, price, description ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Menu added with ID: ${results.rows[0]}`)
    })
  }

const getMenuById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM menu WHERE menu_id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
    }

const updateMenu = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, price, description } = request.body

    pool.query(
      'UPDATE menu SET name = $1, price = $2, description = $3 WHERE menu_id = $4',
      [name, price, description, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Menu modified with ID: ${id}`)
      }
    )
}

const deleteMenu = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM menu WHERE menu_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Menu deleted with ID: ${id}`)
    })
}

app
    .route('/')
    // GET endpoint
    .get(getMenu)
    // POST endpoint
    .post(addMenu)

app
    .route('/:id')
    // GET by ID endpoint
    .get(getMenuById)
    // PUT Eendpoint
    .put(updateMenu)
    // DELETE Endpoint
    .delete(deleteMenu)

module.exports = app;
