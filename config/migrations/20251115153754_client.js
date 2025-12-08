/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("client", function (table) {
    table.increments("id").primary();
    table.integer("userId").unsigned().notNullable();
    table.integer("loyaltyPoints").defaultTo(0);
    table.integer("totalOrders").defaultTo(0);
    table.float("totalSpent").defaultTo(0);
    table.json("favoriteRestaurants").nullable();

    table
      .foreign("userId")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("client");
};
