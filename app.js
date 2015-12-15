var Express = require('express');
var app = Express();
var api = require('./api');
var bodyParser = require('body-parser');
var knex = require('./db/knex');

function Dog() {
  return knex('dog');
}


app.use(bodyParser.urlencoded({extended:false}));


app.get('/dogs', function(req, res){
  Dog().select().then(function(result){
    res.json(result);
  });
});

app.post('/dogs', function(req, res){
  Dog().insert({
    name: req.body.name,
  }, 'id').then(function(result){
    res.json(result);
  });
});


app.get('/dogs/:id', function(req, res){
  Dog().where('id', req.params.id).first().then(function(result){
    res.json(result);
  });
});

app.put('/dogs/:id', function(req, res){
  Dog().where('id', req.params.id).update({
    name: req.body.name
  }).then(function(result){
    res.json(result);
  });
});

app.delete('/dogs/:id', function(req, res){
  Dog().where('id', req.params.id).del().then(function(result){
    res.json(result);
  });
});


app.listen(8080, function(){
  console.log('Listening on port 8080');
});
