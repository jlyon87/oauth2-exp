const bodyParser = require("body-parser");

const session = require("./session");
const htmlRoutes = require("./html-routes");
const esiAuth = require("./esi-auth");
const esiCharacter = require("./esi-character");
const esiAssets = require("./esi-assets");
const esiWallet = require("./esi-wallet");

const router = app => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	session(app);
	esiAuth(app);
	esiCharacter(app);
	esiAssets(app);
	esiWallet(app);
};

module.exports = router;
