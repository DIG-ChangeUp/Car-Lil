/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('demo_share', function (table) {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('carport_id');
    table.integer('share_car_id');
    table.timestamp('start_date').notNullable();
    table.timestamp('end_date').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('demo_share');
};
