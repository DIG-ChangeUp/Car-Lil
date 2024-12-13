/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('cars', function (table) {
    table.increments('id').primary();
    table.string('car_name', 64).notNullable();
    table.string('maker', 64).notNullable()
    table.string('car_type').notNullable();
    table.string('photo_url').notNullable()
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('cars');
};
