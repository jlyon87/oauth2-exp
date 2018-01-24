const router = require("express").Router();

const esiAuth = require("./esi-auth");
const esiAssets = require("./esi-assets");
const esiCharacter = require("./esi-character");
const esiWallet = require("./esi-wallet");

const accessTokenIsValid = (req, res, next) => {
	if(req.session.esi) {
		console.log("esi creds", req.session.esi);
	}
	next();
};

router.use("/", accessTokenIsValid);

router.use("/auth", esiAuth);
router.use("/assets", esiAssets);
router.use("/character", esiCharacter);
router.use("/wallet", esiWallet);

module.exports = router;
