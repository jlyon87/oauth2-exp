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

	var drawAssetRow = function(asset) {
		var assetRow = document.createElement("tr");

		var rowHeader = document.createElement("th");
		rowHeader.textContent = asset.type_id;
		assetRow.appendChild(rowHeader);

		for(var key in asset) {
			if(asset.hasOwnProperty(key) && key !== "type_id") {
				var cell = document.createElement("td");
				cell.textContent = asset[key];
				assetRow.appendChild(cell);
			}
		}

		return assetRow;
	};

	var drawAssets = function(assets) {
		var assetsDiv = document.getElementById("assets");
		assetsDiv.innerHTML = "";

		var table = document.createElement("table");
		var thead = document.createElement("thead");
		var theadtr = document.createElement("tr");

		var typeClm = document.createElement("th");
		typeClm.textContent = "type_id";
		theadtr.appendChild(typeClm);

		var qtyClm = document.createElement("td");
		qtyClm.textContent = "quantity";
		theadtr.appendChild(qtyClm);

		var locIdClm = document.createElement("td");
		locIdClm.textContent = "location_id";
		theadtr.appendChild(locIdClm);

		var locTypeClm = document.createElement("td");
		locTypeClm.textContent = "location_type";
		theadtr.appendChild(locTypeClm);

		var itemIdClm = document.createElement("td");
		itemIdClm.textContent = "item_id";
		theadtr.appendChild(itemIdClm);

		var locFlagClm = document.createElement("td");
		locFlagClm.textContent = "location_flag";
		theadtr.appendChild(locFlagClm);

		var isSingleClm = document.createElement("td");
		isSingleClm.textContent = "is_singleton";
		theadtr.appendChild(isSingleClm);
		thead.appendChild(theadtr);

		var tbody = document.createElement("tbody");

		assets.forEach(function(asset) {
			tbody.appendChild(drawAssetRow(asset));
		});

		table.appendChild(thead);
		table.appendChild(tbody);
		assetsDiv.appendChild(table);
	};

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
		xhttp.send();
	};

	var getWallet = function() {
		var xhttp = createXMLHttpRequest("GET", "/wallet", function () {
			var data = JSON.parse(this.responseText);
			console.log("wallet", data);
		});
		xhttp.send();
	};

	var getJournal = function () {
		var xhttp = createXMLHttpRequest("GET", "/journal", function () {
			var data = JSON.parse(this.responseText);
			console.log("journal", data);
		});
		xhttp.send();
	};

	var getTransactions = function () {
		var xhttp = createXMLHttpRequest("GET", "/transactions", function () {
			var data = JSON.parse(this.responseText);
			console.log("transactions", data);
		});
		xhttp.send();
	};

	return {
		user,
		getPublicData: getPublicData,
		getAssets,
		getWallet,
		getJournal,
		getTransactions
	};
}(App || {}));