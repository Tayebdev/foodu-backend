exports.up = function (knex) {
  return knex.schema.createTable("vehicle", function (table) {
    table.increments("id").unsigned().primary();
    table.string("plateNumber").notNullable();
    table.string("model").notNullable();
    table.integer("driverId").unsigned().notNullable();
    table
      .enum("type", ["bike", "ElectricBicycle", "Motorcycle", "Scooter"])
      .defaultTo("bike");

    table
      .foreign("driverId")
      .references("id")
      .inTable("driver")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("vehicle");
};
