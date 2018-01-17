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
				.then(esiRes => {
					if(esiRes.status === 200 && esiRes.statusText === "OK") {
						console.log("response.data", esiRes.data);
						console.log("Setting session.esi - req.sessionID", req.sessionID);
						const user = { access_token, token_type, expires_in, refresh_token } = esiRes.data;
						req.session.esi = user;
						console.log("req.session.esi written", req.session.esi);

						esiAuth.getCharacterData(esiRes.data)

						return esiRes;
					}
				})
				.then(esiAuth.getCharacterData(esiRes.data))
				.then(esiRes => {
					console.log("getCharacters res.data", esiRes);
					req.session.character = esiRes.data;
					res.redirect("/");
				})
				.catch(err => {
					console.error(err);
					res.redirect("/");
				});
		}
	});
};
