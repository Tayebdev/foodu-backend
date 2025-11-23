/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("restaurantSchedule", function (table) {
    table.increments("id").primary();
    table.integer("restaurantId").unsigned().notNullable();
    table.json("daysOfWeek").notNullable();
    table.time("openTime").nullable();
    table.time("closeTime").nullable();
    table.boolean("isClosed").defaultTo(false);

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
  return knex.schema.dropTableIfExists("restaurantSchedule");
};
