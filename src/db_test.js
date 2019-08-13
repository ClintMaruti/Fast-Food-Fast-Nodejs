require('dotenv').config()

const { Pool } = require('pg')
const isTest = process.env.NODE_ENV === 'test'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_TEST_DATABASE}`

const pool = new Pool({
  connectionString: isTest ? process.env.DATABASE_URL : connectionString,
  ssl: isTest,
})

module.exports = pool;
