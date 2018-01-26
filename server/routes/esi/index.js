const router = require("express").Router();

const esiAuth = require("./esi-auth");
const esiPublic = require("./esi-public");
const esiPrivate = require("./esi-private");

router.use("/", esiPublic);
router.use("/", esiPrivate);
router.use("/auth", esiAuth);

module.exports = router;
