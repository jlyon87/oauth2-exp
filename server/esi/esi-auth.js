const axios = require("axios");
const creds = require("./esi-config");
const esiInstance = axios.create({
	baseURL: "https://login.eveonline.com/oauth",
	headers: {
		"Host": "login.eveonline.com",
		"User-Agent": "eve-companion.in / v1.0"
	}
});

const { getBasicAuthorization } = require("../plugins/auth-header");

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
	const authHeader = getBasicAuthorization(creds);
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
		}
	});
};

const refreshAccess = refreshToken => {
	const authHeader = getBasicAuthorization(creds)

	const params = [
		"grant_type=refresh_token",
		"refresh_token=" + refreshToken
	];

	const headers = {
		"Authorization": authHeader,
		"Content-Type": "application/x-www-form-urlencoded",
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
