/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table('share', function (table) {
    table.renameColumn('start_date', 'start_at');
    table.renameColumn('end_date', 'end_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table('share', function (table) {
    table.renameColumn('start_at', 'start_date');
    table.renameColumn('end_at', 'end_date');
  });
};
