// External modules
import { Router } from "express";

// Internal modules
import { PostCategoriesController } from "../controllers/post-categories.controller";
import { ErrorHandlers } from "../errors/errorHandler";

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
