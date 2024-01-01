// External modules
import express from "express";
import cors from "cors";

// Internal modules
import { PostsRouter } from "./routers/posts.router";
import { EventsRouter } from "./routers/events.router";
import { PostCategoriesRouter } from "./routers/post-categories.router";
import { PostTopicsRouter } from "./routers/post-topics.router";
import { EventCategoriesRouter } from "./routers/event-categories.router";
import { ErrorHandlers } from "./errors/errorHandler";

// App definition
const app = express();

// Middleware
app.use(express.json());
app.set("json spaces", 4);
app.use((req, res, next) => {
	res.contentType("application/json; charset=utf-8");
	next();
});
app.use("*", cors());

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
export { app };
