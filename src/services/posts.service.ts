// Config
import knex from "../db/connection";

// Data models
import { IPost } from "../interfaces/objects.interface";

// List services
async function list(): Promise<IPost[]> {
	return knex("posts as p").select("*").orderBy("p.created_at", "desc");
}
async function search(query: string): Promise<IPost[]> {
	return knex("posts as p")
		.where(
			"p.label",
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}`,
		)
		.orWhere(
			"p.text",
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}`,
		)
		.orderBy("p.created_at", "desc");
}
async function listCategory(id: number): Promise<IPost[]> {
	return knex("posts as p")
		.select("*")
		.where({ "p.post_category_id": id })
		.orderBy("p.created_at", "desc");
}
async function listTopic(id: number): Promise<IPost[]> {
	return knex("posts as p")
		.select("*")
		.where({ "p.post_topic_id": id })
		.orderBy("p.created_at", "desc");
}

// CRUD services
function create(post: IPost): Promise<IPost> {
	return knex("posts")
		.insert(post)
		.returning("*")
		.then((categories) => categories[0]);
}
function read(id: number): Promise<IPost> {
	return knex("posts as p").select("*").where({ "p.post_id": id }).first();
}
function readFeatured(): Promise<IPost | undefined> {
	return knex("posts as p").select("*").where({ "p.featured": true }).first();
}
function update(post: IPost, id: number): Promise<IPost> {
	return knex("posts as p")
		.select("*")
		.where({ "p.post_id": id })
		.update(post, "*")
		.then((categories) => categories[0]);
}
function destroy(id: number): Promise<void> {
	return knex("posts as p").where({ "p.post_id": id }).del();
}

// Module exports
const PostsService = {
	list,
	search,
	listCategory,
	listTopic,
	create,
	read,
	readFeatured,
	update,
	destroy,
};
export { PostsService };
