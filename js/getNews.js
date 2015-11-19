function Article(json) {
	this.headline = json.headline;
	this.image = json.image;
	this.lead = json.lead;
	this.url = json.url;
	this.source = json.source;
	this.id = json.id;
	this.percentage = 0;
}

Article.prototype.checkDatabase = function() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(_this) {
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
	xmlhttp.open("GET","http://dragonslayer96.se/dragonhacker96/nyhetsvardig/getRating.php?newsID=" + this.id,false);
	xmlhttp.send();
};

Article.prototype.toPage = function() {
	var template = document.querySelector("#article-template");
	var element = template.content.querySelector(".box").cloneNode(true);
	if(this.image.length > 4) {
		element.querySelector(".addImage").style.backgroundImage = "url('"+this.image+"')";
	}
	var link = document.createElement("a");
	link.appendChild(document.createTextNode(this.headline));
	link.setAttribute("href", this.url);
	link.setAttribute("alt", this.headline);
	element.querySelector(".titleBar h1").appendChild(link);
	element.querySelector(".textSquare p").appendChild(document.createTextNode(this.lead));
	element.querySelector(".percentBar").classList.add("percentbar-" + this.id);
	
	console.log(element);

	voteup = element.querySelector(".upvote");
	voteup.setAttribute("id", "up-" + this.id);

	votedown = element.querySelector(".downvote");
	votedown.setAttribute("id", "down-" + this.id);

	document.querySelector("#bigBox").appendChild(element);

	document.querySelector("#up-" + this.id).addEventListener("click", voteUp, true);
	document.querySelector("#down-" + this.id).addEventListener("click", voteDown, true);

	this.checkDatabase();
}

function getNews()
{
	var articles = [];
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	                var response = JSON.parse(xmlhttp.responseText);
	                var article;

	                for(var i = 0; i < response.result.length; i++) {
		                article = new Article(response.result[i]);
		                article.toPage();
	                }
	            }
	        };
	xmlhttp.open("GET","https://api.overviewnews.com/v1/search.json?key=DsUKxG2iiZV9BRnspdDbdmAiaixvCvHstsQZ&q=media&unique=true",true);
	xmlhttp.send();
}

