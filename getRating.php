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


$sql = "SELECT * FROM newsworthy";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    /*while($row = $result->fetch_assoc()) {
        echo "id: " . $row["ID"] . $row["newsID"]. " " . $row["points"]. " " . $row["votes"] . " " . ($row["points"]/$row["votes"])*100 . "%<br>";
    }*/
    $percentage = ($row["points"]/$row["votes"])*100;
    $row = $result->fetch_assoc();

    $post_data = array('item_type_id' => $item_type,
    'string_key' => $string_key,
    'string_value' => $string_value,
    'string_extra' => $string_extra,
    'is_public' => $public,
    'is_public_for_contacts' => $public_contacts);

    $obj = array('points' => $row["points"],
    	'percentage' => $percentage
    );

    $post_data = json_encode($obj);
    echo var_dump($post_data);
}
else {
	return -1;
}
