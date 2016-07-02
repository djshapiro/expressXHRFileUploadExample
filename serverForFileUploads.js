var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

//set up express server
var app = express();

app.use(bodyParser.raw({limit: '50mb'}));

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('*', function(req, res, next){
    fs.writeFile('./copyoffile.mp3', req.body, function() {
        res.json('done!');
    });
});

//start the express server
var server = app.listen(3003, function() {
    //tell us the server has started
    var host = server.address().address;
    var port = server.address().port;
    console.log('File upload server listening at http://%s:%s', host, port);
});

