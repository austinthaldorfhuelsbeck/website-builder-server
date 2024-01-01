// External modules
import { Request, Response, NextFunction } from "express";

// Internal modules
import { EventsService } from "../services/events.service";
import { ErrorHandlers } from "../errors/errorHandler";

// Data models
import { IEvent } from "../interfaces/objects.interface";

// Middleware functions
function isValidEvent(req: Request, res: Response, next: NextFunction) {
	// find event in request
	const event: IEvent = req.body;
	// append ID if none provided
	if (!event.event_id) {
		const now: Date = new Date();
		event.event_id = now.valueOf();
	}
	// build error message
	const errors: (string | undefined)[] = [];
	if (!event.event_category_id)
		errors.push("What category does this event belong to?");
	if (!event.date) errors.push("When is this event?");
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
}
async function eventExists(req: Request, res: Response, next: NextFunction) {
	// find event id in request
	const id: string = req.params.event_id;
	// break with 400 invalid request if no event id provided
	if (!id)
		ErrorHandlers.errorHandler(
			{
				status: 400,
				message: "Event ID required.",
			},
			res,
		);
	// find the event
	const event: IEvent = await EventsService.read(parseInt(id));
	// return result or break with 404 not found
	if (event) {
		res.locals.foundEvent = event;
		return next();
	}
	ErrorHandlers.errorHandler(
		{
			status: 404,
			message: `Post ${id} cannot be found.`,
		},
		res,
	);
}

// Module exports
const EventsValidation = { isValidEvent, eventExists };
export { EventsValidation };
