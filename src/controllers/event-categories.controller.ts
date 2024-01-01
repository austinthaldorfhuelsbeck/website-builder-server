// External modules
import { Request, Response } from "express";

// Internal modules
import { EventCategoriesService } from "../services/event-categories.service";
import { EventCategoriesValidation } from "../validation/event-categories.validation";

// Data models
import { IEventCategory } from "../interfaces/objects.interface";

// List controller definition
// searches if request query exists
async function list(req: Request, res: Response) {
	const query: any = req.query.search;
	const data: (IEventCategory | undefined)[] = query
		? await EventCategoriesService.search(query.toString())
		: await EventCategoriesService.list();
	res.status(200).json({ data });
}

// CRUD controller definitions
async function create(req: Request, res: Response) {
	const data: IEventCategory = await EventCategoriesService.create(
		res.locals.validEventCategory,
	);
	res.status(201).json({ data });
}
function read(req: Request, res: Response) {
	const data: IEventCategory = res.locals.foundEventCategory;
	res.status(200).json({ data });
}
async function update(req: Request, res: Response) {
	const data: IEventCategory = await EventCategoriesService.update(
		res.locals.validEventCategory,
		res.locals.foundEventCategory.event_category_id,
	);
	res.status(200).json({ data });
}
async function destroy(req: Request, res: Response) {
	const data: void = await EventCategoriesService.destroy(
		res.locals.foundEventCategory.event_category_id,
	);
	res.status(200).json({ data });
}

const EventCategoriesController = {
	list,
	create: [EventCategoriesValidation.isValidEventCategory, create],
	read: [EventCategoriesValidation.eventCategoryExists, read],
	update: [
		EventCategoriesValidation.eventCategoryExists,
		EventCategoriesValidation.isValidEventCategory,
		update,
	],
	delete: [EventCategoriesValidation.eventCategoryExists, destroy],
};
export { EventCategoriesController };
