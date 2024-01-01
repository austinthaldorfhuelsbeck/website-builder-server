// Config
import knex from "../db/connection";

// Data models
import { IEvent } from "../interfaces/objects.interface";

// List services
async function list(): Promise<IEvent[]> {
	return knex("events as e").select("*").orderBy("e.date", "desc");
}
async function listUpcoming(): Promise<IEvent[]> {
	return knex("events as e")
		.select("*")
		.where("e.date", ">", new Date())
		.orderBy("e.date", "desc");
}
async function search(query: string): Promise<IEvent[]> {
	return knex("events as e")
		.where(
			"e.label",
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}`,
		)
		.orWhere(
			"e.text",
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}`,
		)
		.orderBy("e.date", "desc");
}
async function listCategory(id: number): Promise<IEvent[]> {
	return knex("events as e")
		.select("*")
		.where({ "e.event_category_id": id })
		.orderBy("e.date", "desc");
}

// CRUD services
function create(event: IEvent): Promise<IEvent> {
	return knex("events")
		.insert(event)
		.returning("*")
		.then((events) => events[0]);
}
function read(id: number): Promise<IEvent> {
	return knex("events as e").select("*").where({ "e.event_id": id }).first();
}
function update(event: IEvent, id: number): Promise<IEvent> {
	return knex("events as e")
		.select("*")
		.where({ "e.event_id": id })
		.update(event, "*")
		.then((events) => events[0]);
}
function destroy(id: number): Promise<void> {
	return knex("events as e").where({ "e.event_id": id }).del();
}

// Module exports
const EventsService = {
	list,
	search,
	listUpcoming,
	listCategory,
	create,
	read,
	update,
	destroy,
};
export { EventsService };
