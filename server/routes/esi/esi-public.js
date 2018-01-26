const router = require("express").Router();
const esiCharacter = require("./routes/esi-character");

router.use("/character", esiCharacter);

module.exports = router;
