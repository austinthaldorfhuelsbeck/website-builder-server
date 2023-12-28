import type { Knex } from "knex";

async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("event_categories", function (table) {
		table.bigInteger("event_category_id").primary().notNullable();
		table.string("label", 255).notNullable();
		table.string("text", 1024).defaultTo("");
		table.timestamps(true, true);
	});
}

async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("event_categories");
}

export { up, down };
