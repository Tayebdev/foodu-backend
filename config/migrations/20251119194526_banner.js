/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("banner", function (table) {
    table.increments("id").primary();
    table.string("picture").notNullable();
    table.string("title").notNullable();
    table.string("actionUrl").notNullable();
    table.boolean("isActive").defaultTo(false);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("banner");
};
