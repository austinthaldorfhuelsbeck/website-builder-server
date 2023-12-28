// External modules
import * as dotenv from "dotenv";
import { app } from "./app";

// Config
dotenv.config();

// App variables
if (!process.env.PORT) {
	throw new Error("Missing required environment variables.");
}
const PORT: number = parseInt(process.env.PORT as string, 10);

// Server activation
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
