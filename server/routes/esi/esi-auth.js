const router = require("express").Router();
const esiCreds = require("../../esi/esi-config");
const esiAuth = require("../../esi/esi-auth");

const handleAuth = (req, res) => {
	console.log("begin handleAuth");
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
};

const handleLogin = (req, res) => {
	console.log("begin handleLogin");
	esiAuth.requestAuthorizationGrant(res, esiCreds);
};

router.get("/", handleAuth);
router.get("/login", handleLogin);

module.exports = router;
