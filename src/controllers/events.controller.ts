// External modules
import { Request, Response } from "express";

// Internal modules
import { EventsValidation } from "../validation/events.validation";
import { EventsService } from "../services/events.service";

// Data models
import { IEvent } from "../interfaces/objects.interface";

// List controller definitions
// searches if request query exists
// filters if category query exists
async function list(req: Request, res: Response) {
	const query: any = req.query;
	let data: (IEvent | undefined)[] = [];
	if (query.search) {
		data = await EventsService.search(query.search.toString());
	} else if (query.category) {
		data = await EventsService.listCategory(query.category.toString());
	} else if (query.upcoming) {
		data = await EventsService.listUpcoming();
	} else {
		data = await EventsService.list();
	}
	res.status(200).json({ data });
}

// CRUD controller definitions
async function create(req: Request, res: Response) {
	const data: IEvent = await EventsService.create(res.locals.validEvent);
	res.status(201).json({ data });
}
async function read(req: Request, res: Response) {
	const data: IEvent = res.locals.foundEvent;
	res.status(200).json({ data });
}
async function update(req: Request, res: Response) {
	const data: IEvent = await EventsService.update(
		res.locals.validEvent,
		res.locals.foundEvent.event_id,
	);
	res.status(204).json({ data });
}
async function destroy(req: Request, res: Response) {
	const data: void = await EventsService.destroy(
		res.locals.foundEvent.event_id,
	);
	res.status(200).json({ data });
}

// Module exports
const EventsController = {
	list,
	create: [EventsValidation.isValidEvent, create],
	read: [EventsValidation.eventExists, read],
	update: [
		EventsValidation.eventExists,
		EventsValidation.isValidEvent,
		update,
	],
	delete: [EventsValidation.eventExists, destroy],
};
export { EventsController };
