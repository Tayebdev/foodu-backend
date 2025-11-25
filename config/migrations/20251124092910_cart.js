/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cart", function (table) {
    table.increments("id").primary();
    table.integer("clientId").unsigned().notNullable();
    table.integer("restaurantId").unsigned().notNullable();
    table.float("total").notNullable().defaultTo(0.0);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table
      .foreign("clientId")
      .references("id")
      .inTable("client")
      .onDelete("CASCADE");
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
  return knex.schema.dropTableIfExists("cart");
};
