export const up = async (knex) =>
	knex.schema.createTable("post_categories", (table) => {
		table.bigInteger("post_category_id").primary().notNullable();
		table.string("label", 255).notNullable();
		table.string("text", 1024).defaultTo("");
		table.timestamps(true, true);
	});

export const down = async (knex) => knex.schema.dropTable("post_categories");
