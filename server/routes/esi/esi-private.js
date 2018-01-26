const router = require("express").Router();

const esiAssets = require("./routes/esi-assets");
const esiWallet = require("./routes/esi-wallet");

const { addSeconds, calcRemainingTime } = require("../../plugins/date-helper");
const esiApi = require("../../esi/esi-auth");

const refreshAuth = (req, res, next) => {
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
};

const isAuthenticated = (req, res, next) => {
	if(req.session.esi) {
		next();
	} else {
		res.sendStatus(403);
	}
};

const isAuthExpired = (req, res, next) => {
	const msRemaining = calcRemainingTime(new Date(req.session.esi.expiryTime));

	if(msRemaining > 60000) {
		next();
	} else {
		refreshAuth(req, res, next);
	}
};

router.use(isAuthenticated);
router.use(isAuthExpired);

router.use("/assets", esiAssets);
router.use("/wallet", esiWallet);

module.exports = router;
