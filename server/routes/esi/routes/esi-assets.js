const router = require("express").Router();
const esiApi = require("../../../esi/esi-assets");

const getAssets = (req, res) => {

	esiApi.fetchAssets(req.session.character.id, req.session.esi)
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

router.get("/", getAssets);

module.exports = router;
