const mongoose = require('mongoose')

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
}, () => {
    console.log("Connected to the db!");
});