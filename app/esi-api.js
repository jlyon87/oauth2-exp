const fs = require("fs");

const creds = {
	clientId: process.env.CLIENT_ID,
	secretKey: process.env.SECRET_KEY,
	callbackUrl: process.env.CALLBACK_URL,
};

const getEsiScopes = () => {
	return new Promise((resolve, reject) => {
		fs.readFile("data/esi-scopes.txt", "utf8", (err, data) => {
			if(err) reject(err);

			resolve(data.trim().split(" "));
		});
	});
};

const init = () => {

		getEsiScopes().then((scopes) => {
			if(scopes) resolve(creds.scopes = scopes);

			reject(new Error("Error retrieving scopes"));
		});
	});
};

module.exports = {
	creds: creds,
	init: init
};
