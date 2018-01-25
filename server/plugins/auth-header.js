// Given ESI Application Creds
const getBasicAuthorization = ({ clientId, secretKey }) => {
	return "Basic " + new Buffer(clientId + ":" + secretKey).toString("base64");
};

// Given ESI Client Creds
const getBearerAuthorization = ({ token_type, access_token }) => {
	return token_type + " " + access_token;
};

module.exports = {
	getBasicAuthorization,
	getBearerAuthorization
};
