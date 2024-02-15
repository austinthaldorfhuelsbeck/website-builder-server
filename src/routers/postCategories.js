import { Router } from "express";
import PostCategoriesController from "../controllers/postCategories.js";
import ErrorHandlers from "../middleware/errorHandlers.js";

// Router definition
const PostCategoriesRouter = Router();

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

export default PostCategoriesRouter;
