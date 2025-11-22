/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("restaurantOwner", function (table) {
    table.increments("id").primary();
    table.integer("userId").unsigned().notNullable();
    table.boolean("verified").defaultTo(false);
    table.boolean("documentsVerified").defaultTo(false);
    table.string("picture").nullable();
    table.boolean("isActive").defaultTo(false);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());

    table
      .foreign("userId")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("restaurantOwner");
};
