import { Router } from "express";
import PostsController from "../controllers/posts.js";
import ErrorHandlers from "../middleware/errorHandlers.js";

// Router definition
const PostsRouter = Router();

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

export default PostsRouter;
