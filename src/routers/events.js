import { Router } from "express";
import EventsController from "../controllers/events.js";
import ErrorHandlers from "../middleware/errorHandlers.js";

// Router definition
const EventsRouter = Router();

// Route definitions
EventsRouter.route("/")
	.get(EventsController.list)
	.post(EventsController.create)
	.all(ErrorHandlers.methodNotAllowed);
EventsRouter.route("/:event_id")
	.get(EventsController.read)
	.put(EventsController.update)
	.delete(EventsController.delete)
	.all(ErrorHandlers.methodNotAllowed);

export default EventsRouter;
