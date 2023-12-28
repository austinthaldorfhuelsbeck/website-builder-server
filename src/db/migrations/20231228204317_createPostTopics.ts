import type { Knex } from "knex";

async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("post_topics", function (table) {
		table.bigInteger("post_topic_id").primary().notNullable();
		table.string("label", 255).notNullable();
		table.string("text", 1024).defaultTo("");
		table.string("hex", 16).defaultTo("#fff");
		table.timestamps(true, true);
	});
}

async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("post_topics");
}

export { up, down };
