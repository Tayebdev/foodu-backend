/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("driver", function (table) {
    table.increments("id").primary();
    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.boolean("verified").notNullable().defaultTo(false);
    table
      .enum("availability", ["Online", "Offline", "Busy"])
      .notNullable()
      .defaultTo("Offline");
    table.integer("totalTrips").notNullable().defaultTo(0);
    table.integer("completedTrips").notNullable().defaultTo(0);
    table.integer("cancelledTrips").notNullable().defaultTo(0);
    table.float("rating").notNullable().defaultTo(0);
    table.float("currentLatitude").nullable();
    table.float("currentLongitude").nullable();
    table.timestamp("lastLocationUpdate").nullable();
    table.boolean("isBlocked").notNullable().defaultTo(false);
    table.float("cashOnHand").notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("driver");
};
