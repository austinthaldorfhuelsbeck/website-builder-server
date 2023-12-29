// External modules
import { Router } from "express";

// Internal modules
import { EventCategoriesController } from "../controllers/event-categories.controller";
import { ErrorHandlers } from "../errors/errorHandler";

// Router definition
const EventCategoriesRouter: Router = Router();

// Route definitions
EventCategoriesRouter.route("/")
	.get(EventCategoriesController.list)
	.post(EventCategoriesController.create)
	.all(ErrorHandlers.methodNotAllowed);
EventCategoriesRouter.route("/:event_category_id")
	.get(EventCategoriesController.read)
	.put(EventCategoriesController.update)
	.delete(EventCategoriesController.delete)
	.all(ErrorHandlers.methodNotAllowed);

export { EventCategoriesRouter };
