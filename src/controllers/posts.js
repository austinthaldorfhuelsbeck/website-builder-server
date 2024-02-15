import PostsMiddleware from "../middleware/posts.js";
import PostsService from "../services/posts.js";

const list = async (req, res) => {
	// filters if topic or category query exists
	const { topic, category } = req.query;
	let data = [];
	if (topic) {
		data = await PostsService.listTopic(topic.toString());
	} else if (category) {
		data = await PostsService.listCategory(category.toString());
	} else {
		data = await PostsService.list();
	}
	res.status(200).json({ data });
};

const create = async (req, res) => {
	const { validPost } = res.locals;
	const data = await PostsService.create(validPost);
	res.status(201).json({ data });
};

const read = async (req, res) => {
	const { foundPost: data } = res.locals;
	res.status(200).json({ data });
};

const readFeatured = async (req, res) => {
	const data = await PostsService.readFeatured();
	res.status(200).json({ data });
};

const update = async (req, res) => {
	const {
		validPost,
		foundPost: { post_id },
	} = res.locals;
	const data = await PostsService.update(validPost, post_id);
	res.status(200).json({ data });
};

const destroy = async (req, res) => {
	const {
		foundPost: { post_id },
	} = res.locals;
	const data = await PostsService.destroy(post_id);
	res.status(200).json({ data });
};

const PostsController = {
	list,
	create: [PostsMiddleware.isValidPost, create],
	read: [PostsMiddleware.postExists, read],
	readFeatured,
	update: [PostsMiddleware.postExists, PostsMiddleware.isValidPost, update],
	delete: [PostsMiddleware.postExists, destroy],
};
export default PostsController;
