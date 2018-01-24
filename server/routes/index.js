const router = require("express").Router();
const bodyParser = require("body-parser");

const sessionRouter = require("./session");
const esiRouter = require("./esi");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use("/", sessionRouter);
router.use("/esi", esiRouter);

module.exports = router;
