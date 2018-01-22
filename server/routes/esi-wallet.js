const axios = require("axios");
const esiChar = axios.create({
	baseURL: "https://esi.tech.ccp.is/latest/characters",
	headers: {
		"X-User-Agent": "eve-companion.in"
	}
});

const getAuthHeader = esi => {
	return esi.token_type + " " + esi.access_token;
};

const getCharacterWallet = (req, res) => {
	const assetsUri = "/" + req.session.character.id + "/wallet";
	const authHeader = getAuthHeader(req.session.esi);

	esiChar.get(assetsUri, {
		headers: {
			"Authorization": authHeader
		}
	})
	.then(esiRes => {
		console.log("wallet res.data", esiRes.data);
		if (esiRes.status === 200) {
			res.send(esiRes.data);
		} else {
			res.sendStatus(404);
			throw new Error("Error retrieving wallet.");
		}
	})
	.catch(err => console.error(err));
};

const getCharacterJournal = (req, res) => {
	const assetsUri = "/" + req.session.character.id + "/wallet/journal";
	const authHeader = getAuthHeader(req.session.esi);

	esiChar.get(assetsUri, {
		headers: {
			"Authorization": authHeader
		}
	})
	.then(esiRes => {
		console.log("journal res.data", esiRes.data);
		if (esiRes.status === 200) {
			res.send(esiRes.data);
		} else {
			res.sendStatus(404);
			throw new Error("Error retrieving journal.");
		}
	})
	.catch(err => console.error(err));
};

const getCharacterTransactions = (req, res) => {
	const assetsUri = "/" + req.session.character.id + "/wallet/transactions";
	const authHeader = getAuthHeader(req.session.esi);

	esiChar.get(assetsUri, {
		headers: {
			"Authorization": authHeader
		}
	})
	.then(esiRes => {
		console.log("transactions res.data", esiRes.data);
		if (esiRes.status === 200) {
			res.send(esiRes.data);
		} else {
			res.sendStatus(404);
			throw new Error("Error retrieving transactions.");
		}
	})
	.catch(err => console.error(err));
};

const assetsRoutes = app => {
	app.get("/wallet", getCharacterWallet);
	app.get("/journal", getCharacterJournal);
	app.get("/transactions", getCharacterTransactions);
};

module.exports = assetsRoutes;