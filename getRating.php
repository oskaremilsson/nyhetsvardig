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


$sql = "SELECT * FROM newsworthy WHERE newsID = " . $_GET["newsID"];
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    /*while($row = $result->fetch_assoc()) {
        echo "id: " . $row["ID"] . $row["newsID"]. " " . $row["points"]. " " . $row["votes"] . " " . ($row["points"]/$row["votes"])*100 . "%<br>";
    }*/
    $row = $result->fetch_assoc();

    $percentage = ($row["points"]/$row["votes"])*100;

    /*$obj = array('points' => $row["points"],
    	'percentage' => $percentage
    );

    $obj = json_encode($obj, JSON_FORCE_OBJECT);
   	echo $obj;*/
   	echo $percentage;
}
else {
	echo "error";
}