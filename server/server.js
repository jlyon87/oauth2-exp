const path = require("path");
const express = require("express");
const request = require("request");

const esiApi = require("../app/esi-api.js");

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/public", express.static(path.join(__dirname, "..", "public")));

require("./routes/html-routes.js")(app);
require("./routes/esi-auth.js")(app);

app.listen(PORT, function() {
	console.log("App listening on port: ", PORT);
});
