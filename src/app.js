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
