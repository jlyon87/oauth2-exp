const path = require("path");
const request = require("request");

const esiApi = require("../esi-api.js");

module.exports = function(app) {

	app.get("/login", function(req, res) {
		console.log("GET logging in");
		esiApi.redirectToSSO(res);
	});

	app.get("/auth", function(req, res) {
		console.log("GET we back from login");
		console.log("req.query", req.query);
		esiApi.retrieveAuthCode(req);

		res.redirect("/");
	});

	app.post("/auth", function(req, res) {
		console.log("POST we back from login");
	});
};
