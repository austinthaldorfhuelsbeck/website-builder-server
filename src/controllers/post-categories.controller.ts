// External modules
import { Request, Response } from "express";
import { IPostCategory } from "../interfaces/objects.interface";

// Internal modules
import { PostCategoriesService } from "../services/post-categories.service";
import { PostCategoriesValidation } from "../validation/post-categories.validation";

// List controller definition
// searches if request query exists
async function list(req: Request, res: Response) {
	const search: any = req.query.search;
	const data: (IPostCategory | undefined)[] = search
		? await PostCategoriesService.search(search.toString())
		: await PostCategoriesService.list();
	res.json({ data });
}

// CRUD controller definitions
async function create(req: Request, res: Response) {
	const data: IPostCategory = await PostCategoriesService.create(
		res.locals.validPostCategory,
	);
	res.status(201).json({ data });
}
function read(req: Request, res: Response) {
	const data: IPostCategory = res.locals.foundPostCategory;
	res.status(200).json({ data });
}
async function update(req: Request, res: Response) {
	const data: IPostCategory = await PostCategoriesService.update(
		res.locals.validPostCategory,
		res.locals.foundPostCategory.post_category_id,
	);
	res.status(204).json({ data });
}
async function destroy(req: Request, res: Response) {
	const data: void = await PostCategoriesService.destroy(
		res.locals.foundPostCategory.post_category_id,
	);
	res.status(200).json({ data });
}

const PostCategoriesController = {
	list,
	create: [PostCategoriesValidation.isValidPostCategory, create],
	read: [PostCategoriesValidation.postCategoryExists, read],
	update: [
		PostCategoriesValidation.postCategoryExists,
		PostCategoriesValidation.isValidPostCategory,
		update,
	],
	delete: [PostCategoriesValidation.postCategoryExists, destroy],
};

export { PostCategoriesController };
