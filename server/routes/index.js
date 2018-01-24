const router = require("express").Router();
const bodyParser = require("body-parser");

const sessionRouter = require("./session");
const esiRouter = require("./esi");

module.exports = app => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	sessionRouter(app);

	app.use("/esi", esiRouter);
};
