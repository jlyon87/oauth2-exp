const axios = require("axios");
const esiInstance = axios.create({
	baseURL: "https://login.eveonline.com/oauth"
});

const AUTHORIZATION_ENDPOINT = "/authorize";
const TOKEN_ENDPOINT = "/token";

const buildAuthorizationHeader = (clientId, secretKey) => {
	return "Basic " + new Buffer(clientId + ":" + secretKey).toString("base64");
};

const requestAuthorizationGrant = (res, creds) => {
	const params = [
		"response_type=code",
		"redirect_uri=" + creds.callbackUrl,
		"client_id=" + creds.clientId,
		"scope=" + creds.scopes.join("%20"),
		"state=" + creds.state
	];

	res.redirect(esiInstance.defaults.baseURL + AUTHORIZATION_ENDPOINT + "?" + params.join("&"));
};

const handleAuthorizationCode = (req, state) => {
	if (req.query.state === state) {
		return req.query.code;
	}
	throw new Error("Possible XSRF. Invalid state");
};

const requestAccessToken = (creds, authCode) => {
	const authHeader = buildAuthorizationHeader(creds.clientId, creds.secretKey);
	const params = [
		"grant_type=authorization_code",
		"code=" + authCode
	];

	return esiInstance({
		method: "POST",
		url: TOKEN_ENDPOINT + "?" + params.join("&"),
		headers: {
			"Authorization": authHeader,
			"Content-Type": "application/x-www-form-urlencoded",
			"Host": "login.eveonline.com"
		},
		data: {}
	});
};

const getCharacterData = (oauth) => {
	console.log("getting character data with access token", oauth);
	return esiInstance({
		method: "GET",
		url: "/verify",
		headers: {
			"User-Agent": "companion",
			"Authorization": "Bearer " + oauth.access_token,
			"Host": "login.eveonline.com"
		}
	});
};

module.exports = {
	requestAuthorizationGrant,
	handleAuthorizationCode,
	requestAccessToken,
	getCharacterData
};
