var express = require('express');

var session;
var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use('/assets', express.static(__dirname + "/public"));

//Page links
app.get('/', function(request, response){
    response.render('index');
});

app.listen(8080, '0.0.0.0', function(){
    console.log("Connected successfully to port 8080") 
});

















