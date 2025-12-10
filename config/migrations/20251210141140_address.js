/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("address", function (table) {
    table.increments("id").primary();
    table.integer("clientId").unsigned();
    table.string("label").notNullable();
    table.string("street").notNullable();
    table.string("building").notNullable();
    table.string("floor").nullable();
    table.string("apartment").nullable();
    table.string("wilaya").notNullable();
    table.string("commune").notNullable();
    table.string("postalCode").notNullable();
    table.decimal("latitude",30).nullable();
    table.decimal("longitude",30).nullable();
    table.string("details").nullable();
    table.boolean("isDefault").defaultTo(false);

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
