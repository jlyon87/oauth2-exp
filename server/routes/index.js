const bodyParser = require("body-parser");

const esiConfig = require("../esi/esi-config");

const session = require("./session");
const htmlRoutes = require("./html-routes");
const esiAuth = require("./esi-auth");
const esiCharacter = require("./esi-character");

const router = app => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	session(app);
	esiAuth(app);

	esiConfig.init()
		.then(() => {
			esiAuth(app, esiConfig);
		})
		.catch(err => console.error);
};

module.exports = router;