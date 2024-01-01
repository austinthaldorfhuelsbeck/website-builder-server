// Config
import knex from "../db/connection";

// Data models
import { IEventCategory } from "../interfaces/objects.interface";

// List services
async function list(): Promise<IEventCategory[]> {
	return knex("event_categories as pc").select("*").orderBy("pc.label");
}
async function search(query: string): Promise<IEventCategory[]> {
	return knex("event_categories as pc")
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
function create(EventCategory: IEventCategory): Promise<IEventCategory> {
	return knex("event_categories")
		.insert(EventCategory)
		.returning("*")
		.then((categories) => categories[0]);
}
function read(id: number): Promise<IEventCategory> {
	return knex("event_categories as pc")
		.select("*")
		.where({ "pc.event_category_id": id })
		.first();
}
function update(
	EventCategory: IEventCategory,
	id: number,
): Promise<IEventCategory> {
	return knex("event_categories as pc")
		.select("*")
		.where({ "pc.event_category_id": id })
		.update(EventCategory, "*")
		.then((categories) => categories[0]);
}
function destroy(id: number): Promise<void> {
	return knex("event_categories as pc")
		.where({ "pc.event_category_id": id })
		.del();
}

// Module exports
const EventCategoriesService = {
	list,
	search,
	create,
	read,
	update,
	destroy,
};
export { EventCategoriesService };
