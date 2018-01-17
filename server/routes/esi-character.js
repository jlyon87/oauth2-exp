const axios = require("axios");
const esiChar = axios.create({
	baseURL: "https://esi.tech.ccp.is/latest/characters"
});

const getPublicData = (req, res) => {
	console.log("getting character", req.sessionID);
	//		esiChar.get("/characters/" + 92985127)
	console.log("req.session.esi", req.session.esi);
	console.log("req.session", req.session)
	if (req.session.esi) {
		res.status(200).send(req.session.esi);
	} else {
		res.status(404).send();
	}
};

const characterRoutes = app => {
	app.get("/character", getPublicData);
};

module.exports = characterRoutes;