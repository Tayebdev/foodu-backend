exports.up = function (knex) {
  return knex.schema.createTable("driver", function (table) {
    table.increments("id").primary();
    table.integer("userId").unsigned().notNullable();
    table.boolean("verified").defaultTo(false);
    table
      .enum("availability", ["Online", "Offline", "Busy"])
      .defaultTo("Offline");
    table.integer("totalTrips").defaultTo(0);
    table.float("rating").defaultTo(1);
    table.check("rating >= 1 AND rating <= 5");
    table.decimal("latitude", 30, 20).nullable();
    table.decimal("longitude", 30, 20).nullable();
    table.boolean("isBlocked").defaultTo("false");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());

    table
      .foreign("userId")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("driver");
};
