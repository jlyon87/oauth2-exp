const path = require("path");

module.exports = function(app) {

	app.get("/", function(req, res) {
		console.log( "home __dirname", __dirname );
		const filePath = path.join( __dirname, "..", "..", "public", "index.html");
		console.log("index.html path ", filePath);
		res.sendFile(filePath);
	});
};
