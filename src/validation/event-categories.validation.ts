// External modules
import { Request, Response, NextFunction } from "express";

// Internal modules
import { EventCategoriesService } from "../services/event-categories.service";
import { ErrorHandlers } from "../errors/errorHandler";

// Data models
import { IEventCategory } from "../interfaces/objects.interface";

// Middleware functions
function isValidEventCategory(req: Request, res: Response, next: NextFunction) {
	// find event category in request
	const eventCategory: IEventCategory = req.body;
	// append ID if none provided
	if (!eventCategory.event_category_id) {
		const now: Date = new Date();
		eventCategory.event_category_id = now.valueOf();
	}
	// build error message
	const errors: (string | undefined)[] = [];
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
}

async function eventCategoryExists(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	// find event category id in request
	const id: string = req.params.event_category_id;
	// break with 400 invalid request if no event category id provided
	if (!id)
		ErrorHandlers.errorHandler(
			{
				status: 400,
				message: "Event category ID required.",
			},
			res,
		);
	// find the event category
	const eventCategory: IEventCategory = await EventCategoriesService.read(
		parseInt(id),
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
}

// Module exports
const EventCategoriesValidation = { isValidEventCategory, eventCategoryExists };
export { EventCategoriesValidation };
