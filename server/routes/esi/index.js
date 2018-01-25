const router = require("express").Router();

const esiPublic = require("./esi-public");
const esiPrivate = require("./esi-private");

router.use("/", esiPublic);
router.use("/", esiPrivate);

module.exports = router;
