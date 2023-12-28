import { Knex } from "knex";
import posts from "./02-posts.json";

async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("posts").del();

	// Inserts seed entries
	await knex.raw("TRUNCATE TABLE posts RESTART IDENTITY CASCADE").then(() => {
		return knex("posts").insert(posts);
	});
}

export { seed };
