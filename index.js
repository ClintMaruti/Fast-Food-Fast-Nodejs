const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./src/db');

app.use(bodyParser.json());
app.get('/', (req,res) => {
    res.send("This is Home Page");
})

const PORT =    process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));