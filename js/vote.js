function voteUp(event) {
	var id = event.target.id.split("-")[1];
	console.log("click: vote up, id: " + id);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					
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
