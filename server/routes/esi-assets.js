const axios = require("axios");
const esiChar = axios.create({
	baseURL: "https://esi.tech.ccp.is/latest/characters",
	headers: {
		"User-Agent": "eve-companion.in",
		"Host": "login.eveonline.com"
	}
});

const getAuthHeader = esi => {
	return esi.token_type + " " + esi.access_token;
};

const handleAssets = res => {
	console.log("assets res.data", res.data);
	if (res.status === 200) {
		res.status(200).send(res.data);
	} else {
		res.status(404).send();
		throw new Error("Error retrieving assets.");
	}
};

const getAssets = (req, res) => {
	//		esiChar.get("/characters/" + 92985127)
	console.log("getting character", req.sessionID);
	console.log("req.session.esi", req.session.esi);
	console.log("req.session.character", req.session.character);

	const assetsUri = "/" + req.session.character.id + "/assets";
	const authHeader = getAuthHeader(req.session.esi);

	esiChar.get(assetsUri, {
		headers: {
			"Authorization": authHeader
		}
	})
	.then(handleAssets)
	.catch(err => console.error(err));
};

const characterRoutes = app => {
	app.get("/assets", getAssets);
};

module.exports = characterRoutes;