import knex from "../db/connection.js";

const list = async () =>
	knex("posts").select("*").orderBy("created_at", "desc");

const listCategory = async (id) =>
	knex("posts")
		.select("*")
		.where({ post_category_id: id })
		.orderBy("created_at", "desc");

const listTopic = async (id) =>
	knex("posts")
		.select("*")
		.where({ post_topic_id: id })
		.orderBy("created_at", "desc");

const create = async (post) =>
	knex("posts")
		.insert(post)
		.returning("*")
		.then((newPosts) => newPosts[0]);

const read = async (id) =>
	knex("posts").select("*").where({ post_id: id }).first();

const readFeatured = async () =>
	knex("posts").select("*").where({ featured: true }).first();

const update = async (post, id) =>
	knex("posts")
		.select("*")
		.where({ post_id: id })
		.update(post, "*")
		.then((updatedPosts) => updatedPosts[0]);

const destroy = async (id) => knex("posts").where({ post_id: id }).del();

// Module exports
const PostsService = {
	list,
	listCategory,
	listTopic,
	create,
	read,
	readFeatured,
	update,
	destroy,
};
export default PostsService;
