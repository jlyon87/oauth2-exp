const router = require("express").Router();

const esiAuthApi = require("../../esi/esi-auth");
const esiAuth = require("./esi-auth");
const esiAssets = require("./esi-assets");
const esiCharacter = require("./esi-character");
const esiWallet = require("./esi-wallet");

const calcExpiryTime = (secondsFromNow) => {
	return new Date(new Date().getTime() + secondsFromNow * 1000);
};

const accessTokenIsValid = (req, res, next) => {

	if(true) {
		console.log("before next");
		next();
	}
	console.log("after next");

	if(req.session.esi) {
		console.log("esi expiry - type: " + typeof req.session.esi.expiryTime, req.session.esi.expiryTime);

		const msRemaining = new Date(req.session.esi.expiryTime).getTime() - new Date().getTime();
		console.log("msRemaining", msRemaining);

		if(msRemaining <= 60000) {
			console.log("Remaining time low go get a new access token", msRemaining);

			esiAuthApi.refreshAccess(req.session.esi.refresh_token)
				.then(esiRes => {
					if(esiRes.status === 200 && esiRes.statusText === "OK") {
						console.log("Access Token successfully refreshed.");
						req.session.esi = esiRes.data;
						const expiry = calcExpiryTime(esiRes.data.expires_in);
						console.log("set expiry: " + typeof expiry, expiry);
						req.session.esi.expiryTime = expiry;
						return req.session.esi;
						next();
					} else {
						throw new Error("Error requesting access token.");
					}
				})
				.catch(err => {
					console.error(err);
					next(err);
				});
		} else {
			next();
		}
	} else {
		next();
	}
};

router.use(accessTokenIsValid);

router.use("/auth", esiAuth);
router.use("/assets", esiAssets);
router.use("/character", esiCharacter);
router.use("/wallet", esiWallet);

module.exports = router;
