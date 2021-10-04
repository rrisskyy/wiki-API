const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});

const wikiSchema = mongoose.Schema({
    title:String,
    content:String
});

const Article = mongoose.model('Article', wikiSchema)



app.get('/articles', (req, res) => {
    Article.find({}, (err, articlesFound) => {
        res.send(articlesFound);
    })
})

app.post('/articles', (req, res) => {
    const newArticle = new Article ({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(err => {
        if(err) {
            res.send(err);
        } else {
            res.send("Sukses menambahkan item!");
        }
    });
})

app.delete('/articles', (req, res) => {
    Article.deleteMany({}, (err) => {
        if(err){
            res.send("Berhasil Menghapus Item!")
        } else {
            res.send(err)
        }
    })
})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server start at port 3000");
});