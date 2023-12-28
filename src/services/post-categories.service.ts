// Config
import knex from "../db/connection";

// Data models
import { IPostCategory } from "../interfaces/objects.interface";

// List services
async function list(): Promise<IPostCategory[]> {
	return knex("post_categories as pc").select("*").orderBy("pc.label");
}
async function search(query: string): Promise<IPostCategory[]> {
	return knex("post_categories as pc")
		.where(
			"pc.label",
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}%`,
		)
		.orWhere(
			"pc.text",
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}%`,
		)
		.orderBy("pc.updated_at");
}

// CRUD services
function create(postCategory: IPostCategory): Promise<IPostCategory> {
	return knex("post_categories").insert(postCategory).returning("*").first();
}
function read(id: number): Promise<IPostCategory> {
	return knex("post_categories as pc")
		.select("*")
		.where({ "pc.post_category_id": id })
		.first();
}
function update(
	postCategory: IPostCategory,
	id: number,
): Promise<IPostCategory> {
	return knex("post_categories as pc")
		.select("*")
		.where({ "pc.post_category_id": id })
		.update(postCategory, "*")
		.first();
}
function destroy(id: number): Promise<void> {
	return knex("post_categories as pc")
		.where({ "pc.post_category_id": id })
		.del();
}

const PostCategoriesService = {
	list,
	search,
	create,
	read,
	update,
	destroy,
};

export { PostCategoriesService };
