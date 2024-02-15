import ErrorHandlers from "../middleware/errorHandlers.js";
import PostTopicsService from "../services/postTopics.js";

const isValidPostTopic = (req, res, next) => {
	// find post topic in request
	const postTopic = req.body;
	// append ID if none provided
	if (!postTopic.post_topic_id) {
		const now = new Date();
		postTopic.post_topic_id = now.valueOf();
	}
	// build error message
	const errors = [];
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
};

const postTopicExists = async (req, res, next) => {
	// find post topic id in request
	const { post_topic_id } = req.params;
	// break with 400 invalid request if no post topic id provided
	if (!post_topic_id)
		ErrorHandlers.errorHandler(
			{
				status: 400,
				message: "Post topic ID required.",
			},
			res,
		);
	// find the post topic
	const postTopic = await PostTopicsService.read(parseInt(post_topic_id));
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
};

const PostTopicsMiddleware = { isValidPostTopic, postTopicExists };
export default PostTopicsMiddleware;
