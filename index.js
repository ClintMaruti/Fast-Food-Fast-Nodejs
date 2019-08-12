const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoute = require('./routes/orders');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// Orders route
app.use('/orders', orderRoute);

app.get('/', (req,res) => {
    res.send("This is Home Page");
})

const PORT =    process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));