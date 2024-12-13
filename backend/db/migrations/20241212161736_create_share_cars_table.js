/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('share_cars', function (table) {
    table.increments('id').primary();
    table.integer('user_id')
    table.integer('car_id')
    table.integer('carport_id')
    table.integer('share_prise').notNullable();
    table.string('share_state')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('share_cars');
};
