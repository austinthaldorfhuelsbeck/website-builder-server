// External modules
import express from "express";
import cors from "cors";

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

// Export
export { app };
