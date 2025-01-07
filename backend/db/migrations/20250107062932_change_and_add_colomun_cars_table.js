/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('cars', function (table) {
    table.renameColumn('photo_url', 'image1');
    table.string('image2');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('cars', function (table) {
    table.renameColumn('photo_url', 'image1');
    table.dropColumn('image2');
  });
};
