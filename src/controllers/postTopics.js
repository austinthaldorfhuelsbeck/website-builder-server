import PostTopicsMiddleware from "../middleware/postTopics.js";
import PostTopicsService from "../services/postTopics.js";

const list = async (req, res) => {
	// searches if request query exists
	const { search } = req.query;
	const data = search
		? await PostTopicsService.search(search.toString())
		: await PostTopicsService.list();
	res.status(200).json({ data });
};

const create = async (req, res) => {
	const { validPostTopic } = res.locals;
	const data = await PostTopicsService.create(validPostTopic);
	res.status(201).json({ data });
};
const read = (req, res) => {
	const { foundPostTopic: data } = res.locals;
	res.status(200).json({ data });
};
const update = async (req, res) => {
	const {
		validPostTopic,
		foundPostTopic: { post_topic_id },
	} = res.locals;
	const data = await PostTopicsService.update(validPostTopic, post_topic_id);
	res.status(200).json({ data });
};
const destroy = async (req, res) => {
	const {
		foundPostTopic: { post_topic_id },
	} = res.locals;
	const data = await PostTopicsService.destroy(post_topic_id);
	res.status(200).json({ data });
};

const PostTopicsController = {
	list,
	create: [PostTopicsMiddleware.isValidPostTopic, create],
	read: [PostTopicsMiddleware.postTopicExists, read],
	update: [
		PostTopicsMiddleware.postTopicExists,
		PostTopicsMiddleware.isValidPostTopic,
		update,
	],
	delete: [PostTopicsMiddleware.postTopicExists, destroy],
};
export default PostTopicsController;
