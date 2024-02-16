import express from "express";
import { setCommonMiddleware } from "./middleware/app.js";
import ErrorHandlers from "./middleware/errorHandlers.js";
import EventCategoriesRouter from "./routers/eventCategories.js";
import EventsRouter from "./routers/events.js";
import PostCategoriesRouter from "./routers/postCategories.js";
import PostTopicsRouter from "./routers/postTopics.js";
import PostsRouter from "./routers/posts.js";

// App definition
const app = express();
setCommonMiddleware(app);

// Route handlers
const apiBase = "/api/v1";
app.use(`${apiBase}/posts`, PostsRouter);
app.use(`${apiBase}/events`, EventsRouter);
app.use(`${apiBase}/post_categories`, PostCategoriesRouter);
app.use(`${apiBase}/post_topics`, PostTopicsRouter);
app.use(`${apiBase}/event_categories`, EventCategoriesRouter);

// Error handlers
app.use(ErrorHandlers.notFound);
app.use(ErrorHandlers.errorHandler);

// Export
export default app;
