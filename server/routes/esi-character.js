const axios = require("axios");
const esiChar = axios.create({
	baseURL: "https://esi.tech.ccp.is/latest/characters"
});

const getPublicData = (req, res) => {
	//		esiChar.get("/characters/" + 92985127)
	console.log("getting character", req.sessionID);
	console.log("req.session.esi", req.session.esi);
	console.log("req.session.character", req.session.character);
	if (req.session.character) {
		res.send(req.session.character);
	} else {
		res.sendStatus(404);
	}
};

const characterRoutes = app => {
	app.get("/character", getPublicData);
};

module.exports = characterRoutes;