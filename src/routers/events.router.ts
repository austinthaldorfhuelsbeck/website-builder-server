// External modules
import { Router } from "express";

// Internal modules
import { EventsController } from "../controllers/events.controller";
import { ErrorHandlers } from "../errors/errorHandler";

// Router definition
const EventsRouter: Router = Router();

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

// Module exports
export { EventsRouter };