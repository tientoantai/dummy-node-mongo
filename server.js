const express = require('express');

const bodyParser= require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://localhost:27017/test', (err, database) => {
  if (err) return console.log(err)
  dbCollection = database.collection('book');
  
	app.get('/', function(req, res){
		dbCollection.find().toArray((err, result) => {
		    if (err) return console.log(err)
		    	console.log(result);
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

	    console.log(result)
	    res.redirect('/')
	  })
	});

  app.listen(1234, () => {
  

  })
})
