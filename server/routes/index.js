const router = require("express").Router();
const bodyParser = require("body-parser");

const sessionRouter = require("./session");
const esiRouter = require("./esi");

module.exports = app => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use("*", (req, res, next) => {
		console.log("originalURL", req.originalURL);
	});

	sessionRouter(app);

	router.use("/esi", esiRouter);
};
