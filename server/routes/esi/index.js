const router = require("express").Router();

const esiAuth = require("./esi-auth");
const esiPublic = require("./esi-public");
const esiPrivate = require("./esi-private");

router.use("/auth", esiAuth);
router.use("/", esiPublic);
router.use("/", esiPrivate);

module.exports = router;
