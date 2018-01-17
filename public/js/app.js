var App = (function App(App) {
	var user = {};

	var createXMLHttpRequest = function(method, url, listener) {
		var xhttp = new XMLHttpRequest();
		xhttp.addEventListener("load", listener);
		xhttp.open(method, url);
		return xhttp;
	};

	var drawCharacterData = function(character) {
		var characterDiv = document.getElementById("character");
		characterDiv.innerHTML = "";
		var cid = document.createElement("div");
		var cname = document.createElement("div");
		cid.textContent = character.id;
		cname.textContent = character.name;

		characterDiv.appendChild(cid);
		characterDiv.appendChild(cname);
	};

	var drawAssets = function(assets) {
		var assetsDiv = document.getElementById("assets");
		assetsDiv.innerHTML = "";
		assetsDiv.textContent = JSON.stringify(assets, null, 2);
	}

	var getPublicData = function() {
		var xhttp = createXMLHttpRequest("GET", "/character", function() {
			var data = JSON.parse(this.responseText);
			console.log("character", data);
			drawCharacterData(data);
		});
		xhttp.send();
	}

	var getAssets = function() {
		var xhttp = createXMLHttpRequest("GET", "/assets", function() {
			var data = JSON.parse(this.responseText);
			console.log("assets", data);
			drawAssets(data);
		});
	};

	return {
		user,
		getPublicData: getPublicData,
		getAssets,
	};
}(App || {}));