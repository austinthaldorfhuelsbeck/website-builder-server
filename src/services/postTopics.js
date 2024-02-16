import knex from "../db/connection.js";

const list = async () => knex("post_topics").select("*").orderBy("label");

const search = async (query) =>
	knex("post_topics")
		.where(
			"label",
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}`,
		)
		.orWhere(
			"text",
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}`,
		)
		.orderBy("updated_at");

const create = async (postTopic) =>
	knex("post_topics")
		.insert(postTopic)
		.returning("*")
		.then((newTopics) => newTopics[0]);

const read = async (id) =>
	knex("post_topics").select("*").where({ post_topic_id: id }).first();

const update = async (postTopic, id) =>
	knex("post_topics")
		.select("*")
		.where({ post_topic_id: id })
		.update(postTopic, "*")
		.then((updatedTopics) => updatedTopics[0]);

const destroy = async (id) =>
	knex("post_topics").where({ post_topic_id: id }).del();

// Module exports
const PostTopicsService = {
	list,
	search,
	create,
	read,
	update,
	destroy,
};
export default PostTopicsService;
