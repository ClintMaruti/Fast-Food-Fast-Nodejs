const pg = require('pg');

const config = {
  user: 'postgres', //this is the db user credential
  database: 'fast_food',
  password: 'eastood0009',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

const createTables = () => {
    const tb1 = `CREATE TABLE IF NOT EXISTS 
        orders(
            order_id serial PRIMARY KEY,
            name VARCHAR NOT NULL,
            price REAL NOT NULL,
            quantity REAL NOT NULL,
            status VARCHAR NOT NULL,
            date TIMESTAMP
            )`;
    const tb2 = `CREATE TABLE IF NOT EXISTS 
        users(
            user_id SERIAL PRIMARY KEY NOT NULL,
            user_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            admin BOOLEAN NOT NULL
            )`;
    const tb3 = ` CREATE TABLE IF NOT EXISTS 
        menu(
            menu_id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            price REAL NOT NULL,
            description VARCHAR(255) NOT NULL,
            date TIMESTAMP
            )`;  
    const queries = [tb1, tb2, tb3];
        pool.query(tb1)
        .then((res) => {
          console.log(res);
          pool.end();
        })
        .catch((err) => {
          console.log(err);
          pool.end();
        });
        pool.query(tb2)
        .then((res) => {
          console.log(res);
          pool.end();
        })
        .catch((err) => {
          console.log(err);
          pool.end();
        });
        
        pool.query(tb3)
        .then((res) => {
          console.log(res);
          pool.end();
        })
        .catch((err) => {
          console.log(err);
          pool.end();
        });
                
  };

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
  
  
  //export pool and createTables to be accessible  from an where within the application
  module.exports = {
    createTables,
    pool,
  };
  
  require('make-runnable');