import ErrorHandlers from "../middleware/errorHandlers.js";
import EventsService from "../services/events.js";

const isValidEvent = (req, res, next) => {
	// find event in request
	const event = req.body;
	// append ID if none provided
	if (!event.event_id) {
		const now = new Date();
		event.event_id = now.valueOf();
	}
	// build error message
	const errors = [];
	if (!event.event_category_id) errors.push("Category required.");
	if (!event.date) errors.push("Event date required.");
	if (!event.label) errors.push("Event label required.");
	// return result or break with 400 invalid request
	if (!errors.length) {
		res.locals.validEvent = event;
		return next();
	}
	ErrorHandlers.errorHandler(
		{
			status: 400,
			message: errors.join(" "),
		},
		res,
	);
};

const eventExists = async (req, res, next) => {
	// find event id in request
	const { event_id } = req.params;
	// break with 400 invalid request if no event id provided
	if (!event_id)
		ErrorHandlers.errorHandler(
			{
				status: 400,
				message: "Event ID required.",
			},
			res,
		);
	// find the event
	const event = await EventsService.read(parseInt(event_id));
	// return result or break with 404 not found
	if (event) {
		res.locals.foundEvent = event;
		return next();
	}
	ErrorHandlers.errorHandler(
		{
			status: 404,
			message: `Event ${event_id} cannot be found.`,
		},
		res,
	);
};

const EventsMiddleware = { isValidEvent, eventExists };
export default EventsMiddleware;
