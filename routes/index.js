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
		//=> call updateMarkers()	
        console.log('got to server');
        var results=[];
        var data = {category:category};
        console.log(data.category);
        var query = apiClient.query("SELECT * FROM hashtags WHERE category = '" + data.category + "'");
        console.log(query);
        
        query.on('row', function (row) { 
            results.push(row);
        });
        query.on('end', function(){
            return res.json(results);
        });
        
        
        // send resluts to updateMarkers()
});
