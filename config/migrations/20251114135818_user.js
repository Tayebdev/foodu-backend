/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("phone").notNullable().unique();
    table.string("password").notNullable();
    table.string("picture").nullable();
    table.boolean("IsActive").defaultTo(true);
    table.boolean("isBanned").defaultTo(false);
    table.boolean("verified").defaultTo(false);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table.timestamp("lastLogin").nullable();
    table
      .enum("role", ["Admin", "Client", "RestaurantOwner", "Driver"])
      .notNullable()
      .defaultTo("Client");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user");
};
