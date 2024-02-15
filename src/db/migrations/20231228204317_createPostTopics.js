export const up = async (knex) =>
	knex.schema.createTable("post_topics", (table) => {
		table.bigInteger("post_topic_id").primary().notNullable();
		table.string("label", 255).notNullable();
		table.string("text", 1024).defaultTo("");
		table.string("hex", 16).defaultTo("#fff");
		table.timestamps(true, true);
	});

export const down = async (knex) => knex.schema.dropTable("post_topics");
