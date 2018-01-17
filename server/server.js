const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static("public"));

require("./routes")(app);

app.listen(PORT, function() {
	console.log("App listening on port: ", PORT);
});
