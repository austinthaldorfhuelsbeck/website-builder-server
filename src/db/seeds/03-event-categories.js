import eventCategories from "./03-event-categories.json";

export const seed = async (knex) => {
	// Deletes ALL existing entries
	await knex("event_categories").del();

	// Inserts seed entries
	await knex
		.raw("TRUNCATE TABLE event_categories RESTART IDENTITY CASCADE")
		.then(() => {
			return knex("event_categories").insert(eventCategories);
		});
};
