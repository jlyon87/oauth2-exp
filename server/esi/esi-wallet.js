const axios = require("axios");
const { getBearerAuthorization } = require("../plugins/auth-header");

const axiosInstance = axios.create({
	baseURL: "https://esi.tech.ccp.is/latest/characters",
	headers: {
		"X-User-Agent": "eve-companion.in"
	}
});

const fetchWallet = (characterId, clientCreds) => {
	const uri = "/" + characterId + "/wallet";
	const authHeader = getBearerAuthorization(clientCreds);

	axiosInstance.get(uri, {
		headers: {
			"Authorization": authHeader
		}
	});
};

const fetchJournal = (characterId, clientCreds) => {
	const uri = "/" + characterId + "/wallet";
	const authHeader = getBearerAuthorization(clientCreds);

	axiosInstance.get(uri, {
		headers: {
			"Authorization": authHeader
		}
	});
};

const fetchTransactions = (characterId, clientCreds) => {
	const uri = "/" + characterId + "/wallet";
	const authHeader = getBearerAuthorization(clientCreds);

	axiosInstance.get(uri, {
		headers: {
			"Authorization": authHeader
		}
	});
};

module.exports = {
	fetchWallet,
	fetchJournal,
	fetchTransactions
};
