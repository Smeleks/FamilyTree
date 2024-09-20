<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $middle_name = $_POST['middle_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $birth_day = $_POST['day'];
    $birth_month = $_POST['month'];
    $birth_year = $_POST['year'];
    
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    $birth_date = "$birth_year-$birth_month-$birth_day";

    $sql = "INSERT INTO users (first_name, last_name, middle_name, email, password, birth_date)
            VALUES ('$first_name', '$last_name', '$middle_name', '$email', '$hashed_password', '$birth_date')";

    if ($conn->query($sql) === TRUE) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>