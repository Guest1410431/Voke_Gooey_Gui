var express = require('express');
var bodyParser = require('body-parser')
var expressValidator = require('express-validator');

var session;
var app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator()); 

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use('/assets', express.static(__dirname + "/public"));

//Page links
app.get('/', function(request, response){
    response.render('index');   
});

app.post('/sendMessage', function(request, response){
    request.checkBody('message', '').notEmpty();
    request.sanitizeBody('message').escape();
    
    if(!request.validationErrors()){
        var message_string = request.body.message;
        console.log('message: ' + request.body.message);
    }
});
app.listen(8080, '0.0.0.0', function(){
    console.log("Connected successfully to port 8080");
});

















