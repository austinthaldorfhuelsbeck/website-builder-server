// External modules
import { Router } from "express";

// Internal modules
import { ErrorHandlers } from "../errors/errorHandler";
import { PostCategoriesController } from "../controllers/post-categories.controller";

// Router definition
const PostCategoriesRouter: Router = Router();

// Route definitions
PostCategoriesRouter.route("/")
	.get(PostCategoriesController.list)
	.post(PostCategoriesController.create)
	.all(ErrorHandlers.methodNotAllowed);
PostCategoriesRouter.route("/:post_category_id")
	.get(PostCategoriesController.read)
	.put(PostCategoriesController.update)
	.delete(PostCategoriesController.delete)
	.all(ErrorHandlers.methodNotAllowed);

export { PostCategoriesRouter };
