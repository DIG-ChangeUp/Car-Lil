/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { user_name: 'MaaSan', email: 'maasan@mail', user_type: "owner" }
  ]);
};
