const router = require("express").Router();

const esiAuthApi = require("../../esi/esi-auth");
const esiAuth = require("./esi-auth");
const esiAssets = require("./esi-assets");
const esiCharacter = require("./esi-character");
const esiWallet = require("./esi-wallet");

const accessTokenIsValid = (req, res, next) => {
	if(req.session.esi) {
		console.log("esi expiry - type: " + typeof req.session.esi.expiry, req.session.esi.expiry);

		const msRemaining = new Date(req.session.esi.expiry).getTime() - new Date().getTime();
		console.log("msRemaining", msRemaining);

		if(msRemaining <= 60000) {
			console.log("Remaining time low go get a new access token", msRemaining);

			esiAuthApi.refreshAccess(req.session.esi.refresh_token)
				.then(esiRes => {
					if(esiRes.status === 200 && esiRes.statusText === "OK") {
						console.log("Access Token successfully refreshed.");
						req.session.esi = esiRes.data;
						const expiry = calcExpiryTime(90000);
						console.log("set expiry: " + typeof expiry, expiry);
						req.session.esi.expiry = expiry;
						return req.session.esi;
						next();
					} else {
						throw new Error("Error requesting access token.");
					}
				})
				.catch(err => {
					console.error(err);
					res.redirect("/");
				});
		}
	}
	next();
};

router.use(accessTokenIsValid);

router.use("/auth", esiAuth);
router.use("/assets", esiAssets);
router.use("/character", esiCharacter);
router.use("/wallet", esiWallet);

module.exports = router;
