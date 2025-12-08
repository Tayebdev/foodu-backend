/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("admin", function (table) {
    table.increments("id").primary();
    table.specificType("permissions", "TEXT");
    table.json("lastActivityAt").nullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table
      .enum("level", ["SuperAdmin", "Moderator", "Support"])
      .notNullable()
      .defaultTo("Moderator");
    table
      .integer("userId")
      .unsigned()
      .notNullable()
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
  return knex.schema.dropTableIfExists("admin");
};
