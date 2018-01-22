const axios = require("axios");
const esiChar = axios.create({
	baseURL: "https://esi.tech.ccp.is/latest/characters",
	headers: {
		"User-Agent": "eve-companion.in"
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
		console.log("assets res.data", esiRes.data);
		if (esiRes.status === 200) {
			res.status(200).send(esiRes.data);
		} else {
			res.status(404).send();
			throw new Error("Error retrieving assets.");
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
		console.log("assets res.data", esiRes.data);
		if (esiRes.status === 200) {
			res.status(200).send(esiRes.data);
		} else {
			res.status(404).send();
			throw new Error("Error retrieving assets.");
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
		console.log("assets res.data", esiRes.data);
		if (esiRes.status === 200) {
			res.status(200).send(esiRes.data);
		} else {
			res.status(404).send();
			throw new Error("Error retrieving assets.");
		}
	})
	.catch(err => console.error(err));
};

const assetsRoutes = app => {
	app.get("/assets", getAssets);
	app.get("/wallet", getCharacterWallet);
	app.get("/journal", getCharacterJournal);
	app.get("/transactions", getCharacterTransactions);
};

module.exports = assetsRoutes;