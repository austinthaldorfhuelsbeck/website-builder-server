import cors from "cors";
import express from "express";

export const setCommonMiddleware = (app) => {
	app.use(express.json());
	app.set("json spaces", 4);
	app.use((req, res, next) => {
		res.contentType("application/json; charset=utf-8");
		next();
	});
	app.use(cors());
};
