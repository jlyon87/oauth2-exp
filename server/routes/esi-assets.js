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

const getAssets = (req, res) => {
	//		esiChar.get("/characters/" + 92985127)
	console.log("getting assets", req.sessionID);
	console.log("req.session.esi", req.session.esi);
	console.log("req.session.character", req.session.character);

	const assetsUri = "/" + req.session.character.id + "/assets";
	const authHeader = getAuthHeader(req.session.esi);

	esiChar.get(assetsUri, {
		headers: {
			"Authorization": authHeader
		}
	})
	.then(esiRes => {
		console.log("assets res.data", esiRes.data);
		if (esiRes.status === 200) {
			res.send(esiRes.data);
		} else {
			res.sendStatus(404);
			throw new Error("Error retrieving assets.");
		}
	})
	.catch(err => console.error(err));
};

const assetsRoutes = app => {
	app.get("/assets", getAssets);
};

module.exports = assetsRoutes;