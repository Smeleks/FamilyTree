<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db_connect.php';

// echo "The register.php script was called<br>";

if ($conn->connect_error) {
    die("Database connection error: " . $conn->connect_error);
} else {
    echo "Connection to database successful<br>";
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // echo "The form was sent using the POST method.<br>";

    $first_name = $_POST['first_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $middle_name = $_POST['middle_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $birth_day = $_POST['day'] ?? '';
    $birth_month = $_POST['month'] ?? '';
    $birth_year = $_POST['year'] ?? '';
    $gender = $_POST['gender'] ?? '';

    // echo "Received data:<br>";
    // echo "First Name: $first_name, Last Name: $last_name, Middle Name: $middle_name, Email: $email<br>";
    // echo "Birth Date: $birth_day-$birth_month-$birth_year<br>";
    // echo "Gender: $gender<br>";
    // echo "Password: $password<br>";

    if (empty($first_name) || empty($last_name) || empty($email) || empty($password) || empty($birth_day) || empty($birth_month) || empty($birth_year) || empty($gender)) {
        die("All fields are required.");
    }

    $birth_date = "$birth_year-$birth_month-$birth_day";

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO user (first_name, last_name, middle_name, email, password, birth_date, gender) 
            VALUES ('$first_name', '$last_name', '$middle_name', '$email', '$hashed_password', '$birth_date', '$gender')";

    // echo "The SQL query is executed: $sql<br>";

    if ($conn->query($sql) === TRUE) {
        echo "Registration was successful!<br>";
    } else {
        echo "Error executing request: " . $conn->error . "<br>";
    }

    $conn->close();
} else {
    // echo "Form not sent via POST method<br>";
}
?>