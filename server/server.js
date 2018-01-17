const path = require("path");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("trust proxy", 1);
app.use(session({
	secret: process.env.EXPRESS_SESSION_SECRET || "keyboard-cat",
	resave: true,
	saveUninitialized: true
}));

require("./routes/html-routes.js")(app);
require("./routes/esi-character")(app);

const esiConfig = require("./esi/esi-config");
esiConfig.init()
	.then(() => {
		require("./routes/esi-auth.js")(app, esiConfig);
	})
	.catch(err => console.error);

app.listen(PORT, function() {
	console.log("App listening on port: ", PORT);
});
