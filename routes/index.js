var pg = require('pg');
var express = require('express');
var router = express.Router();
var credentials = require('../dbcredentials/credentials.js');
var apiClient = new pg.Client(credentials);


apiClient.on('notice', function(msg) {
    console.log("notice: %j", msg);
});

apiClient.on('error', function(error) {
    console.log(error);
});

apiClient.connect(function(err){
    if (err){
        return console.error('could not connect to postgres', err);
    }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('start', { title: 'Express' });
});

module.exports = router;


router.post('/api/filterOnCategory', function(req, res) {
        //=> Query is executed returning hashtags where category = input(the input is the category)
        console.log('got to server');
        var results=[];
        var data = req.body; //the body of the request contains the sent parameters(category)
        console.log(data);
        var query = apiClient.query("SELECT * FROM group1schema.tweets WHERE category = $$" + data.category + "$$");
        console.log(query);
        
        query.on('row', function (row) { 
        	console.log(row);
            results.push(row);
        });
        query.on('end', function(){
        	console.log(results);
            return res.json(results);
        });
        
});


router.post('/api/filterOnHashtag', function(req, res) {
        //=> Query is executed returning hashtags=input

        console.log('got to server');
        var results=[];
        var data = req.body; //the body of the request contains the sent parameters(hashtag)
        console.log(data);
        var query = apiClient.query("SELECT * FROM group1schema.tweets WHERE hashtag = $$" + data.hashtag + "$$");
        console.log(query);
        
        query.on('row', function (row) { 
        	console.log(row);
            results.push(row);
        });
        query.on('end', function(){
        	console.log(results);
            return res.json(results);
        });
        
});

router.post('/api/top5', function(req, res){
		//takes noting as input returning the names of the top 5 hashtags
		console.log('got to server');
		var results = [];
		var query = apiClient.query("SELECT * FROM(SELECT hashtag, count(*) as foo FROM group1schema.tweets GROUP BY hashtag) as moo ORDER BY foo desc limit 5");
		console.log(query);
		
		query.on('row', function(row){
			console.log(row);
			results.push(row);
		});
		
		query.on('end', function(){
        	console.log(results);
            return res.json(results);
        });
});

router.post('/api/top5distr', function(req, res){
		//takes noting as input returning the names of the top 5 hashtags
		console.log('got to server');
		var data = req.body;
		var results = [];
		var query = apiClient.query("SELECT * from (SELECT hashtag, count(*) as foo FROM(select * from group1schema.tweets AS tweet, group1schema.polygons AS polygon WHERE polygon.district=  $$"
		+ data.district + "$$ AND ST_CONTAINS(ST_GeomFromText(polygon.wkt), ST_MakePoint(tweet.latitude, tweet.longitude))=true) topfive GROUP BY hashtag) as moo ORDER BY foo DESC LIMIT 5");
		console.log(query);
		
		query.on('row', function(row){
			console.log(row);
			results.push(row);
		});
		
		query.on('end', function(){
        	console.log(results);
            return res.json(results);
        });
});