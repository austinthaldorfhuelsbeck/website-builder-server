interface IBasePost {
	post_category_id: number;
	post_topic_id: number;
	featured: boolean;
	img: string;
	title: string;
	text: string;
	content: string;
	audio: string;
	video: string;
	url: string;
}

interface IPost extends IBasePost {
	post_id: number;
}

interface IBaseEvent {
	event_category_id: number;
	date: Date;
	title: string;
	text: string;
	content: string;
	url: string;
}

interface IEvent extends IBaseEvent {
	event_id: number;
}

interface IBaseCategory {
	label: string;
	text: string;
}

interface IBaseTopic extends IBaseCategory {
	hex: string;
}

interface IPostCategory extends IBaseCategory {
	post_category_id: number;
}

interface IEventCategory extends IBaseCategory {
	event_category_id: number;
}

interface IPostTopic extends IBaseTopic {
	post_topic_id: number;
}

export {
	IBasePost,
	IPost,
	IBaseEvent,
	IEvent,
	IBaseCategory,
	IPostCategory,
	IEventCategory,
	IPostTopic,
};
