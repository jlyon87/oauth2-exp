const router = require("express").Router();
const esiCharacter = require("./esi-character");

const hasCharacter = (req, res, next) => {
	if(req.session.character) {
		next()
	} else {
		res.sendStatus(404);
	}
};

router.use(hasCharacter);
router.use("/character", esiCharacter);

module.exports = router;
