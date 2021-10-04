const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');



mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});

const wikiSchema = mongoose.Schema({
    title:string,
    content:string
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server start at port 3000");
});