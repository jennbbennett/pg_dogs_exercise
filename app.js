var Express = require('express');
var app = Express();
var api = require('./api');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:false}));



app.get('/dogs', function(req, res){
  api.dogs.read()
  .then(function (results){
    res.json(results);
  });
});

app.post('/dog', function(req, res){
  api.dog.create(req.body.name)
  .then(function (results){
    res.json(results);
  });
});

app.get('/dog/:id', function(req, res){
  api.dog.read(req.params.id)
  .then(function (results){
    res.json(results);
  });
});

app.put('/dog/:id', function(req, res){
  api.dog.update(req.params.id, req.body.name)
  .then(function (results){
    res.json(results);
  });
});

app.delete('/dog/:name', function(req, res){
  api.dog.delete(req.params.name)
  .then(function(results){
    res.json(results);
  });
});


app.listen(8080, function(){
  console.log('Listening on port 8080');
});
