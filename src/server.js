// External modules
import * as dotenv from "dotenv";
import app from "./app.js";

// Config
dotenv.config();

// App variables
if (!process.env.PORT) {
	throw new Error("Missing required environment variables.");
}
const PORT = parseInt(process.env.PORT, 10);

// Server activation
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
