/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("searchHistory", function (table) {
    table.increments("id").primary();
    table.string("query").nullable();
    table.integer("clientId").unsigned().notNullable();

    table.timestamp("searchedAt").defaultTo(knex.fn.now()).notNullable();

    table
      .foreign("clientId")
      .references("id")
      .inTable("client")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("searchHistory");
};
