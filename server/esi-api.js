const fs = require("fs");

const LOGIN_URL = "https://login.eveonline.com/oauth/authorize";
const creds = {
	clientId: process.env.CLIENT_ID,
	secretKey: process.env.SECRET_KEY,
	callbackUrl: process.env.CALLBACK_URL,
};

const getEsiScopes = () => {
	return new Promise((resolve, reject) => {
		fs.readFile("server/esi-scopes.txt", "utf8", (err, data) => {
			if(err) reject(err);

			resolve(data.trim().split(" "));
		});
	});
};

const redirectToSSO = (res) => {

	getEsiScopes().then((scopes) => {
		const params = [
			"response_type=code",
			"redirect_uri=" + creds.callbackUrl,
			"client_id=" + creds.clientId,
			"scope=" + scopes.join("%20"),
			"state=boogers"
		];

		res.redirect(LOGIN_URL + "?" + params.join("&"));
	});
};

module.exports = {
	redirectToSSO: redirectToSSO,
};
