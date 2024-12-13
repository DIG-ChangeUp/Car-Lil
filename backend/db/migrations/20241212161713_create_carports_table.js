/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('carports', function (table) {
    table.increments('id').primary();
    table.integer('user_id')
    table.string('address', 64).notNullable()
    table.decimal('latitude', 18, 15).notNullable();
    table.decimal('longitude', 18, 15).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('carports');
};
