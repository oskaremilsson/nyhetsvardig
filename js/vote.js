function voteUp(event) {
	var id = event.target.id.split("-")[1];
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					
	            }
	        };
	xmlhttp.open("GET","http://localhost/updateRating.php?newsID="+ id + "&vote=1",false);
	xmlhttp.send();
	event.target.removeEventListener("click", voteUp, true);
	document.querySelector("#down-" + id).removeEventListener("click", voteDown, true);
}

function voteDown(event) {
	var id = event.target.id.split("-")[1];
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					
	            }
	        };
	xmlhttp.open("GET","http://localhost/updateRating.php?newsID="+ id + "&vote=-1",false);
	xmlhttp.send();
	event.target.removeEventListener("click", voteDown, true);
	document.querySelector("#up-" + event.target.id.split("-")[1]).removeEventListener("click", voteUp, true);
}
