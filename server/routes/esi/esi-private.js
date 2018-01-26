const router = require("express").Router();

const esiAssets = require("./esi-assets");
const esiWallet = require("./esi-wallet");

const { addSeconds, calcRemainingTime } = require("../../plugins/date-helper");
const esiApi = require("../../esi/esi-auth");

const accessTokenIsValid = (req, res, next) => {
	console.log("*** confirming token validity ***");

	if(!req.session.esi) {
		res.status(403).send("Invalid access");
	} else {

		const msRemaining = calcRemainingTime(new Date(req.session.esi.expiryTime));

		if(msRemaining > 60000) {
			next();
		} else {

			esiApi.refreshAccess(req.session.esi.refresh_token)
			.then(esiRes => {
				if(esiRes.status === 200 && esiRes.statusText === "OK") {
					req.session.esi = esiRes.data;
					req.session.esi.expiryTime = addSeconds(new Date(), esiRes.data.expires_in);

					next();

				} else {
					throw new Error("Error requesting access token.");
				}
			})
			.catch(err => {
				console.error(err);
				res.status(500).send(err.message);
			});

		}
	}
};

router.use(accessTokenIsValid);

router.use("/assets", esiAssets);
router.use("/wallet", esiWallet);

module.exports = router;
