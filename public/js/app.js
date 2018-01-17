var App = (function App(App) {

	var createXMLHttpRequest = function(method, url, listener) {
		var xhttp = new XMLHttpRequest();
		xhttp.addEventListener("load", listener);
		xhttp.open(method, url);
		return xhttp;
	};

	var drawCharacterData = function(data) {
		var character = document.getElementById("character");
		character.innerHTML = "";
		var cid = document.createElement("div");
		var cname = document.createElement("div");
		cid.textContent = data.name;
		cname.textContent = data.name;

		character.appendChild(cid);
		character.appendChild(cname);
	};

	var getPublicData = function() {
		var xhttp = createXMLHttpRequest("GET", "/character", function() {
			var data = JSON.parse(this.responseText);
			console.log("responseText?", data);
			drawCharacterData(data);
		});
		xhttp.send();
	}

	return {
		getPublicData: getPublicData,
	};
}(App || {}));