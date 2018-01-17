const esiConfig = require("../esi/esi-config");
const esiAuth = require("../esi/esi-auth");

esiConfig.init().then( console.log );

const STATE = "boogers";

module.exports = function(app) {

	app.get("/login", function(req, res) {
		console.log("GET logging in");
		esiConfig.creds.state = STATE;
		esiAuth.requestAuthorizationGrant(res, esiConfig.creds);
	});

	app.get("/auth", function(req, res) {
		console.log("GET we back from login");
		console.log("req.query", req.query);
		const authCode = esiAuth.handleAuthorizationCode(req, STATE);

		if(authCode) {
			esiAuth.requestAccessToken(esiConfig.creds, authCode).then((response) => {
				if(response.status === 200 && response.statusText === "OK") {
					console.log("response.data", response.data);
				}
			});
		}

		res.redirect("/");
	});
};
