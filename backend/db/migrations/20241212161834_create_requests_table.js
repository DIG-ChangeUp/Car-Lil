/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('requests', function (table) {
    table.increments('id').primary();
    table.integer('user_id')
    table.decimal('latitude', 18, 15).notNullable();
    table.decimal('longitude', 18, 15).notNullable();
    table.string('message', 256)
    table.timestamp('created_at').notNullable()

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('requests');
};
