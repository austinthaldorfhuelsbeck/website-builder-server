import EventCategoriesService from "../services/eventCategories.js";
import EventCategoriesMiddleware from "../middleware/eventCategories.js";

const list = async (req, res) => {
	// searches if request query exists
	const { search } = req.query;
	const data = search
		? await EventCategoriesService.search(search.toString())
		: await EventCategoriesService.list();
	res.status(200).json({ data });
};

const create = async (req, res) => {
	const { validEventCategory } = res.locals;
	const data = await EventCategoriesService.create(validEventCategory);
	res.status(201).json({ data });
};

const read = (req, res) => {
	const { foundEventCategory: data } = res.locals;
	res.status(200).json({ data });
};

const update = async (req, res) => {
	const {
		validEventCategory,
		foundEventCategory: { event_category_id },
	} = res.locals;
	const data = await EventCategoriesService.update(
		validEventCategory,
		event_category_id,
	);
	res.status(200).json({ data });
};

const destroy = async (req, res) => {
	const {
		foundEventCategory: { event_category_id },
	} = res.locals;
	const data = await EventCategoriesService.destroy(event_category_id);
	res.status(200).json({ data });
};

const EventCategoriesController = {
	list,
	create: [EventCategoriesMiddleware.isValidEventCategory, create],
	read: [EventCategoriesMiddleware.eventCategoryExists, read],
	update: [
		EventCategoriesMiddleware.eventCategoryExists,
		EventCategoriesMiddleware.isValidEventCategory,
		update,
	],
	delete: [EventCategoriesMiddleware.eventCategoryExists, destroy],
};

export default EventCategoriesController;
