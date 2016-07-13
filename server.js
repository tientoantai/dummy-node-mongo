const express = require('express');

const bodyParser= require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

const mongo = require('mongodb');

const MongoClient = mongo.MongoClient

var db

MongoClient.connect('mongodb://localhost:27017/test', (err, database) => {
  if (err) return console.log(err)
  dbCollection = database.collection('book');
  
	app.get('/', function(req, res){
		dbCollection.find().toArray((err, result) => {
		    if (err) return console.log(err)
		    // renders index.ejs
		    res.render('home.ejs', {books: result})
  		})
	});

	app.get('/add-new', function(req, res){
		res.sendFile(__dirname +'/views/add-new.html');
	});

	app.post('/add',function(req, res){
		dbCollection.save(req.body, (err, result) => {
	    if (err) return console.log(err)
	    res.redirect('/')
	  })
	});

	app.get('/detail/:bookId', function(req, res){
		dbCollection.findOne({'_id': mongo.ObjectID(req.params.bookId)}, function(err, result){

		    if (err) return console.log(err)
		    // renders index.ejs
		    res.render('detal.ejs', {book: result})
  		})
	});

	app.get('/edit/:bookId', function(req, res){
		dbCollection.findOne({'_id': mongo.ObjectID(req.params.bookId)}, function(err, result){

		    if (err) return console.log(err)
		    // renders index.ejs
		    res.render('edit.ejs', {book: result})
  		})
	});

	app.post('/update/:bookId', function(req, res){
		dbCollection.updateOne({'_id': mongo.ObjectID(req.params.bookId)}, {$set:req.body}, (err, result) => {
		    if (err) return console.log(err)
		    res.redirect('/')
		})
	});

  app.listen(1234, () => {
  

  })
})
