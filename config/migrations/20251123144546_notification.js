/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("notification", function (table) {
    table.increments("id").primary();
    table.integer("userId").unsigned().notNullable();
    table.string("title").notNullable();
    table.text("body").notNullable();
    table.boolean("isRead").defaultTo(false);
    table.timestamp("sentAt").defaultTo(knex.fn.now());
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
  return knex.schema.dropTableIfExists("notification");
};
