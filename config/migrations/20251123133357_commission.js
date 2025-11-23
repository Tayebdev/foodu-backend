/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("commission", function (table) {
    table.increments("id").primary();
    // Driver OR Restaurant
    table.enum("entityType", ["Driver", "Restaurant"]).notNullable();
    // ID of driver OR restaurant
    table.integer("entityId").unsigned().notNullable();
    // Amount due
    table.float("amountDue").notNullable().defaultTo(0.0);
    table
      .enum("status", ["Pending", "Paid", "Overdue", "Blocked"])
      .defaultTo("Pending");

    table.date("dueDate").notNullable();
    table.date("paidAt").nullable();

    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("commission");
};
