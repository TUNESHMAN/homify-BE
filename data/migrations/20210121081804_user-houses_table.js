exports.up = function (knex) {
  return knex.schema
    .createTable("users", (users) => {
      users.increments();
      users.string("username", 128).notNullable().unique();
      users.string("password", 128).notNullable();
      users.timestamp("created_at").defaultTo(knex.fn.now());
      users.string("email", 128).notNullable().unique();
      users.string("first_name", 128).notNullable();
      users.string("last_name", 128).notNullable();
      users.boolean("is_admin", 128).notNullable();
      users.boolean("is_agent", 128).notNullable();
      users.boolean("is_Landlord", 128).notNullable();
    })
    .createTable("houses", (house) => {
      house.increments();
      house.string("house_type", 128).notNullable();
      house.text("house_address", 128).notNullable();
      house.text("house_description", 128).notNullable();
      house.float("house_price", 128).notNullable();
      house.boolean("for_rent", 128).notNullable();
    //   house.integer("user_id").unsigned().notNullable().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("houses").dropTableIfExists("users");
};
