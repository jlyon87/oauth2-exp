const axios = require("axios");

const AUTHORIZATION_ENDPOINT = "https://login.eveonline.com/oauth/authorize";
const TOKEN_ENDPOINT = "https://login.eveonline.com/oauth/token";

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

	res.redirect(LOGIN_URL + "?" + params.join("&"));
};

const handleAuthorizationCode = (req, state) => {
	if(req.query.state === state) {
		return req.query.code;
	}
	throw new Error("Possible XSRF. Invalid state");
};

const requestAccessToken = (authCode) => {
	const authHeader = buildAuthorizationHeader();
	const params = [
		"grant_type=authorization_code",
		"code=" + authCode
	];

	return axios({
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

module.exports = {
	requestAuthorizationGrant: requestAuthorizationGrant,
	handleAuthorizationCode: handleAuthorizationCode,
	requestAccessToken: requestAccessToken,
};
