import postCategories from "./00-post-categories.json";

export const seed = async (knex) => {
	// Deletes ALL existing entries
	await knex("post_categories").del();

	// Inserts seed entries
	await knex
		.raw("TRUNCATE TABLE post_categories RESTART IDENTITY CASCADE")
		.then(() => {
			return knex("post_categories").insert(postCategories);
		});
};
