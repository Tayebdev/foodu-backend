/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("menuItem", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description").nullable();
    table.float("price").notNullable();
    table.float("discountPrice").nullable();
    table.string("picture").notNullable();
    table.boolean("isAvailable").defaultTo(true);
    table.integer("prepTimeMinutes").notNullable();
    table
      .integer("menuCategoryId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("menuCategory")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
