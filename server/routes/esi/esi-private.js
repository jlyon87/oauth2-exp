const router = require("express").Router();

const esiAssets = require("./esi-assets");
const esiWallet = require("./esi-wallet");

const { addSeconds, calcRemainingTime } = require("../../plugins/date-helper");
const esiApi = require("../../esi/esi-auth");

const accessTokenIsValid = (req, res, next) => {
	console.log("*** confirming token validity ***");
	if(req.session.esi) {
		console.log("*** has session.esi ***");

		const msRemaining = calcRemainingTime(new Date(req.session.esi.expiryTime));

		if(msRemaining <= 60000) {

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
				next(err);
			});

		} else {
			next();
		}

	} else {
		res.sendStatus(403);
	}
};

router.use(accessTokenIsValid);

router.use("/assets", esiAssets);
router.use("/wallet", esiWallet);

module.exports = router;
