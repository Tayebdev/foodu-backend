/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("restaurantPayout", function (table) {
    table.increments("id").primary();
    table.integer("restaurantId").unsigned().notNullable();
    table.integer("driverId").unsigned().nullable();
    table.float("totalSales").notNullable().defaultTo(0.0);
    table.float("commissionRate").notNullable().defaultTo(0.0);
    table.float("commissionAmount").notNullable().defaultTo(0.0);
    table.float("netAmount").notNullable().defaultTo(0.0);
    table
      .enum("status", ["Pending", "Sent", "Failed", "InTransit"])
      .notNullable()
      .defaultTo("Pending");
    table.date("periodStart").notNullable();
    table.date("periodEnd").notNullable();
    table.timestamp("sentAt").nullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());

    table
      .foreign("restaurantId")
      .references("id")
      .inTable("restaurant")
      .onDelete("CASCADE");

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
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("restaurantPayout");
};
