// External modules
import { Request, Response, NextFunction } from "express";

// Internal modules
import { PostCategoriesService } from "../services/post-categories.service";
import { ErrorHandlers } from "../errors/errorHandler";

// Data models
import { IPostCategory } from "../interfaces/objects.interface";

// Middleware functions
function isValidPostCategory(req: Request, res: Response, next: NextFunction) {
	// find post category in request
	const postCategory: IPostCategory = req.body;
	// build error message
	const errors: (string | undefined)[] = [];
	if (!postCategory.label) errors.push("Label required.");
	// return result or break with 400 invalid request
	if (!errors.length) {
		res.locals.validPostCategory = postCategory;
		return next();
	}
	ErrorHandlers.errorHandler({ status: 400, message: errors.join(" ") }, res);
}

async function postCategoryExists(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	// find post category id in request
	const id: string = req.params.post_category_id;
	// break with 400 invalid request if no post category id provided
	if (!id)
		ErrorHandlers.errorHandler(
			{ status: 400, message: "Post category ID required." },
			res,
		);
	// find the post category
	const postCategory: IPostCategory = await PostCategoriesService.read(
		parseInt(id),
	);
	// return result or break with 404 not found
	if (postCategory) {
		res.locals.foundPostCategory = postCategory;
		return next();
	} else {
		ErrorHandlers.errorHandler(
			{
				status: 404,
				message: `Post category ${id} cannot be found.`,
			},
			res,
		);
	}
}

const PostCategoriesValidation = { isValidPostCategory, postCategoryExists };

export { PostCategoriesValidation };
