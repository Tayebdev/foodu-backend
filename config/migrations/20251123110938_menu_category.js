/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("menuCategory", function (table) {
    table.increments("id").primary();
    table.integer("restaurantId").unsigned().notNullable();
    table.string("name").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());

    table
      .foreign("restaurantId")
      .references("id")
      .inTable("restaurant")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("menuCategory");
};
