export const up = async (knex) =>
	knex.schema.createTable("event_categories", (table) => {
		table.bigInteger("event_category_id").primary().notNullable();
		table.string("label", 255).notNullable();
		table.string("text", 1024).defaultTo("");
		table.timestamps(true, true);
	});

export const down = async (knex) => knex.schema.dropTable("event_categories");
