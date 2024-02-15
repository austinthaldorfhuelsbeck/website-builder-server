import PostCategoriesMiddleware from "../middleware/postCategories.js";
import PostCategoriesService from "../services/postCategories.js";

const list = async (req, res) => {
	// searches if request query exists
	const { search } = req.query;
	const data = search
		? await PostCategoriesService.search(search.toString())
		: await PostCategoriesService.list();
	res.status(200).json({ data });
};

const create = async (req, res) => {
	const { validPostCategory } = res.locals;
	const data = await PostCategoriesService.create(validPostCategory);
	res.status(201).json({ data });
};

const read = (req, res) => {
	const { foundPostCategory: data } = res.locals;
	res.status(200).json({ data });
};

const update = async (req, res) => {
	const {
		validPostCategory,
		foundPostCategory: { post_category_id },
	} = res.locals;
	const data = await PostCategoriesService.update(
		validPostCategory,
		post_category_id,
	);
	res.status(200).json({ data });
};

const destroy = async (req, res) => {
	const {
		foundPostCategory: { post_category_id },
	} = res.locals;
	await PostCategoriesService.destroy(post_category_id);
	res.status(200).json({});
};

const PostCategoriesController = {
	list,
	create: [PostCategoriesMiddleware.isValidPostCategory, create],
	read: [PostCategoriesMiddleware.postCategoryExists, read],
	update: [
		PostCategoriesMiddleware.postCategoryExists,
		PostCategoriesMiddleware.isValidPostCategory,
		update,
	],
	delete: [PostCategoriesMiddleware.postCategoryExists, destroy],
};

export default PostCategoriesController;
