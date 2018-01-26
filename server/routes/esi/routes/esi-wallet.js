const router = require("express").Router();
const esiApi = require("../../../esi/esi-wallet");

const getCharacterWallet = (req, res) => {

	esiApi.fetchWallet(req.session.character.id, req.session.esi)
	.then(esiRes => {
		console.log("wallet res.data", esiRes.data);
		if (esiRes.status === 200) {
			res.json(esiRes.data);
		} else {
			res.sendStatus(404);
			throw new Error("Error retrieving wallet.");
		}
	})
	.catch(err => console.error(err));
};

const getCharacterJournal = (req, res) => {

	esiApi.fetchJournal(req.session.character.id, req.session.esi)
	.then(esiRes => {
		console.log("journal res.data", esiRes.data);
		if (esiRes.status === 200) {
			res.json(esiRes.data);
		} else {
			res.sendStatus(404);
			throw new Error("Error retrieving journal.");
		}
	})
	.catch(err => console.error(err));
};

const getCharacterTransactions = (req, res) => {

	esiApi.fetchTransactions(req.session.character.id, req.session.esi)
	.then(esiRes => {
		console.log("transactions res.data", esiRes.data);
		if (esiRes.status === 200) {
			res.json(esiRes.data);
		} else {
			res.sendStatus(404);
			throw new Error("Error retrieving transactions.");
		}
	})
	.catch(err => console.error(err));
};

router.get("/", getCharacterWallet);
router.get("/journal", getCharacterJournal);
router.get("/transactions", getCharacterTransactions);

module.exports = router;
