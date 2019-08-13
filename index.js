const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoute = require('./routes/orders');
const menuRoute = require('./routes/menu');
const userRoute = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// Orders route
app.use('/orders', orderRoute);
// Menu Route
app.use('/menu', menuRoute);
// User Route
app.use('/user', userRoute);

app.get('/', (req,res) => {
    res.send("This is Home Page");
})

const PORT =    process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));