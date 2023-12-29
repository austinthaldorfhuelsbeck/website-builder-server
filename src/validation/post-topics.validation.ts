// External modules
import { Request, Response, NextFunction } from "express";

// Internal modules
import { PostTopicsService } from "../services/post-topics.service";
import { ErrorHandlers } from "../errors/errorHandler";

// Data models
import { IPostTopic } from "../interfaces/objects.interface";

// Middleware functions
function isValidPostTopic(req: Request, res: Response, next: NextFunction) {
	// find post topic in request
	const postTopic: IPostTopic = req.body;
	// build error message
	const errors: (string | undefined)[] = [];
	if (!postTopic.label) errors.push("Label required.");
	// return result or break with 400 invalid request
	if (!errors.length) {
		res.locals.validPostTopic = postTopic;
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
async function postTopicExists(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	// find post topic id in request
	const id: string = req.params.post_topic_id;
	// break with 400 invalid request if no post topic id provided
	if (!id)
		ErrorHandlers.errorHandler(
			{
				status: 400,
				message: "Post topic ID required.",
			},
			res,
		);
	// find the post topic
	const postTopic: IPostTopic = await PostTopicsService.read(parseInt(id));
	// return result or break with 404 not found
	if (postTopic) {
		res.locals.foundPostTopic = postTopic;
		return next();
	}
	ErrorHandlers.errorHandler(
		{
			status: 404,
			message: `Post topic ${id} cannot be found.`,
		},
		res,
	);
}

// Module exports
const PostTopicsValidation = { isValidPostTopic, postTopicExists };
export { PostTopicsValidation };
