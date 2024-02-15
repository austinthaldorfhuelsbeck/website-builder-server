import posts from "./02-posts.json";

export const seed = async (knex) => {
	// Deletes ALL existing entries
	await knex("posts").del();

	// Inserts seed entries
	await knex.raw("TRUNCATE TABLE posts RESTART IDENTITY CASCADE").then(() => {
		return knex("posts").insert(posts);
	});
};
