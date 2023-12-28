import { Knex } from "knex";
import postTopics from "./01-post-topics.json";

async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("post_topics").del();

	// Inserts seed entries
	await knex
		.raw("TRUNCATE TABLE post_topics RESTART IDENTITY CASCADE")
		.then(() => {
			return knex("post_topics").insert(postTopics);
		});
}

export { seed };
