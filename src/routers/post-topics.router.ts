// External modules
import { Router } from "express";

// Internal modules
import { PostTopicsController } from "../controllers/post-topics.controller";
import { ErrorHandlers } from "../errors/errorHandler";

// Router definition
const PostTopicsRouter: Router = Router();

// Route definitions
PostTopicsRouter.route("/")
	.get(PostTopicsController.list)
	.post(PostTopicsController.create)
	.all(ErrorHandlers.methodNotAllowed);
PostTopicsRouter.route("/:post_topic_id")
	.get(PostTopicsController.read)
	.put(PostTopicsController.update)
	.delete(PostTopicsController.delete)
	.all(ErrorHandlers.methodNotAllowed);

export { PostTopicsRouter };
