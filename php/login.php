<?php
require 'db_connect.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        echo json_encode(["error" => "Email and password are required."]);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, email, password, first_name, last_name FROM users WHERE email = ?");
    if (!$stmt) {
        echo json_encode(["error" => "SQL Error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(["error" => "No user found with this email."]);
    } else {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_name'] = $user['first_name'] . " " . $user['last_name'];

            echo json_encode(["success" => "Login successful", "redirect" => "map.html"]);
        } else {
            echo json_encode(["error" => "Wrong Password"]);
        }
    }

    $stmt->close();
    $conn->close();
}
?>