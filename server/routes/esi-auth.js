const esiConfig = require("../esi/esi-config");
const esiAuth = require("../esi/esi-auth");

const STATE = process.env.STATE || "boogers";

module.exports = (app, config) => {

	app.get("/login", function(req, res) {
		config.creds.state = STATE;
		esiAuth.requestAuthorizationGrant(res, config.creds);
	});

	app.get("/auth", function(req, res) {
		const authCode = esiAuth.handleAuthorizationCode(req, STATE);

		if(authCode) {
			esiAuth.requestAccessToken(config.creds, authCode)
				.then(esiRes => {
					if(esiRes.status === 200 && esiRes.statusText === "OK") {
						req.session.esi = esiRes.data;

						return esiRes.data;
					} else {
						throw new Error("Error requesting access token.");
					}
				})
				.then(esiAuth.getCharacterData)
				.then(esiRes => {
					const character = {
						id: esiRes.data.CharacterID,
						name: esiRes.data.CharacterName
					}
					req.session.character = character;
					res.redirect("/");
				})
				.catch(err => {
					console.error(err);
					res.redirect("/");
				});
		}
	});
};
