var App = (function App(App) {

	var createXMLHttpRequest = function(method, url, listener) {
		var xhttp = new XMLHttpRequest();
		xhttp.addEventListener("load", listener);
		xhttp.open(method, url);
		return xhttp;
	};

	var getPublicData = function() {
		var xhttp = createXMLHttpRequest("GET", "/character", function() {
			console.log("responseText?", JSON.parse(this.responseText));
		});
		xhttp.send();
	}

	return {
		getPublicData: getPublicData,
	};
}(App || {}));