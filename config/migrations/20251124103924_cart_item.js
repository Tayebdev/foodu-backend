/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cartItem", function (table) {
    table.increments("id").primary();
    table.integer("cartId").unsigned().notNullable();
    table.integer("menuItemId").unsigned().notNullable();
    table.integer("quantity").unsigned().notNullable().defaultTo(1);
    table.float("subtotal").notNullable().defaultTo(0.0);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table
      .foreign("cartId")
      .references("id")
      .inTable("cart")
      .onDelete("CASCADE");

    table
      .foreign("menuItemId")
      .references("id")
      .inTable("menuItem")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cartItem");
};
