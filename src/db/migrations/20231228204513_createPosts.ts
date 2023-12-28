import type { Knex } from "knex";

async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("posts", function (table) {
		table.bigInteger("post_id").primary().notNullable();
		table
			.bigInteger("post_category_id")
			.references("post_category_id")
			.inTable("post_categories");
		table
			.bigInteger("post_topic_id")
			.references("post_topic_id")
			.inTable("post_topics");
		table.boolean("featured").defaultTo(false);
		table.string("title", 255).notNullable();
		table.string("img", 255);
		table.string("text", 1024);
		table.string("content", 16384);
		table.string("audio", 1024);
		table.string("video", 1024);
		table.string("url", 1024);
		table.timestamps(true, true);
	});
}

async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("posts");
}

export { up, down };
