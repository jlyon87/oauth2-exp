const LOGIN_URL = "https://login.eveonline.com/oauth/authorize";
const creds = {
	clientId: process.env.CLIENT_ID,
	secretKey: process.env.SECRET_KEY,
	callbackUrl: process.env.CALLBACK_URL,
	scopes: process.env.scopes
};

const redirectToSSO = (res) => {
	const params = [
		"response_type=code",
		"redirect_uri=" + creds.callbackUrl,
		"client_id=" + creds.clientId,
		"scope=" + creds.scope,
		"state=boogers"
	];

	res.redirect(LOGIN_URL + "?" + params.join("&"));
};

module.exports = {
	redirectToSSO: redirectToSSO,
};
