function checkDatabase(id) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var str = xmlhttp.responseText;
					console.log(str.split(","));
					var percentage = str.split(",")[1];
					var id = str.split(",")[0];
					console.log(id);
					if(str !== "error") {
						if(percentage < 0) {
							percentage = 0;
						}
						else if(percentage > 100) {
							percentage = 100;
						}
						document.querySelector(".percentbar-" + id).style.width = percentage + "%";
					}
	            }
	        };
	xmlhttp.open("GET","http://dragonslayer96.se/dragonhacker96/nyhetsvardig/getRating.php?newsID=" + id,false);
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
	xmlhttp.open("GET","http://dragonslayer96.se/dragonhacker96/nyhetsvardig/updateRating.php?newsID="+ id + "&vote=1",false);
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
	xmlhttp.open("GET","http://dragonslayer96.se/dragonhacker96/nyhetsvardig/updateRating.php?newsID="+ id + "&vote=-1",false);
	xmlhttp.send();

	document.querySelector("#up-" + event.target.id.split("-")[1]).removeEventListener("click", voteUp, true);

	event.target.removeEventListener("click", voteDown, true);
	event.target.classList.remove("red");
	event.target.classList.add("red-clicked");

	document.querySelector("#up-" + id).removeEventListener("click", voteDown, true);
	document.querySelector("#up-" + id).classList.remove("green");
	document.querySelector("#up-" + id).classList.add("green-clicked", "opacity");
}
