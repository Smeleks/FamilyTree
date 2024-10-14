<?php
require 'db_connect.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $last_name = $_POST['last_name'];
    $first_name = $_POST['first_name'];
    $middle_name = $_POST['middle_name'];
    $day = $_POST['day'];
    $month = $_POST['month'];
    $year = $_POST['year'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $gender = $_POST['gender'];

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    if (!$stmt) {
        echo json_encode(["error" => "SQL Error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["error" => "Email is already registered."]);
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (last_name, first_name, middle_name, day, month, year, email, password, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            echo json_encode(["error" => "SQL Error: " . $conn->error]);
            exit;
        }

        $stmt->bind_param("ssiiissss", $last_name, $first_name, $middle_name, $day, $month, $year, $email, $hashed_password, $gender);

        if ($stmt->execute()) {
            echo json_encode(["success" => "Registration successful!"]);
        } else {
            echo json_encode(["error" => "Error: " . $stmt->error]);
        }
    }

    $stmt->close();
    $conn->close();
}
?>