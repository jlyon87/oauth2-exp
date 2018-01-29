const scopes = process.env.ESI_SCOPES ? process.env.ESI_SCOPES.split(" ").join("%20") : ""

const creds = {
	clientId: process.env.ESI_CLIENT_ID,
	secretKey: process.env.ESI_SECRET_KEY,
	callbackUrl: process.env.ESI_CALLBACK_URL,
	state: process.env.ESI_STATE,
	scopes
};

module.exports = creds;
