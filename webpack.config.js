import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const webpackConfig = {
	mode: "production",
	entry: "./index.js",
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/",
		filename: "final.js",
	},
	target: "node",
};

export default webpackConfig;
