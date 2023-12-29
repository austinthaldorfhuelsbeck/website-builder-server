// Config
import knex from "../db/connection";

// Data models
import { IPostTopic } from "../interfaces/objects.interface";

// List services
async function list(): Promise<IPostTopic[]> {
	return knex("post_topics as pt").select("*").orderBy("pt.label");
}
async function search(query: string): Promise<IPostTopic[]> {
	return knex("post_topics as pt")
		.where(
			"pt.label",
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}`,
		)
		.orWhere(
			"pt.text",
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}`,
		)
		.orderBy("pt.updated_at");
}

// CRUD services
function create(postTopic: IPostTopic): Promise<IPostTopic> {
	return knex("post_topics").insert(postTopic).returning("*").first();
}
function read(id: number): Promise<IPostTopic> {
	return knex("post_topics as pt")
		.select("*")
		.where({ "pt.post_topic_id": id })
		.first();
}
function update(postTopic: IPostTopic, id: number): Promise<IPostTopic> {
	return knex("post_topics as pt")
		.select("*")
		.where({ "pt.post_topic_id": id })
		.update(postTopic, "*")
		.first();
}
function destroy(id: number): Promise<void> {
	return knex("post_topics as pt").where({ "pt.post_topic_id": id }).del();
}

// Module exports
const PostTopicsService = {
	list,
	search,
	create,
	read,
	update,
	destroy,
};
export { PostTopicsService };
