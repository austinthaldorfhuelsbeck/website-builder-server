export const up = async (knex) =>
	knex.schema.createTable("posts", (table) => {
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
		table.string("label", 255).notNullable();
		table.string("img", 255);
		table.string("text", 1024);
		table.string("content", 16384);
		table.string("audio", 1024);
		table.string("video", 1024);
		table.string("url", 1024);
		table.timestamps(true, true);
	});

export const down = async (knex) => knex.schema.dropTable("posts");
