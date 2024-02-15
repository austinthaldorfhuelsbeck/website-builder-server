import events from "./04-events.json";

export const seed = async (knex) => {
	// Deletes ALL existing entries
	await knex("events").del();

	// Inserts seed entries
	await knex
		.raw("TRUNCATE TABLE events RESTART IDENTITY CASCADE")
		.then(() => {
			return knex("events").insert(events);
		});
};
