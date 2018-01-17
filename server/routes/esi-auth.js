const esiConfig = require("../esi/esi-config");
const esiAuth = require("../esi/esi-auth");

const STATE = process.env.STATE || "boogers";

module.exports = (app, config) => {

	app.get("/login", function(req, res) {
		console.log("GET logging in");
		config.creds.state = STATE;
		esiAuth.requestAuthorizationGrant(res, config.creds);
	});

	app.get("/auth", function(req, res) {
		console.log("GET we back from login");
		console.log("req.query", req.query);
		const authCode = esiAuth.handleAuthorizationCode(req, STATE);

		if(authCode) {
			esiAuth.requestAccessToken(config.creds, authCode)
				.then(response => {
					if(response.status === 200 && response.statusText === "OK") {
						console.log("response.data", response.data);
						console.log("Setting session.esi - req.sessionID", req.sessionID);
						const user = { access_token, token_type, expires_in, refresh_token } = response.data;
						req.session.esi = user;
						console.log("req.session.esi written", req.session.esi);
						res.redirect("/");
					}
				})
				.catch(err => {
					console.error(err);
					res.redirect("/");
				});
		}
	});
};
