const esiConfig = require("../esi/esi-config");
const esiAuth = require("../esi/esi-auth");

const STATE = process.env.STATE || "boogers";

module.exports = function(app, config) {

	app.get("/login", function(req, res) {
		console.log("GET logging in", req.sessionID);
		config.creds.state = STATE;
		esiAuth.requestAuthorizationGrant(res, config.creds);
	});

	app.get("/auth", function(req, res) {
		console.log("GET we back from login");
		console.log("req.query", req.query);
		const authCode = esiAuth.handleAuthorizationCode(req, STATE);

		if(authCode) {
			esiAuth.requestAccessToken(config.creds, authCode)
				.then((response) => {
					if(response.status === 200 && response.statusText === "OK") {
						console.log("response.data", response.data);
						req.session.esi = response.data;
					}
				})
				.catch(err => console.err);
		}

		res.redirect("/");
	});
};
