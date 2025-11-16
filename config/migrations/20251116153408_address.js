/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("address", function (table) {
    table.increments("id").primary();
    table.integer("clientId").unsigned().notNullable();
    table.string("label").notNullable();
    table.string("wilaya").notNullable();
    table.string("commune").notNullable();
    table.float("latitude").notNullable();
    table.float("longitude").notNullable();
    table.string("street").notNullable();

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
  return knex.schema.dropTableIfExists("address");
};
