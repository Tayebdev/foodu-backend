/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("menuCategory", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description").nullable();
    table.string("picture").notNullable();
    table.integer("displayOrder").notNullable();
    table.boolean("isActive").notNullable().defaultTo(true);
    table
      .integer("restaurantId")
      .unsigned()
      .notNullable()
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
