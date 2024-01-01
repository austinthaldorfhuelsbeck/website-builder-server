// External modules
import { Request, Response } from "express";

// Internal modules
import { PostsValidation } from "../validation/posts.validation";
import { PostsService } from "../services/posts.service";

// Data models
import { IPost } from "../interfaces/objects.interface";

// List controller definition
// searches if request query exists
// filters if topic or category query exists
async function list(req: Request, res: Response) {
	const query: any = req.query;
	let data: (IPost | undefined)[] = [];
	if (query.search) {
		data = await PostsService.search(query.search.toString());
	} else if (query.topic) {
		data = await PostsService.listTopic(query.topic.toString());
	} else if (query.category) {
		data = await PostsService.listCategory(query.category.toString());
	} else {
		data = await PostsService.list();
	}
	res.status(200).json({ data });
}

// CRUD controller definitions
async function create(req: Request, res: Response) {
	const data: IPost = await PostsService.create(res.locals.validPost);
	res.status(201).json({ data });
}
function read(req: Request, res: Response) {
	const data: IPost = res.locals.foundPost;
	res.status(200).json({ data });
}
async function readFeatured(req: Request, res: Response) {
	const data: IPost = await PostsService.readFeatured();
	res.status(200).json({ data });
}
async function update(req: Request, res: Response) {
	const data: IPost = await PostsService.update(
		res.locals.validPost,
		res.locals.foundPost.post_id,
	);
	res.status(200).json({ data });
}
async function destroy(req: Request, res: Response) {
	const data: void = await PostsService.destroy(res.locals.foundPost.post_id);
	res.status(200).json({ data });
}

// Module exports
const PostsController = {
	list,
	create: [PostsValidation.isValidPost, create],
	read: [PostsValidation.postExists, read],
	readFeatured,
	update: [PostsValidation.postExists, PostsValidation.isValidPost, update],
	delete: [PostsValidation.postExists, destroy],
};
export { PostsController };
