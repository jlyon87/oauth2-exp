const router = require("express").Router();
const session = require("express-session");
const parseurl = require("parseurl");

const ONE_MINUTE = 1000 * 60;
const TEN_MINUTES = ONE_MINUTE * 10;
const ONE_HOUR = TEN_MINUTES * 6;
const SECRET = process.env.EXPRESS_SESSION_SECRET || "oauth-test";

const pageCounter = (req, res, next) => {
	console.log("req.session", req.session);
	console.log("req.sessionID", req.sessionID);
	if (!req.session.views) {
		req.session.views = {};
	}

	const pathname = parseurl(req).pathname;
	req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
	next();
};

const options = {
	cookie: {
		maxAge: ONE_HOUR
	},
	secret: SECRET,
	resave: false,
	saveUninitialized: false,
	name: "esioauth.connect.sid"
}
router.use(session(options));

router.use("/", pageCounter);

module.exports = router;
