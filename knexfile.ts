// External modules
import * as dotenv from "dotenv";
import * as path from "path";

// Internal types
import type { Knex } from "knex";

// Config
dotenv.config();

// App variables
const {
	DATABASE_HOST,
	DATABASE_USER,
	DATABASE_PASSWORD,
	DATABASE_HOST_DEVELOPMENT,
	DATABASE_USER_DEVELOPMENT,
	DATABASE_PASSWORD_DEVELOPMENT,
} = process.env;

// Export config
const knexConfig: { [key: string]: Knex.Config } = {
	development: {
		client: "pg",
		connection: {
			host: DATABASE_HOST_DEVELOPMENT,
			user: DATABASE_USER_DEVELOPMENT,
			database: DATABASE_USER_DEVELOPMENT,
			password: DATABASE_PASSWORD_DEVELOPMENT,
			charset: "utf8",
		},
		migrations: {
			directory: path.join(__dirname, "src", "db", "migrations"),
		},
		seeds: {
			directory: path.join(__dirname, "src", "db", "seeds"),
		},
	},

	production: {
		client: "pg",
		connection: {
			host: DATABASE_HOST,
			user: DATABASE_USER,
			database: DATABASE_USER,
			password: DATABASE_PASSWORD,
			charset: "utf8",
		},
		migrations: {
			directory: path.join(__dirname, "src", "db", "migrations"),
		},
		seeds: {
			directory: path.join(__dirname, "src", "db", "seeds"),
		},
	},
};

export default knexConfig;
