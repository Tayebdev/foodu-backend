/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("restaurant", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("picture").notNullable();
    table.string("bannerUrl").nullable();
    table.string("phone").notNullable();
    table.string("email").nullable();
    table.string("wilaya").notNullable();
    table.string("commune").notNullable();
    table.string("address").notNullable();
    table.decimal("latitude", 30).nullable();
    table.decimal("longitude", 30).nullable();
    table.float("rating").notNullable().defaultTo(0);
    table.integer("totalRatings").notNullable().defaultTo(0);
    table.float("commissionRate").notNullable().defaultTo(0);
    table.float("deliveryRadius").notNullable().defaultTo(0);
    table.float("minOrderAmount").notNullable().defaultTo(0);
    table.integer("avgDeliveryTime").notNullable().defaultTo(0);
    table.boolean("isBlocked").notNullable().defaultTo(false);
    table.boolean("isFeatured").notNullable().defaultTo(false);
    table.boolean("acceptsCOD").notNullable().defaultTo(true);
    table.timestamps(true, true);
    table
      .integer("ownerId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("restaurantOwner")
      .onDelete("CASCADE");
    table
      .enum("status", ["Active", "Closed", "Suspended", "PendingApproval"])
      .notNullable()
      .defaultTo("PendingApproval");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("restaurant");
};
