const path = require("path");
const esiApi = require("../esi-api.js");

module.exports = function(app) {

	app.get("/login", function(req, res) {
		console.log("GET logging in");
		esiApi.redirectToSSO(res);
	});

	app.get("/auth", function(req, res) {
		console.log("GET we back from login")
	});

	app.post("/auth", function(req, res) {
		console.log("POST we back from login");
	});
};
