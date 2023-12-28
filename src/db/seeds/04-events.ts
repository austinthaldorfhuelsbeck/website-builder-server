import { Knex } from "knex";
import events from "./04-events.json";

async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("events").del();

	// Inserts seed entries
	await knex
		.raw("TRUNCATE TABLE events RESTART IDENTITY CASCADE")
		.then(() => {
			return knex("events").insert(events);
		});
}

export { seed };
