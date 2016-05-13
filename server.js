function encode(str, shift) {
    if (!shift) {shift = 1}
    str = str.toString().split('');
    
    for(var i = 0, curCharCode, shfCharCode; i < str.length; i++) {
    
        curCharCode = str[i].charCodeAt(0);
        shfCharCode = curCharCode + shift;
        
        if (curCharCode >= 48 && curCharCode <= 57) { //0-9
            if (shfCharCode < 48) {shfCharCode += 10}
            else if (shfCharCode > 57) {shfCharCode -= 10}
        }
        else if (curCharCode >= 65 && curCharCode <= 90) { //A-Z
            if (shfCharCode < 65) {shfCharCode += 26}
            else if (shfCharCode > 90) {shfCharCode -= 26}
        }
        else if (curCharCode >= 97 && curCharCode <= 122) { //a-z
            if (shfCharCode < 97) {shfCharCode += 26}
            else if (shfCharCode > 122) {shfCharCode -= 26}
        }
        else { //other
            shfCharCode = curCharCode;
        }
        
        str[i] = String.fromCharCode(shfCharCode);
    }
    return str.join('');
}

var express = require("express"),
        app = express(),
       path = require("path"),
        pug = require("pug");
        
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './public');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    
  res.render('index', {home: true});
    
});

app.get('/favicon.ico', function(req, res) {
  
  res.end('no! go away!');
  
});

app.get('/msg/:DATA', function(req, res){
    
  var data = req.params.DATA;
  var message = encode(decodeURIComponent(data), -3);

  console.log('***', req.connection.remoteAddress, '- responded with message:', message, '***');
  
  res.render('index', {home: false, resp: message});
  
});

app.use(function(req, res) {
    res.status(404).end('(404) Opps, seems you have got a little lost! There is nothing here.');
});

app.listen(process.env.PORT, function(){
  console.log('App now live and running on port:', process.env.PORT);
});