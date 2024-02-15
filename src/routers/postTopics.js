import { Router } from "express";
import PostTopicsController from "../controllers/postTopics.js";
import ErrorHandlers from "../middleware/errorHandlers.js";

// Router definition
const PostTopicsRouter = Router();

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

export default PostTopicsRouter;
