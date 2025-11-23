/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("restaurant", function (table) {
    table.increments("id").primary();
    table.integer("ownerId").unsigned().notNullable();
    table.string("name").notNullable();
    table.string("logoUrl").nullable();
    table.string("phone").notNullable();
    table.string("wilaya").notNullable();
    table.string("commune").notNullable();
    table.string("address").notNullable();
    table.decimal("latitude", 30, 20).nullable();
    table.decimal("longitude", 30, 20).nullable();
    table.float("rating").defaultTo(1.0);
    table.check("rating >= 1 AND rating <= 5");
    table.enum("status", ["Active", "Closed", "Suspended"]).defaultTo("Active");
    table.float("commissionRate").defaultTo(10.0); // default 10%
    table.timestamp("createdAt").defaultTo(knex.fn.now());

    table
      .foreign("ownerId")
      .references("id")
      .inTable("restaurantOwner")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("restaurant");
};
