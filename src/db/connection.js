import Knex from "knex";
import knexFile from "../../knexfile.js";

// environment defaults to dev if none specified
const environment = process.env.NODE_ENV || "development";

const knex = Knex(knexFile[environment]);

export default knex;
