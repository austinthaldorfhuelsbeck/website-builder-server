// External modules
import express from "express";
import cors from "cors";

// Internal modules
import { PostCategoriesRouter } from "./routers/post-categories.router";
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
app.use(cors());

// Route handlers
app.use("/post_categories", PostCategoriesRouter)

// Error handlers
app.use(ErrorHandlers.notFound);
app.use(ErrorHandlers.errorHandler);

// Export
export { app };
