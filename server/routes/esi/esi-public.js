const router = require("express").Router();
const esiAuth = require("./esi-auth");
const esiCharacter = require("./esi-character");

router.use("/auth", esiAuth);
router.use("/character", esiCharacter);

module.exports = router;
