import ErrorHandlers from "../middleware/errorHandlers.js";
import PostCategoriesService from "../services/postCategories.js";

const isValidPostCategory = (req, res, next) => {
	// find post category in request
	const postCategory = req.body;
	// append ID if none provided
	if (!postCategory.post_category_id) {
		const now = new Date();
		postCategory.post_category_id = now.valueOf();
	}
	// build error message
	const errors = [];
	if (!postCategory.label) errors.push("Label required.");
	// return result or break with 400 invalid request
	if (!errors.length) {
		res.locals.validPostCategory = postCategory;
		return next();
	}
	ErrorHandlers.errorHandler(
		{
			status: 400,
			message: errors.join(" "),
		},
		res,
	);
};

const postCategoryExists = async (req, res, next) => {
	// find post category id in request
	const { post_category_id } = req.params;
	// break with 400 invalid request if no post category id provided
	if (!post_category_id)
		ErrorHandlers.errorHandler(
			{
				status: 400,
				message: "Post category ID required.",
			},
			res,
		);
	// find the post category
	const postCategory = await PostCategoriesService.read(
		parseInt(post_category_id),
	);
	// return result or break with 404 not found
	if (postCategory) {
		res.locals.foundPostCategory = postCategory;
		return next();
	}
	ErrorHandlers.errorHandler(
		{
			status: 404,
			message: `Post category ${id} cannot be found.`,
		},
		res,
	);
};

const PostCategoriesMiddleware = { isValidPostCategory, postCategoryExists };
export default PostCategoriesMiddleware;
