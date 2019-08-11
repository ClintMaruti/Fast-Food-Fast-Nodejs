# Fast Food Fast 

## API Endpoints

| EndPoint                      | Functionality                                 |
| ----------------------------- | --------------------------------------------- |
| POST /auth/signup             | Register a user.                              |
| POST /auth/login              | Login a user.                                 |
| POST /users/orders            | Place an order for food.                      |
| GET /users/orders             | Get the order history for a particular user.  |
| GET /orders/                  | Get all orders.                               |
| GET /orders/<orderId>         | Add a specific order.                         |
| PUT /orders/<orderId>         | Update the status of an order                 |
| GET /menu                     | Get available menu.                           |
| PUT /menu                     | Add a meal option to the menu.                |