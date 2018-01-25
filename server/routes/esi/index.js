const router = require("express").Router();

const esiAuth = require("./esi-auth");
const esiAssets = require("./esi-assets");
const esiCharacter = require("./esi-character");
const esiWallet = require("./esi-wallet");

const accessTokenIsValid = (req, res, next) => {
	if(req.session.esi) {
		console.log("esi expiry - type: " + typeof req.session.esi.expiry, req.session.esi.expiry);

		const msRemaining = new Date().getTime() - req.session.esi.expiry.getTime();
		console.log("msRemaining", msRemaining);

		if(msRemaining <= 60000) {
			console.log("Remaining time low go get a new access token", msRemaining);
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
