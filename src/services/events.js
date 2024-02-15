import knex from "../db/connection.js";

const list = async () => knex("events").select("*").orderBy("date", "desc");

const listUpcoming = async () =>
	knex("events")
		.select("*")
		.where("date", ">", new Date())
		.orderBy("date", "desc");

const search = async (query) =>
	knex("events")
		.where(
			label,
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}`,
		)
		.orWhere(
			text,
			"like",
			`%${query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}`,
		)
		.orderBy("date", "desc");

const listCategory = async (id) =>
	knex("events")
		.select("*")
		.where({ event_category_id: id })
		.orderBy("date", "desc");

const create = async (event) =>
	knex("events").insert(event).returning("*").first();

const read = async (id) =>
	knex("events").select("*").where({ event_id: id }).first();

const update = async (event, id) =>
	knex("events")
		.select("*")
		.where({ event_id: id })
		.update(event, "*")
		.first();

const destroy = async (id) => knex("events").where({ event_id: id }).del();

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
export default EventsService;
