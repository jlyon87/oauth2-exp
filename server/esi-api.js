const fs = require("fs");
const axios = require("axios");

const LOGIN_URL = "https://login.eveonline.com/oauth/authorize";
const TOKEN_URL = "https://login.eveonline.com/oauth/token";
const creds = {
	clientId: process.env.CLIENT_ID,
	secretKey: process.env.SECRET_KEY,
	callbackUrl: process.env.CALLBACK_URL,
};

const getAuthorizationHeader = () => {
	return "Basic " + new Buffer(creds.clientId + ":" + creds.secretKey).toString("base64");
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

const requestAccessToken = (authCode) => {
	const authHeader = getAuthorizationHeader();
	const params = [
		"grant_type=authorization_code",
		"code=" + authCode
	];
	return axios({
		method: "POST",
		url: TOKEN_URL + "?" + params.join("&"),
		headers: {
			"Authorization": authHeader,
			"Content-Type": "application/x-www-form-urlencoded",
			"Host": "login.eveonline.com"
		},
		data: {}
	});
};

const retrieveAuthCode = (req) => {
	if(req.query.state === "boogers") {
		requestAccessToken(req.query.code).then((data) => {
			console.log("data", data);
		});
	}
};

module.exports = {
	redirectToSSO: redirectToSSO,
	retrieveAuthCode: retrieveAuthCode
};
