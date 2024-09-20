<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "family_tree";

echo "Trying to connect to the database...<br>";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Database connection error: " . $conn->connect_error);
} else {
    echo "Connection to database successful<br>";
}
?>