// External modules
import cors from "cors";
import express from "express";

// Internal modules
import ErrorHandlers from "./middleware/errorHandlers.js";
import EventCategoriesRouter from "./routers/eventCategories.js";
import EventsRouter from "./routers/events.js";
import PostCategoriesRouter from "./routers/postCategories.js";
import PostTopicsRouter from "./routers/postTopics.js";
import PostsRouter from "./routers/posts.js";

// App definition
const app = express();

// Middleware
app.use(express.json());
app.set("json spaces", 4);
app.use((req, res, next) => {
	res.contentType("application/json; charset=utf-8");
	next();
});
app.use(cors());

// Route handlers
app.use("/posts", PostsRouter);
app.use("/events", EventsRouter);
app.use("/post_categories", PostCategoriesRouter);
app.use("/post_topics", PostTopicsRouter);
app.use("/event_categories", EventCategoriesRouter);

// Error handlers
app.use(ErrorHandlers.notFound);
app.use(ErrorHandlers.errorHandler);

// Export
export default app;
