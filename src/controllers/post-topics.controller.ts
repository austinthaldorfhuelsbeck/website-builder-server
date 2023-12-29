// External modules
import { Request, Response } from "express";

// Internal modules
import { PostTopicsValidation } from "../validation/post-topics.validation";
import { PostTopicsService } from "../services/post-topics.service";

// Data models
import { IPostTopic } from "../interfaces/objects.interface";

// List controller definition
// searches if request query exists
async function list(req: Request, res: Response) {
	const query: any = req.query.search;
	const data: (IPostTopic | undefined)[] = query
		? await PostTopicsService.search(query.toString())
		: await PostTopicsService.list();
	res.status(200).json({ data });
}

// CRUD controller definitions
async function create(req: Request, res: Response) {
	const data: IPostTopic = await PostTopicsService.create(
		res.locals.validPostTopic,
	);
	res.status(201).json({ data });
}
function read(req: Request, res: Response) {
	const data: IPostTopic = res.locals.foundPostTopic;
	res.status(200).json({ data });
}
async function update(req: Request, res: Response) {
	const data: IPostTopic = await PostTopicsService.update(
		res.locals.validPostTopic,
		res.locals.foundPostTopic.post_topic_id,
	);
	res.status(204).json({ data });
}
async function destroy(req: Request, res: Response) {
	const data: void = await PostTopicsService.destroy(
		res.locals.foundPostTopic.post_topic_id,
	);
	res.status(200).json({ data });
}

// Module exports
const PostTopicsController = {
	list,
	create: [PostTopicsValidation.isValidPostTopic, create],
	read: [PostTopicsValidation.postTopicExists, read],
	update: [
		PostTopicsValidation.postTopicExists,
		PostTopicsValidation.isValidPostTopic,
		update,
	],
	delete: [PostTopicsValidation.postTopicExists, destroy],
};
export { PostTopicsController };
