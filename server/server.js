const express = require("express");
const request = require("request");

const app = express();
const PORT = process.env.PORT || 8080;

require("./routes/html-routes.js")(app);

app.listen(PORT, function() {
	console.log("App listening on port: ", PORT);
});
