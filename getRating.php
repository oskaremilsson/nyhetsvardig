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

if(isset($_GET["newsID"]))
{
	$newsID = $_GET["newsID"];
}

$sql = "SELECT * FROM newsworthy WHERE newsID = " . $newsID;
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    $percentage = ($row["points"]/$row["votes"])*100;
   	echo $newsID . "," . $percentage;
}
else {
	echo "error";
}