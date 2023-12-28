import type { Knex } from "knex";

async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("post_categories", function (table) {
		table.bigInteger("post_category_id").primary().notNullable();
		table.string("label", 255).notNullable();
		table.string("text", 1024).defaultTo("");
		table.timestamps(true, true);
	});
}

async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("post_categories");
}

export { up, down };
