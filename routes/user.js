const express = require('express');
const app = express();
const pool = require('../src/db');

const getUser = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addUser = (request, response) => {
    const { user_name, email, password, admin } = request.body
  
    pool.query('INSERT INTO orders (user_name, email, password, admin) VALUES ($1, $2, $3, $4)', [user_name, email, password, admin], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0]}`)
    })
  }

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
    }

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { user_name, email, password, admin } = request.body

    pool.query(
      'UPDATE users SET user_name = $1, email = $2, password = $3, admin = $4 WHERE user_id = $5',
      [user_name, email, password, admin],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}

app
    .route('/')
    // GET endpoint
    .get(getUser)
    // POST endpoint
    .post(addUser)

app
    .route('/:id')
    // GET by ID endpoint
    .get(getUserById)
    // PUT Eendpoint
    .put(updateUser)
    // DELETE Endpoint
    .delete(deleteUser)

module.exports = app;
