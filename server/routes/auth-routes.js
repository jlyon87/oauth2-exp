const path = require("path");
const request = require("request");

const esiApi = require("../../app/esi-api.js");
const oauth = require("../../app/auth/oauth.js");

esiApi.init().then( console.log );

const STATE = "boogers";

module.exports = function(app) {

	app.get("/login", function(req, res) {
		console.log("GET logging in");
		esiApi.creds.state = STATE;
		oauth.requestAuthorizationGrant(res, esiApi.creds);
	});

	app.get("/auth", function(req, res) {
		console.log("GET we back from login");
		console.log("req.query", req.query);
		const authCode = oauth.handleAuthorizationCode(req, STATE);

		if(authCode) {
			oauth.requestAccessToken(authCode).then((response) => {
				if(response.status === 200 && response.statusText === "OK") {
					console.log("response.data", response.data);
				}
			});
		}

		res.redirect("/");
	});
};
