const router = require("express").Router();
const axios = require("axios");
const esiChar = axios.create({
	baseURL: "https://esi.tech.ccp.is/latest/characters"
});

const getPublicData = (req, res) => {
	if (req.session.character) {
		res.send(req.session.character);
	} else {
		res.sendStatus(404);
	}
};

router.get("/", getPublicData);

module.exports = router;
