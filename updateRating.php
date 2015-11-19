<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hackaton";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$newsID = $_GET["newsID"];
$vote = $_GET["vote"];
var_dump($newsID);

$sql = "SELECT * FROM newsworthy WHERE newsID = '" . $newsID ."';";
$result = $conn->query($sql);

if($result->num_rows > 0 && $vote) {
	$sql = "UPDATE newsworthy SET points=points+".$vote.", votes=votes+1 WHERE newsID = '" . $newsID ."';";
	$result = $conn->query($sql);
}
elseif($vote) {
	$vote++;
	$sql = "INSERT INTO newsworthy (newsID, points, votes) VALUES ('" . $newsID . "', ". $vote .", 1);";
	$result = $conn->query($sql);
	var_dump($result);
}
