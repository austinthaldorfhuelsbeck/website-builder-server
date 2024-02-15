import postTopics from "./01-post-topics.json";

export const seed = async (knex) => {
	// Deletes ALL existing entries
	await knex("post_topics").del();

	// Inserts seed entries
	await knex
		.raw("TRUNCATE TABLE post_topics RESTART IDENTITY CASCADE")
		.then(() => {
			return knex("post_topics").insert(postTopics);
		});
};
