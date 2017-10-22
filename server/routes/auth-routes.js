const path = require("path");
const request = require("request");

const esiApi = require("../../app/esi-api.js");
const oauth = require("../../app/auth/oauth.js");

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
};
