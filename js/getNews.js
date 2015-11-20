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
	checkDatabase(this.id);
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
		                if(article.headline.length > 2){
		                	article.toPage();
		                }
	                }
	            }
	        };
	xmlhttp.open("GET","https://api.overviewnews.com/v1/search.json?key=DsUKxG2iiZV9BRnspdDbdmAiaixvCvHstsQZ&q=sverige&unique=true",true);
	xmlhttp.send();
}

