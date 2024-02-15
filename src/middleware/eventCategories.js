import ErrorHandlers from "../middleware/errorHandlers.js";
import EventCategoriesService from "../services/eventCategories.js";

const isValidEventCategory = (req, res, next) => {
	// find event category in request
	const eventCategory = req.body;
	// append ID if none provided
	if (!eventCategory.event_category_id) {
		const now = new Date();
		eventCategory.event_category_id = now.valueOf();
	}
	// build error message
	const errors = [];
	if (!eventCategory.label) errors.push("Label required.");
	// return result or break with 400 invalid request
	if (!errors.length) {
		res.locals.validEventCategory = eventCategory;
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

const eventCategoryExists = async (req, res, next) => {
	// find event category id in request
	const { event_category_id } = req.params;
	// break with 400 invalid request if no event category id provided
	if (!event_category_id)
		ErrorHandlers.errorHandler(
			{
				status: 400,
				message: "Event category ID required.",
			},
			res,
		);
	// find the event category
	const eventCategory = await EventCategoriesService.read(
		parseInt(event_category_id),
	);
	// return result or break with 404 not found
	if (eventCategory) {
		res.locals.foundEventCategory = eventCategory;
		return next();
	}
	ErrorHandlers.errorHandler(
		{
			status: 404,
			message: `Event category ${id} cannot be found.`,
		},
		res,
	);
};

const EventCategoriesMiddleware = { isValidEventCategory, eventCategoryExists };
export default EventCategoriesMiddleware;
