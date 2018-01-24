const fs = require("fs");

const creds = {
	clientId: process.env.ESI_CLIENT_ID,
	secretKey: process.env.ESI_SECRET_KEY,
	callbackUrl: process.env.ESI_CALLBACK_URL,
	state: process.env.ESI_STATE,
	scopes: process.env.ESI_SCOPES
};

const getEsiScopes = () => {
	return new Promise((resolve, reject) => {
		fs.readFile("data/esi-scopes.txt", "utf8", (err, data) => {
			if (err) reject(err);

			resolve(data.trim().split(" "));
		});
	});
};

const init = () => {
	return new Promise((resolve, reject) => {
		getEsiScopes().then((scopes) => {
			if (scopes) {
				creds.scopes = scopes
				resolve(scopes);
			}

			reject(new Error("Error retrieving scopes"));
		});
	});
};

module.exports = {
	creds: creds,
	init: init
};
