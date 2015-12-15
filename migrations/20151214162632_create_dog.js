
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('dog', function(table){
  table.increments();
  table.string('name');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dog');
};
