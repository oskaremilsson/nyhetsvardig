//"http://dragonslayer96.se/dragonhacker96/nyhetsvardig/";

function checkDatabase(id) {
	console.log(id);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var str = xmlhttp.responseText;
					var percentage = str.split(",")[1];
					var truePercentage = parseInt(percentage);

					if(truePercentage < 0) {
						truePercentage = 0;
					}

					var id = str.split(",")[0];
					console.log(str);
					if(str !== "error") {
						if(percentage < 7) {
							percentage = 7;
						}
						else if(percentage > 100) {
							percentage = 100;
							truePercentage = 100;
						}

						var bar = document.querySelector(".percentbar-" + id);

						var p = document.createElement("p");
						p.appendChild(document.createTextNode(truePercentage + "%"));
						p.classList.add("percent-text");

						if(bar.querySelector("p")){
							bar.replaceChild(p, bar.querySelector("p"));
						}
						bar.appendChild(p);
						
						if(bar.classList.contains("redBar")) {
							bar.classList.remove("redBar");
						}
						else if(bar.classList.contains("orangeBar")) {
							bar.classList.remove("orangeBar");
						}
						else if(bar.classList.contains("greenBar")) {
							bar.classList.remove("greenBar");
						}

						if(percentage <= 25){
							bar.classList.add("redBar");
						}
						else if(percentage > 25 && percentage < 80) {
							bar.classList.add("orangeBar");
						}
						else if(percentage >= 80) {
							bar.classList.add("greenBar");
						}
						
						bar.style.width = percentage + "%";
					}
	            }
	        };
	xmlhttp.open("GET","http://localhost/getRating.php?newsID=" + id,false);
	xmlhttp.send();
};

function voteUp(event) {
	var id = event.target.id.split("-")[1];
	console.log("click: vote up, id: " + id);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					checkDatabase(id);
	            }
	        };
	xmlhttp.open("GET","http://localhost/updateRating.php?newsID="+ id + "&vote=1",false);
	xmlhttp.send();

	event.target.removeEventListener("click", voteUp, true);
	event.target.classList.remove("green");
	event.target.classList.add("green-clicked");

	document.querySelector("#down-" + id).removeEventListener("click", voteDown, true);
	document.querySelector("#down-" + id).classList.remove("red");
	document.querySelector("#down-" + id).classList.add("red-clicked", "opacity");
}

function voteDown(event) {
	var id = event.target.id.split("-")[1];
	console.log("click: vote down, id: " + id);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					checkDatabase(id);
	            }
	        };
	xmlhttp.open("GET","http://localhost/updateRating.php?newsID="+ id + "&vote=-1",false);
	xmlhttp.send();

	document.querySelector("#up-" + event.target.id.split("-")[1]).removeEventListener("click", voteUp, true);

	event.target.removeEventListener("click", voteDown, true);
	event.target.classList.remove("red");
	event.target.classList.add("red-clicked");

	document.querySelector("#up-" + id).removeEventListener("click", voteDown, true);
	document.querySelector("#up-" + id).classList.remove("green");
	document.querySelector("#up-" + id).classList.add("green-clicked", "opacity");
}
