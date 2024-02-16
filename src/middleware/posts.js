import ErrorHandlers from "../middleware/errorHandlers.js";
import PostsService from "../services/posts.js";

const isValidPost = (req, res, next) => {
	// find post in request
	const post = req.body;
	// append ID if none provided
	if (!post.post_id) {
		const now = new Date();
		post.post_id = now.valueOf();
	}
	// build error message
	const errors = [];
	if (!post.post_category_id) errors.push("Category required.");
	if (!post.post_topic_id) errors.push("Topic required.");
	if (!post.label) errors.push("Post label required.");
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
};

const postExists = async (req, res, next) => {
	// find post id in request
	const { post_id } = req.params;
	// break with 400 invalid request if no post id provided
	if (!post_id)
		ErrorHandlers.errorHandler(
			{
				status: 400,
				message: "Post ID required.",
			},
			res,
		);
	// find the post
	const post = await PostsService.read(parseInt(post_id));
	// return result or break with 404 not found
	if (post) {
		res.locals.foundPost = post;
		return next();
	}
	ErrorHandlers.errorHandler(
		{
			status: 404,
			message: `Post ${post_id} cannot be found.`,
		},
		res,
	);
};

const PostsMiddleware = { isValidPost, postExists };
export default PostsMiddleware;
