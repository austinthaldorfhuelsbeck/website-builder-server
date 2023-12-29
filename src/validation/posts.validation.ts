// External modules
import { Request, Response, NextFunction } from "express";

// Internal modules
import { PostsService } from "../services/posts.service";
import { ErrorHandlers } from "../errors/errorHandler";

// Data models
import { IPost } from "../interfaces/objects.interface";

// Middleware functions
function isValidPost(req: Request, res: Response, next: NextFunction) {
	// find post in request
	const post: IPost = req.body;
	// append ID if none provided
	if (!post.post_id) {
		const now: Date = new Date();
		post.post_id = now.valueOf();
	}
	// build error message
	const errors: (string | undefined)[] = [];
	if (!post.post_category_id)
		errors.push("What category does this post belong to?");
	if (!post.post_topic_id)
		errors.push("What topic does this post belong to?");
	if (!post.title) errors.push("Post title required.");
	// return result or break with 400 invalid request
	if (!errors.length) {
		res.locals.validPost = post;
		return next();
	}
	ErrorHandlers.errorHandler(
		{
			status: 400,
			message: errors.join(" "),
		},
		res,
	);
}
async function postExists(req: Request, res: Response, next: NextFunction) {
	// find post id in request
	const id: string = req.params.post_id;
	// break with 400 invalid request if no post topic id provided
	if (!id)
		ErrorHandlers.errorHandler(
			{
				status: 400,
				message: "Post ID required.",
			},
			res,
		);
	// find the post
	const post: IPost = await PostsService.read(parseInt(id));
	// return result or break with 404 not found
	if (post) {
		res.locals.foundPost = post;
		return next();
	}
	ErrorHandlers.errorHandler(
		{
			status: 404,
			message: `Post ${id} cannot be found.`,
		},
		res,
	);
}

// Module exports
const PostsValidation = { isValidPost, postExists };
export { PostsValidation };
