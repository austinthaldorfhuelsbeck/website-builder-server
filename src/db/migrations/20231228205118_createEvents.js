export const up = async (knex) =>
	knex.schema.createTable("events", (table) => {
		table.bigInteger("event_id").primary().notNullable();
		table
			.bigInteger("event_category_id")
			.references("event_category_id")
			.inTable("event_categories");
		table.date("date").notNullable();
		table.string("label", 255).notNullable();
		table.string("text", 1024);
		table.string("content", 16384);
		table.string("url", 1024);
		table.timestamps(true, true);
	});

export const down = async (knex) => knex.schema.dropTable("events");
