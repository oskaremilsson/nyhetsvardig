function voteUp(event) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					
	            }
	        };
	xmlhttp.open("GET","http://localhost/updateRating.php?newsID=test&vote=1",false);
	xmlhttp.send();
	event.target.removeEventListener("click", voteUp, true);
	document.querySelector("#down-" + event.target.id.split("-")[1]).removeEventListener("click", voteDown, true);
}

function voteDown(event) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					
	            }
	        };
	xmlhttp.open("GET","http://localhost/updateRating.php?newsID=test&vote=-1",false);
	xmlhttp.send();
	event.target.removeEventListener("click", voteDown, true);
	document.querySelector("#up-" + event.target.id.split("-")[1]).removeEventListener("click", voteUp, true);
}
