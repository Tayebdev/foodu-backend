/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("menuItem", function(table) {
    table.increments("id").primary();        
    table.integer("categoryId").unsigned().notNullable();
    table.string("name").notNullable();
    table.text("description").nullable();
    table.float("price").notNullable().defaultTo(0.0);
    table.string("picture").nullable();
    table.boolean("isAvailable").defaultTo(true);
    table.integer("prepTimeMinutes").defaultTo(0);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());

    table
      .foreign("categoryId")
      .references("id")
      .inTable("menuCategory")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("menuItem");
};
