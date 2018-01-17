const axios = require("axios");
const esiChar = axios.create({
	baseURL: "https://esi.tech.ccp.is/latest/characters"
});

const getPublicData = (req, res) => {
	console.log("getting character", req.sessionID);
	//		esiChar.get("/characters/" + 92985127)
	console.log("req.session.user", req.session.user);
	console.log("req.session", req.session)
	if (req.session.user) {
		res.status(200).send(req.session.user);
	} else {
		res.status(404).send();
	}
};

const setFakeUser = (req, res) => {
	console.log("getting character", req.sessionID);
	//		esiChar.get("/characters/" + 92985127)
	console.log("req.session.user", req.session.user);
	console.log("req.session", req.session);

	if(!req.session.user) {
		req.session.user = {
			type: "fake"
		};
		res.status(200);
	} else {
		res.status(404);
	}
	res.send(req.session.user);
};

const characterRoutes = app => {
	app.get("/character", getPublicData);
	app.get("/fakeUser", setFakeUser);
};

module.exports = characterRoutes;