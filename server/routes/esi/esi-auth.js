const router = require("express").Router();
const esiCreds = require("../../esi/esi-config");
const esiAuth = require("../../esi/esi-auth");

const calcExpiryTime = (secondsFromNow) => {
	return new Date(new Date().getTime() + secondsFromNow * 1000);
};

const handleAuth = (req, res) => {
	const authCode = esiAuth.handleAuthorizationCode(req, esiCreds.state);

	if(authCode) {
		esiAuth.requestAccessToken(esiCreds, authCode)
			.then(esiRes => {
				if(esiRes.status === 200 && esiRes.statusText === "OK") {
					req.session.esi = esiRes.data;
					const expiry = calcExpiryTime(esiRes.data.expires_in);
					console.log("set expiry: " + typeof expiry, expiry);
					req.session.esi.expiry = expiry;
					return req.session.esi;

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
	esiAuth.requestAuthorizationGrant(res, esiCreds);
};

router.get("/", handleAuth);
router.get("/login", handleLogin);

module.exports = router;
