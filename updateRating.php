<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "newsworthy";
//$dbname = "hackaton";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if(isset($_GET["newsID"]) && isset($_GET["vote"]))
{
$newsID = htmlspecialchars($_GET['newsID'], ENT_QUOTES, "ISO-8859-1");
$vote = htmlspecialchars($_GET['vote'], ENT_QUOTES, "ISO-8859-1");
$vote = intval($vote);
}

$sql = "SELECT * FROM newsworthy WHERE newsID = '" . $newsID ."';";
$result = $conn->query($sql);

if($result->num_rows > 0 && $vote) {
	$sql = "UPDATE newsworthy SET points=points+".$vote.", votes=votes+1 WHERE newsID = '" . $newsID ."';";
	$result = $conn->query($sql);
	var_dump($result);
}
elseif($vote) {
	$vote++;
	$sql = "INSERT INTO newsworthy (newsID, points, votes) VALUES ('" . $newsID . "', ". $vote .", 1);";
	$result = $conn->query($sql);
	var_dump($result);
}
