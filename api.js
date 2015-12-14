var pg = require('pg');

var connectionString = 'postgres://localhost/pets';

function runQuery(query, parameters) {
  return new Promise(function(resolve, reject) {
    pg.connect(connectionString, function(err, client, done) {
      if (err) {
        console.error(err);
        reject(err);
        done();
        return;
      }
      client.query(query, parameters, function(err, results) {
        done();
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  });
}

module.exports = {
  dogs: {
    read: function() {
      return runQuery('SELECT * FROM dog');
    }
  },

  dog: {
    create: function(name) {
      return runQuery('INSERT INTO dog VALUES(default, $1);', [name]);
    },
      read: function(id){
      return runQuery('SELECT * FROM dog WHERE dog.id=$1;', [id]);
    },
      update: function(id, name){
        return runQuery('UPDATE dog SET name=$2 WHERE dog.id=$1;', [id, name]);
      },
    'delete': function(id){
      return runQuery('DELETE FROM dog WHERE dog.id=$1;', [id]);
    },
  },
};
