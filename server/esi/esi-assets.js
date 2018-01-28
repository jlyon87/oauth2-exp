const axios = require("axios");
const { getBearerAuthorization } = require("../plugins/auth-header");

const axiosInstance = axios.create({
	baseURL: "https://esi.tech.ccp.is/latest/characters",
	headers: {
		"User-Agent": "eve-companion.in / v1.0"
	}
});


const fetchAssets = (characterId, clientCreds) => {
	const uri = "/" + characterId + "/assets";
	const authHeader = getBearerAuthorization(clientCreds);

	return axiosInstance.get(uri, {
		headers: {
			"Authorization": authHeader
		}
	});
};

module.exports = {
	fetchAssets
};
