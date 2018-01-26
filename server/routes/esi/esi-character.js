const router = require("express").Router();
const axios = require("axios");
const esiChar = axios.create({
	baseURL: "https://esi.tech.ccp.is/latest/characters"
});

const getPublicData = (req, res) => {
	if (req.session.character) {
		res.send(req.session.character);
	} else {
		res.status(404).send("No Character Found.");
	}
};

router.get("/", getPublicData);

module.exports = router;
