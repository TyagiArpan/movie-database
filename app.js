var express = require('express'),
	app     = express(),	
	request = require('request')

require('dotenv').config()

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('home'));

app.get('/results', function(req, res) {
    const omdb = "9d384702";
    var query = req.query.search;
    var url = 'http://www.omdbapi.com/?apikey='+omdb+'&s=' + query;

    request(url, function(error, response, body) {
        var data = JSON.parse(body)

        res.render('results', {data: data});
    });
});

app.get('*', (req, res) => res.send('Page NOT found!'));

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started");
  });