const axios = require("axios");
const creds = require("./esi-config");
const esiInstance = axios.create({
	baseURL: "https://login.eveonline.com/oauth"
});

const buildAuthorizationHeader = (clientId, secretKey) => {
	return "Basic " + new Buffer(clientId + ":" + secretKey).toString("base64");
};

const requestAuthorizationGrant = res => {
	const params = [
		"response_type=code",
		"redirect_uri=" + creds.callbackUrl,
		"client_id=" + creds.clientId,
		"scope=" + creds.scopes,
		"state=" + creds.state
	];

	res.redirect(esiInstance.defaults.baseURL + "/authorize?" + params.join("&"));
};

const handleAuthorizationCode = req => {
	if (req.query.state === creds.state) {
		return req.query.code;
	}
	throw new Error("Possible XSRF. Invalid state");
};

const requestAccessToken = authCode => {
	const authHeader = buildAuthorizationHeader(creds.clientId, creds.secretKey);
	const params = [
		"grant_type=authorization_code",
		"code=" + authCode
	];

	return esiInstance({
		method: "POST",
		url: "/token?" + params.join("&"),
		headers: {
			"Authorization": authHeader,
			"Content-Type": "application/x-www-form-urlencoded",
			"Host": "login.eveonline.com"
		},
		data: {}
	});
};

const getCharacterData = oauth => {
	const authHeader = oauth.token_type + " " + oauth.access_token;
	return esiInstance({
		method: "GET",
		url: "/verify",
		headers: {
			"User-Agent": "eve-companion.in",
			"Authorization": authHeader,
			"Host": "login.eveonline.com"
		}
	});
};

const refreshAccess = refreshToken => {
	const authHeader = buildAuthorizationHeader(creds.clientId, creds.secretKey)

	const params = [
		"grant_type=refresh_Token",
		"refresh_token=" + refreshToken
	];

	const headers = {
		"Authorization": authHeader,
		"Content-Type": "application/x-www-form-urlencoded",
		"Host": "login.eveonline.com"
	};

	return esiInstance({
		method: "POST",
		url: "/token?" + params.join("&"),
		headers,
		data: {}
	});
};

module.exports = {
	requestAuthorizationGrant,
	handleAuthorizationCode,
	requestAccessToken,
	getCharacterData,
	refreshAccess
};
