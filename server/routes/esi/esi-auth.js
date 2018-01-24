const router = require("express").Router();
const esiCreds = require("../../esi/esi-config");
const esiAuth = require("../../esi/esi-auth");

router.get("/", function(req, res) {
	const authCode = esiAuth.handleAuthorizationCode(req, esiCreds.state);

	if(authCode) {
		esiAuth.requestAccessToken(esiCreds, authCode)
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
				};
				req.session.character = character;
				res.redirect("/");
			})
			.catch(err => {
				console.error(err);
				res.redirect("/");
			});
	}
});

router.get("/login", function(req, res) {
	esiAuth.requestAuthorizationGrant(res, esiCreds);
});

module.exports = router;
