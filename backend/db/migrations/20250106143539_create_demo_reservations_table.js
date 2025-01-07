/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('demo_reservations', function (table) {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('share_car_id');
    table.integer('carport_id');
    table.string('share_state').notNullable();
    table.timestamp('reserved_at').notNullable();
    table.timestamp('rent_at').notNullable();
    table.timestamp('rented_at');
    table.timestamp('return_at').notNullable();
    table.timestamp('returned_at');
    table.string('evaluation');
    table.boolean('is_refueled');
    table.boolean('is_washed');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('demo_reservations');
};
