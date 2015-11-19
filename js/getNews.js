function Article(json) {
	this.headline = json.headline;
	this.image = json.image;
	this.lead = json.lead;
	this.url = json.url;
	this.source = json.source;
	this.id = json.id;
	this.percentage = 0;
	
	this.checkDatabase();
}

Article.prototype.checkDatabase = function() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					this.percentage = xmlhttp.responseText;
					if(this.percentage != "error") {
						document.body.innerHTML += this.percentage + "%";
					}
	            }
	        };
	xmlhttp.open("GET","http://localhost/getRating.php?newsID=" + this.id,false);
	xmlhttp.send();
};

Article.prototype.toPage = function() {
	var div = document.createElement("div");
	var h1 = document.createElement("h1");
	var p = document.createElement("p");
	var a = document.createElement("a");
	var voteup = document.createElement("a");
	var votedown = document.createElement("a");
	var image = document.createElement("img");

	image.setAttribute("src", this.image);
	image.setAttribute("alt", this.headline);
	div.appendChild(image);

	a.setAttribute("href", this.url);
	div.appendChild(h1).appendChild(a).appendChild(document.createTextNode(this.headline));
	div.appendChild(p).appendChild(document.createTextNode(this.lead));

	voteup.setAttribute("href", "#");
	voteup.setAttribute("id", "up-" + this.id);
	voteup.setAttribute("name", this.id);
	div.appendChild(voteup).appendChild(document.createTextNode("Up"));

	votedown.setAttribute("href", "#");
	votedown.setAttribute("id", "down-" + this.id);
	div.appendChild(votedown).appendChild(document.createTextNode("Down"));

	document.querySelector("body").insertBefore(div, document.querySelector("script"));

	document.querySelector("#up-" + this.id).addEventListener("click", voteUp, true);
	document.querySelector("#down-" + this.id).addEventListener("click", voteDown, true);
}

function getNews()
{
	var articles = [];
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	                var response = JSON.parse(xmlhttp.responseText);
	                var article = new Article(response.result[0]);
	                var article2 = new Article(response.result[1]);
	                articles.push(article);
	                articles.push(article2);
	                articles[0].toPage();
	                articles[1].toPage();
	            }
	        };
	xmlhttp.open("GET","https://api.overviewnews.com/v1/search.json?key=DsUKxG2iiZV9BRnspdDbdmAiaixvCvHstsQZ&q=media",true);
	xmlhttp.send();
}

