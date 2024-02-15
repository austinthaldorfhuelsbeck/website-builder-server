import { Router } from "express";
import EventCategoriesController from "../controllers/eventCategories.js";
import ErrorHandlers from "../middleware/errorHandlers.js";

// Router definition
const EventCategoriesRouter = Router();

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

export default EventCategoriesRouter;
