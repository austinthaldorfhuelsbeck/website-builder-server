import knex from "../db/connection.js";

const list = async () => knex("post_categories").select("*").orderBy("label");

const search = async (query) =>
	knex("post_categories")
		.where(
			"label",
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}%`,
		)
		.orWhere(
			"text",
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}%`,
		)
		.orderBy(updated_at);

const create = async (postCategory) =>
	knex("post_categories")
		.insert(postCategory)
		.returning("*")
		.then((newCategories) => newCategories[0]);

const read = async (id) =>
	knex("post_categories").select("*").where({ post_category_id: id }).first();

const update = async (postCategory, id) =>
	knex("post_categories")
		.select("*")
		.where({ post_category_id: id })
		.update(postCategory, "*")
		.then((updatedCategories) => updatedCategories[0]);

const destroy = async (id) =>
	knex("post_categories").where({ post_category_id: id }).del();

const PostCategoriesService = {
	list,
	search,
	create,
	read,
	update,
	destroy,
};
export default PostCategoriesService;
