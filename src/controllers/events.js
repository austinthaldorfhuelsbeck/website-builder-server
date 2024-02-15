import EventsMiddleware from "../middleware/events.js";
import EventsService from "../services/events.js";

const list = async (req, res) => {
	// searches if request query exists
	// filters if category query or upcoming exists
	const { search, category, upcoming } = req.query;
	let data = [];

	if (search) {
		data = await EventsService.search(search.toString());
	} else if (category) {
		data = await EventsService.listCategory(category.toString());
	} else if (upcoming) {
		data = await EventsService.listUpcoming();
	} else {
		data = await EventsService.list();
	}
	res.status(200).json({ data });
};

const create = async (req, res) => {
	const { validEvent } = res.locals;
	const data = await EventsService.create(validEvent);
	res.status(201).json({ data });
};

const read = async (req, res) => {
	const { foundEvent: data } = res.locals;
	res.status(200).json({ data });
};

const update = async (req, res) => {
	const {
		validEvent,
		foundEvent: { event_id },
	} = res.locals;
	const data = await EventsService.update(validEvent, event_id);
	res.status(200).json({ data });
};

const destroy = async (req, res) => {
	const {
		foundEvent: { event_id },
	} = res.locals;
	const data = await EventsService.destroy(event_id);
	res.status(200).json({ data });
};

const EventsController = {
	list,
	create: [EventsMiddleware.isValidEvent, create],
	read: [EventsMiddleware.eventExists, read],
	update: [
		EventsMiddleware.eventExists,
		EventsMiddleware.isValidEvent,
		update,
	],
	delete: [EventsMiddleware.eventExists, destroy],
};

export default EventsController;
