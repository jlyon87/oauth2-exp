const axios = require("axios");
const esiChar = axios.create({
	baseURL: "https://esi.tech.ccp.is/latest/characters"
});

const characterRoutes = app => {
	app.get("/character", (req, res) => {
		console.log("getting character", req.sessionID);
		//		esiChar.get("/characters/" + 92985127)
		if(req.session.esi) {
			console.log("req.session.esi", req.session.esi);
			res.status(200).send(req.session.esi);
		} else {
			res.status(404).send();
		}
	});
};

module.exports = characterRoutes;