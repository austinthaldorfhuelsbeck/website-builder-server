import knex from "../db/connection.js";

const list = async () => knex("event_categories").select("*").orderBy("label");

const search = async (query) =>
	knex("event_categories")
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

const create = async (eventCategory) =>
	knex("event_categories").insert(eventCategory).returning("*").first();

const read = async (id) =>
	knex("event_categories")
		.select("*")
		.where({ event_category_id: id })
		.first();

const update = async (eventCategory, id) =>
	knex("event_categories")
		.select("*")
		.where({ event_category_id: id })
		.update(eventCategory, "*")
		.first();

const destroy = async (id) =>
	knex("event_categories").where({ event_category_id: id }).del();

const EventCategoriesService = {
	list,
	search,
	create,
	read,
	update,
	destroy,
};
export default EventCategoriesService;
