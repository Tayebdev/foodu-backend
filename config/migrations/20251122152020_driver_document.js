/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("driverDocument", function(table) {
    table.increments("id").primary();
    table.integer("driverId").unsigned().notNullable();
    table
      .enum("type", ["IDCard", "License", "VehiclePapers"])
      .notNullable();
    table.string("picture").notNullable();
    table.boolean("verified").defaultTo(false);
    table.timestamp("uploadedAt").defaultTo(knex.fn.now());

    table
      .foreign("driverId")
      .references("id")
      .inTable("driver")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("driverDocument");
};
