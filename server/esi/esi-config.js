const creds = {
	clientId: process.env.ESI_CLIENT_ID,
	secretKey: process.env.ESI_SECRET_KEY,
	callbackUrl: process.env.ESI_CALLBACK_URL,
	state: process.env.ESI_STATE,
	scopes: process.env.ESI_SCOPES
};

module.exports = creds;
