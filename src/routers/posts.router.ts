// External modules
import { Router } from "express";

// Internal modules
import { PostsController } from "../controllers/posts.controller";
import { ErrorHandlers } from "../errors/errorHandler";

// Router definition
const PostsRouter: Router = Router();

// Route definitions
PostsRouter.route("/")
	.get(PostsController.list)
	.post(PostsController.create)
	.all(ErrorHandlers.methodNotAllowed);
PostsRouter.route("/featured")
	.get(PostsController.readFeatured)
	.all(ErrorHandlers.methodNotAllowed);
PostsRouter.route("/:post_id")
	.get(PostsController.read)
	.put(PostsController.update)
	.delete(PostsController.delete)
	.all(ErrorHandlers.methodNotAllowed);

// Module exports
export { PostsRouter };