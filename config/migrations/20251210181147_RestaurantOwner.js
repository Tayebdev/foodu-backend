/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("restaurantOwner", function (table) {
    table.increments("id").primary();
    table.boolean('verified').notNullable().defaultTo(false);
    table.boolean('documentsVerified').notNullable().defaultTo(false);
    table.boolean('isActive').notNullable().defaultTo(true);

    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("restaurantOwner");
};
